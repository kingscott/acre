var restify = require('restify')
var Ranker = require('./ranker')
var async = require ('async')

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
})

server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.bodyParser())


server.post('/compute', function (req, res, next) {
  var ranker = new Ranker()
  // Extract the housing options
  var housingOptions = req.params.housing
  var jobTitle = req.params.jobTitle
  var density = req.params.density
  var language = req.params.language
  var ranks = []

  var evils = [
    function (done) {
      ranker.rankByHousingWants(housingOptions, jobTitle, function (ranked) {
        ranks.push(ranked)
        done(false)
      })
    },
    function (done) {
      console.log('?')
      ranker.rankByLanguage(language, function (ranked) {
        console.log('desu')
        console.log(ranked)
        ranks.push(ranked)
        done(false)
      })
    }, function (done) {
      ranker.rankByDensity(density, function (ranked) {
        ranks.push(ranked)
        done(false)
      })
    }
  ]

  // async
  async.series(evils, function () {
    var scores = ranker.computeScore(ranks)
    console.log(scores)

    // We don't want to drop raw data, so we'll do some post-processing here
    scores.forEach(function (city) {
      city.cityName = city.name
      city.disposableIncome = city['average_disposable']
    })

    res.send(scores)
  })
})

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url)
  console.log('began listening for interested parties regarding requests for information...')
})
