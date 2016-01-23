/*
  Vaughan Hilts
  Glassdoor wrapper API that given some kind of job search title or the like
  can give some salary data to work with.
*/

var request = require('request')

function Glassdoor (partnerId, apiKey) {
  this.partnerId = partnerId
  this.apiKey = apiKey
}

// Returns a callback with the data as requested formatted as a JSON object
// 1 = US, 3 = Canada
Glassdoor.prototype.getSalaryForJobTitle = function (countryCode, city, jobTitle, callback) {
  var BUILT_URL = 'http://api.glassdoor.com/api/api.htm?t.p=53281&t.k=kRDP8vFoWpS&userip=0.0.0.0&useragent=&format=json&v=1&action=jobs-prog'

  var countryId = 1

  if (countryCode !== 'US') {
    countryId = 3
  }

  BUILT_URL += '&countryId=' + countryId

  BUILT_URL += '&jobTitle=' + encodeURIComponent(jobTitle)
  request(BUILT_URL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // Two branches for getting the result we want
      var resp = JSON.parse(body)
      var salary = 0

      try {
          salary = resp.response.payMedian
      } catch (exception) {
        salary = 0
      }

      console.log('Got salary back ' + salary)
      console.log(body)
      console.log(BUILT_URL)
      callback(salary)
    }
  })
}

module.exports = Glassdoor
