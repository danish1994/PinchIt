var sequelize = require('sequelize')

var host = process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost'
var port = process.env.OPENSHIFT_MYSQL_DB_PORT || 3306
var userlocal = 'root'
var passwordlocal = 'danish'
var user = 'admin2sFVveC'
var password = 'H5zPe5kIBXLr'

function connection() {
    this.seq = null
    this.sequelize = null

    this.init = function() {
        this.sequelize = sequelize
        this.seq = new sequelize('short_project', userlocal, passwordlocal, {
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