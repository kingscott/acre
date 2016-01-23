function TaxCalculator () {
  // Do something interesting
}

TaxCalculator.prototype.getGrossSalary = function (salary, country) {
    // Tax rules are hard :)
  var CANADA_AVG_TAX_RATE = 0.21
  var US_AVG_RATE = 0.26

  if (country === 'US') {
    return salary * (1 - US_AVG_RATE)
  } else {    
    return salary * (1 - CANADA_AVG_TAX_RATE)
  }
}

module.exports = TaxCalculator
