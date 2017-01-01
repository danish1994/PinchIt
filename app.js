var bodyparser = require('body-parser')
var connection = require('./connection')
var express = require('express')
var path = require('path')
var routes = require('./routes')
var setup = require('./setup')
var mkdirp = require('mkdirp')
var app = express()
var ip = process.env.OPENSHIFT_NODEJS_IP || 'localhost'
var port = process.env.PORT || 8888


connection.init()
setup()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(bodyparser.json({
    limit: '100mb'
}))

app.use(bodyparser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 500000
}))

routes.configure(app)

app.listen(port, function() {
    console.log('Server listening on port ' + port);
})
