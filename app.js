var bodyparser = require('body-parser')
var connection = require('./connection')
var express = require('express')
var path = require('path')
var routes = require('./routes')
var setup = require('./setup')
var mkdirp = require('mkdirp')
var app = express()
var port = process.env.PORT || 80

var nodeadmin = require('nodeadmin')


connection.init()
setup()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use("/public", express.static(path.join(__dirname, 'public')))

app.use(bodyparser.json({
    limit: '100mb'
}))

app.use(bodyparser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 500000
}))

//Node Admin
app.use(nodeadmin(app))

routes.configure(app)

app.listen(port, function() {
    console.log('Server listening on port ' + port);
})
