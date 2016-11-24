var connection = require('../connection')
var crypto = require('crypto')
var fs = require('fs')
var jwt = require('jsonwebtoken')
const jwtsecret = '7fchy5GCHGHJGYYC'
const secret = 'jcjudr4yjj888HGCFC'
const createAdminSecret = 'lYhJ8F0cFOWsAD95aJhQ'

function admin() {

    this.conn = null
    sequelize = null
    this.admin = null

    this.init = function() {
        this.conn = connection.getConnection()
        sequelize = connection.getSequelize()
        this.admin = this.conn.define('admin', {
            adminid: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: sequelize.STRING(100),
            email: {
                type: sequelize.STRING(100),
                allowNull: false,
                unique: true
            },
            pswd: sequelize.STRING(100),
            deviceid: sequelize.STRING,
            su: {
                type: sequelize.BOOLEAN,
                allowNull: false
            }
        }, {
            freezeTableName: true,
            timestamps: true
        })
        this.admin.sync()
    }

    this.getAdminObject = function() {
        return this.admin
    }

    this.get = function(response) {
        this.admin.findAll({
            attributes: ['adminid', 'name', 'email', 'deviceid', 'su']
        }).then(function(admin) {
            response.send(admin)
        })
    }

    this.getAdmin = function(recordId, response) {
        try {
            token = jwt.verify(recordId, jwtsecret)
            this.admin.find({
                attributes: ['adminid', 'name', 'email', 'deviceid', 'su'],
                where: {
                    adminid: token.adminid
                }
            }).then(function(admin) {
                if (admin)
                    response.send(admin)
                else
                    response.send({
                        status: 1,
                        message: 'Admin does not exist'
                    })

            }).catch(function(error) {
                response.send({
                    status: 1,
                    message: 'Admin does not exist'
                })
            })
        } catch (error) {
            if (error.name == 'TokenExpiredError')
                response.send({
                    status: 2,
                    message: 'Token Expired'
                })
            else
                response.send({
                    status: 3,
                    message: 'Authentication Failed'
                })
        }
    }

    this.post = function(record, response) {
        if (record.secret == createAdminSecret) {
            hash = crypto.createHmac('sha256', secret)
                .update(record.pswd)
                .digest('hex')
            this.admin.create({
                name: record.name,
                email: record.email,
                pswd: hash,
                deviceid: record.deviceid,
                su: record.su
            }).then(function() {
                response.send({
                    status: 0,
                    message: 'Admin added Successfully'
                })
            }).catch(function(error) {
                try {
                    message = ''
                    errorMessage = error.errors[0].message
                    errorMessage = errorMessage.toString().substring(0, errorMessage.indexOf(' '))
                    if (errorMessage == 'email')
                        message = 'This email id is already registered'
                    else
                        message = error
                    response.send({
                        status: 1,
                        message: message
                    })
                } catch (error) {
                    response.send({
                        status: 1,
                        message: 'Admin not added'
                    })
                }
            })
        } else {
            response.send({
                status: 2,
                message: 'Invalid Secret'
            })
        }
    }

    this.update = function(record, response) {
        try {
            token = jwt.verify(record.token, jwtsecret)
            adminid = token.adminid
            this.admin.find({
                where: {
                    adminid: adminid
                }
            }).then(function(admin) {
                admin.update({
                    name: record.name || admin.dataValues.name,
                    email: record.email || admin.dataValues.email,
                    gender: record.gender || admin.dataValues.gender,
                    deviceid: record.deviceid || admin.dataValues.deviceid,
                    deviceid: record.su || admin.dataValues.su
                }, {
                    where: {
                        adminid: adminid
                    }
                }).then(function(updatedRecord) {
                    if (record)
                        response.send({
                            status: 0,
                            message: 'Admin updated successfully'
                        })
                    else
                        response.send({
                            status: 1,
                            message: 'Admin not updated'
                        })
                }).catch(function(error) {
                    response.send({
                        status: 2,
                        message: 'Admin does not exist'
                    })
                })
            }).catch(function(error) {
                response.send({
                    status: 2,
                    message: 'Admin does not exist'
                })
            })
        } catch (error) {
            if (error.name == 'TokenExpiredError')
                response.send({
                    status: 3,
                    message: 'Token Expired'
                })
            else
                response.send({
                    status: 4,
                    message: 'Authentication Failed'
                })
        }
    }

    this.updatePassword = function(record, response) {
        try {
            token = jwt.verify(record.token, jwtsecret)
            adminid = token.adminid
            this.admin.find({
                attributes: ['pswd'],
                where: {
                    adminid: adminid
                }
            }).then(function(admin) {
                oldPassword = crypto.createHmac('sha256', secret)
                    .update(record.oldPswd)
                    .digest('hex')
                newPassword = crypto.createHmac('sha256', secret)
                    .update(record.newPswd)
                    .digest('hex')
                if (oldPassword == admin.dataValues.pswd) {
                    admin.update({
                        pswd: newPassword
                    }, {
                        where: {
                            adminid: adminid
                        }
                    }).then(function(record) {
                        if (record)
                            response.send({
                                status: 0,
                                message: 'Admin updated successfully'
                            })
                        else
                            response.send({
                                status: 1,
                                message: 'Admin not updated'
                            })
                    }).catch(function(error) {
                        response.send({
                            status: 2,
                            message: 'Admin does not exist'
                        })
                    })
                } else {
                    response.send({
                        status: 5,
                        message: 'Invalid Password.'
                    })
                }
            }).catch(function(error) {
                response.send({
                    status: 2,
                    message: 'Admin does not exist'
                })
            })
        } catch (error) {
            if (error.name == 'TokenExpiredError')
                response.send({
                    status: 3,
                    message: 'Token Expired'
                })
            else
                response.send({
                    status: 4,
                    message: 'Authentication Failed'
                })
        }
    }


    this.delete = function(recordId, response) {
        try {
            token = jwt.verify(recordId, jwtsecret)
            this.admin.destroy({
                where: {
                    adminid: token.adminid
                }
            }).then(function(record) {
                if (record)
                    response.send({
                        status: 0,
                        message: 'Admin deleted successfully'
                    })
                else
                    response.send({
                        status: 1,
                        message: 'Admin does not exist'
                    })
            }).catch(function(error) {
                response.send({
                    status: 1,
                    message: 'Admin does not exist'
                })
            })
        } catch (error) {
            if (error.name == 'TokenExpiredError')
                response.send({
                    status: 2,
                    message: 'Token Expired'
                })
            else
                response.send({
                    status: 3,
                    message: 'Authentication Failed'
                })
        }
    }

    this.login = function(record, response) {
        this.admin.find({
            attributes: ['adminid', 'pswd'],
            where: {
                email: record.email
            }
        }).then(function(admin) {
            hash = crypto.createHmac('sha256', secret)
                .update(record.pswd)
                .digest('hex')
            if (hash == admin.dataValues.pswd) {
                token = jwt.sign({
                    adminid: admin.dataValues.adminid
                }, jwtsecret)
                response.send({
                    status: 0,
                    message: {
                        message: 'Login Successful',
                        token: token
                    }
                })
            } else
                response.send({
                    status: 5,
                    message: 'Invalid password'
                })
        }).catch(function(error) {
            response.send({
                status: 2,
                message: 'Admin Does not exist'
            })
        })
    }
}

module.exports = new admin()