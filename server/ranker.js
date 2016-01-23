var _ = require('lodash')
var Glassdoor = require('./glassdoor')
var TaxCalculator = require('./taxcalculator')
var async = require('async')

/**
  Responsible for mostly ranking some of the data that comes back based on preferences.
  Takes a property, and returns the list sorted by the critiera provided implictly.
*/
function Ranker () {
  this.dbConnection = require('monk')('localhost/city')
  this.cities = this.dbConnection.get('cities')
}

// Rank by the language spoken; good for having some french data in there that we can use
Ranker.prototype.rankByLanguage = function (languageCode, callback) {
  // Bias the languageCode
  this.cities.find({}, {}).on('complete', function (error, collection) {
    collection = collection.sort(function (a, b) {
      if (a.language === languageCode) {
        return -1
      } else {
        return 1
      }
    })
    console.log(error)
    callback(collection)
  })
}

Ranker.prototype.rankByCountryCode = function (countryCode, callback) {
  // Bias the countryCode
  this.cities.find({}, {}).on('complete', function (error, collection) {
    if (error) {
      console.log('fatal: ' + error)
      return
    }

    collection = collection.sort(function (a, b) {
      if (a.country === countryCode) {
        return -1
      } else {
        return 1
      }
    })
    callback(collection)
  })
}

Ranker.prototype.rankByHousingWants = function (housingOptions, jobTitle, callback) {
  var self = this
  this.cities.find({}, {}).on('complete', function (error, collection) {
    if (error) {
      console.log('fatal: ' + error)
      return
    }

    // Find what we want to do
    var spendEverything = housingOptions.spendAll
    var bedroomCount = housingOptions.bedroomCount
    var downtown = housingOptions.downtown

    // Build the composite key we need to get the value from the DB
    var compositeHouseKey = 'apartment_' + bedroomCount
    if (!downtown) {
      compositeHouseKey += '_outside'
    }

    async.series([
      function (done) {
        self._populateSalaries(collection, jobTitle, done)
      }
    ], function () {
      self._filterSalaries(collection, compositeHouseKey, spendEverything, callback)
    })
  })
}

Ranker.prototype._populateSalaries = function (cities, jobTitle, doneCallback) {
  var repliesToWaitFor = cities.length
  var currentReplies = 0
  var salaryFetcher = new Glassdoor()
  var calc = new TaxCalculator()

  cities.forEach(function (city) {
    // Setup Glassdoor
    salaryFetcher.getSalaryForJobTitle(city.country, city.name, jobTitle, function (salary) {
      // Wrap the salary into the tax calculator
      city.salary = calc.getGrossSalary(salary, city.country)
      city.salaryNoTax = salary

      currentReplies++
      if (currentReplies === repliesToWaitFor) {
        doneCallback(true)
      }
    })
  })
}

Ranker.prototype._filterSalaries = function (cities, compositeHouseKey, spendEverything, callback) {
  var BUDGET_CUTOFF = 0.50

  // Remove all the cities you have no hope of living in
  cities = _.filter(cities, function (city) {
    var monthlySalary = city.salary / 12
    return city[compositeHouseKey] < monthlySalary * BUDGET_CUTOFF
  })

  // Sort and return
  // Sort the data and return it based on the spendEverything flag
  cities.sort(function (cityA, cityB) {
    if (!spendEverything) {
      return cityA[compositeHouseKey] - cityB[compositeHouseKey]
    } else {
      return cityB[compositeHouseKey] - cityA[compositeHouseKey]
    }
  })

  callback(cities)
}

// Fill in some density stuff
Ranker.prototype.rankByDensity = function (targetDensity, callback) {
  this.cities.find({}, {}).on('complete', function (error, collection) {
    if (error) {
      console.log('fatal: ' + error)
      return
    }

    collection = collection.sort(function (a, b) {
      return a.density - targetDensity
    })

    callback(collection)
  })
}

// Takes in an array of arrays, and figured out how to score them based on their ordering
Ranker.prototype.computeScore = function (rankedArrays) {
  // Each iteration becomes more and more lucrative by a certain factor
  // Maybe 0.20 scaler, then 0.15, 0.10... and then you stay at 0.10 to indiciate the other factors
  // are THE most important
  // https://en.wikipedia.org/wiki/Weighted_sum_model
  var currentWeight = 0.40
  var weightCutOff = 0.10
  var slotBonus = 5
  var scoreHash = {}

  rankedArrays.forEach(function (subRankArray) {
    // For each item, simply sum up their total in some hash
    var index = 0
    subRankArray.forEach(function (item) {
      var score = (Math.min(3, index) * slotBonus) * currentWeight
      console.log(item._id)

      // Setup the hash counter if not available
      if (!scoreHash[item._id]) {
        scoreHash[item._id] = 0
      }

      scoreHash[item._id] += score
      index = index + 1
    })

    if (currentWeight >= weightCutOff) {
      currentWeight -= 0.10
    }
  })

  console.log(scoreHash)
  return scoreHash
}

module.exports = Ranker
