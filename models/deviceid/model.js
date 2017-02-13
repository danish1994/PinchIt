var connection = require('../../connection')

function deviceid() {

    this.conn = null
    sequelize = null
    this.deviceid = null

    this.init = function() {
        this.conn = connection.getConnection()
        sequelize = connection.getSequelize()
        this.deviceid = this.conn.define('deviceid', {
            deviceidid: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            deviceid: {
                type: sequelize.STRING,
                unique: true
            },
            source: sequelize.STRING
        }, {
            freezeTableName: true,
            timestamps: true
        })
        this.deviceid.sync()
    }

    this.getDeviceIdObject = function() {
        return this.deviceid
    }

    this.get = function(response) {
        this.deviceid.findAll().then(function(deviceid) {
            response.send(deviceid)
        }).catch(function(error) {
            response.send({
                status: 1,
                message: error
            })
        })
    }

    this.post = function(record, response) {
        this.deviceid.create({
            deviceid: record.deviceid,
            source: record.source
        }).then(function() {
            response.send({
                status: 0,
                message: 'DeviceId added Successfully'
            })
        }).catch(function(error) {
            response.send({
                status: 1,
                message: 'deviceid not added'
            })
        })
    }
}

module.exports = new deviceid()
