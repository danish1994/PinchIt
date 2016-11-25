var connection = require('../connection')
var crypto = require('crypto')
var fs = require('fs')
var jwt = require('jsonwebtoken')
const jwtsecret = '7fchy5GCHGHJGYYC'
const secret = 'jcjudr4yjj888HGCFC'

function writer() {

    this.conn = null
    sequelize = null
    this.writer = null
    this.admin = null

    this.init = function(admin) {
        this.conn = connection.getConnection()
        sequelize = connection.getSequelize()
        this.admin = admin
        this.writer = this.conn.define('writer', {
            writerid: {
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
            verified: sequelize.BOOLEAN
        }, {
            freezeTableName: true,
            timestamps: true
        })
        this.writer.sync()
    }

    this.getWriterObject = function() {
        return this.writer
    }

    this.get = function(response) {
        this.writer.findAll({
            attributes: ['writerid', 'name', 'email', 'deviceid', 'verified']
        }).then(function(writer) {
            response.send(writer)
        }).catch(function(error) {
            response.send({
                status: 1,
                message: error
            })
        })
    }

    this.getWriter = function(recordId, response) {
        try {
            token = jwt.verify(recordId, jwtsecret)
            this.writer.find({
                attributes: ['writerid', 'name', 'email', 'deviceid', 'verified'],
                where: {
                    writerid: token.writerid
                }
            }).then(function(writer) {
                response.send(writer)
            }).catch(function(error) {
                response.send({
                    status: 1,
                    message: 'Writer does not exist'
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
        hash = crypto.createHmac('sha256', secret)
            .update(record.pswd)
            .digest('hex')
        this.writer.create({
            name: record.name,
            email: record.email,
            pswd: hash,
            verified: false,
            deviceid: record.deviceid
        }).then(function() {
            response.send({
                status: 0,
                message: 'Writer added Successfully'
            })
        }).catch(function(error) {
            try {
                message = ''
                errorMessage = error.errors[0].message
                errorMessage = errorMessage.toString().substring(0, errorMessage.indexOf(' '))
                if (errorMessage == 'email')
                    message = 'This email id is already registered'
                response.send({
                    status: 1,
                    message: message
                })
            } catch (error) {
                response.send({
                    status: 1,
                    message: 'Writer not added'
                })
            }
        })
    }

    this.update = function(record, response) {
        try {
            token = jwt.verify(record.token, jwtsecret)
            writerid = token.writerid
            this.writer.find({
                where: {
                    writerid: writerid
                }
            }).then(function(writer) {
                writer.update({
                    name: record.name || writer.dataValues.name,
                    email: record.email || writer.dataValues.email,
                    deviceid: record.deviceid || writer.dataValues.deviceid,
                    verified: record.verified || writer.dataValues.verified
                }, {
                    where: {
                        writerid: writerid
                    }
                }).then(function(updatedRecord) {
                    if (record)
                        response.send({
                            status: 0,
                            message: 'Writer updated successfully'
                        })
                    else
                        response.send({
                            status: 1,
                            message: 'Writer not updated'
                        })
                }).catch(function(error) {
                    response.send({
                        status: 2,
                        message: 'Writer does not exist'
                    })
                })
            }).catch(function(error) {
                response.send({
                    status: 2,
                    message: 'Writer does not exist'
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
            writerid = token.writerid
            this.writer.find({
                attributes: ['pswd'],
                where: {
                    writerid: writerid
                }
            }).then(function(writer) {
                oldPassword = crypto.createHmac('sha256', secret)
                    .update(record.oldPswd)
                    .digest('hex')
                newPassword = crypto.createHmac('sha256', secret)
                    .update(record.newPswd)
                    .digest('hex')
                if (oldPassword == writer.dataValues.pswd) {
                    writer.update({
                        pswd: newPassword
                    }, {
                        where: {
                            writerid: writerid
                        }
                    }).then(function(record) {
                        if (record)
                            response.send({
                                status: 0,
                                message: 'writer updated successfully'
                            })
                        else
                            response.send({
                                status: 1,
                                message: 'writer not updated'
                            })
                    }).catch(function(error) {
                        response.send({
                            status: 2,
                            message: 'writer does not exist'
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
                    message: 'writer does not exist'
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
            this.writer.destroy({
                where: {
                    writerid: token.writerid
                }
            }).then(function(record) {
                if (record)
                    response.send({
                        status: 0,
                        message: 'Writer deleted successfully'
                    })
                else
                    response.send({
                        status: 1,
                        message: 'Writer does not exist'
                    })
            }).catch(function(error) {
                response.send({
                    status: 1,
                    message: 'Writer does not exist'
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
        this.writer.find({
            where: {
                email: record.email
            }
        }).then(function(writer) {
            hash = crypto.createHmac('sha256', secret)
                .update(record.pswd)
                .digest('hex')
            if (hash == writer.dataValues.pswd) {
                if (writer.dataValues.verified) {
                    token = jwt.sign({
                        writerid: writer.dataValues.writerid
                    }, jwtsecret)
                    response.send({
                        status: 0,
                        message: {
                            message: 'Login Successful',
                            token: token
                        }
                    })
                } else {
                    response.send({
                        status: 1,
                        message: 'Writer not yet verified'
                    })
                }
            } else
                response.send({
                    status: 2,
                    message: 'Invalid password'
                })
        }).catch(function(error) {
            response.send({
                status: 3,
                message: 'Writer does not exist'
            })
        })
    }

    this.verify = function(record, response) {
        try {
            token = jwt.verify(record.token, jwtsecret)
            adminid = token.adminid
            parent = this
            this.admin.find({
                where: {
                    adminid: adminid
                }
            }).then(function(admin) {
                if (admin) {
                    parent.writer.update({
                        verified: true
                    }, {
                        where: {
                            writerid: record.writerid
                        }
                    }).then(function(updatedRecord) {
                        if (updatedRecord)
                            response.send({
                                status: 0,
                                message: 'Writer verified'
                            })
                        else
                            response.send({
                                status: 1,
                                message: 'Writer does not exist'
                            })
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
}

module.exports = new writer()