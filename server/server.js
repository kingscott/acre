var restify = require('restify')
var Ranker = require('./ranker')

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
})

server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser())
server.use(restify.bodyParser())

server.get('/compute', function (req, res, next) {
  var rankMachine = new Ranker()

  res.send(req.params)
  return next()
})

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url)
  console.log('began listening for interested parties regarding requests for information...')
})

var ranker = new Ranker()
var options = {
  spendAll: true,
  bedroomCount: 3,
  downtown: false
}

ranker.rankByHousingWants(options, 'Software Developer', function (ranked) {
  console.log(ranked)
})
