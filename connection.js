var sequelize = require('sequelize')

var host = 'sql6.freemysqlhosting.net'
var port = 3306
var db = 'sql6151793'
var user = 'sql6151793'
var password = 'vnfcfXx4rC'

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