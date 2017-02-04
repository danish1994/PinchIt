var sequelize = require('sequelize')

var host = 'localhost'
var port = 3306
var db = 'pinch'
var user = 'root'
var password = 'danish'

function connection() {
    this.seq = null
    this.sequelize = null

    this.init = function() {
        this.sequelize = sequelize
        this.seq = new sequelize(db, user, password, {
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