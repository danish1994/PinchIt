var sequelize = require('sequelize')

// var host = process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost'
// var port = process.env.OPENSHIFT_MYSQL_DB_PORT || 3306
var host = 'db4free.net'
var port = 3307
var db = 'pinchit'
var userlocal = 'danish'
var passwordlocal = 'danish'
// var user = 'adminTCqa2ld'
// var password = 'RgSMylbgDMLR'

function connection() {
    this.seq = null
    this.sequelize = null

    this.init = function() {
        this.sequelize = sequelize
        this.seq = new sequelize(db, userlocal, passwordlocal, {
            host: host,
            dialect: 'mysql',
            pool: {
                max: 15,
                min: 0,
                idle: 2000
            }
        })
    }

    this.getSequelize = function() {
        return this.sequelize
    }

    this.getConnection = function() {
        return this.seq
    }
}

module.exports = new connection()