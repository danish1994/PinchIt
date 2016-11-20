var connection = require('../connection')
var crypto = require('crypto')
var fs = require('fs')
var jwt = require('jsonwebtoken')
const jwtsecret = '7fchy5GCHGHJGYYC'
const secret = 'jcjudr4yjj888HGCFC'

function user() {

    this.conn = null
    sequelize = null
    this.user = null

    this.init = function() {
        this.conn = connection.getConnection()
        sequelize = connection.getSequelize()
        this.user = this.conn.define('user', {
            userid: {
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
            photo: sequelize.STRING(100),
            gender: sequelize.STRING(7),
            deviceid: sequelize.STRING
        }, {
            freezeTableName: true,
            timestamps: true
        })
        this.user.sync()
    }

    this.getUserObject = function() {
        return this.user
    }

    this.get = function(response) {
        this.user.findAll({
            attributes: ['userid', 'name', 'email', 'photo', 'gender', 'deviceid']
        }).then(function(user) {
            for (i = 0, userLength = user.length; i < userLength; i++) {
                try {
                    if (user[i].dataValues.photo) {
                        data = fs.readFileSync('img/public/user/' + user[i].dataValues.photo)
                        user[i].dataValues.photoData = data.toString('base64')
                    }
                } catch (error) {
                    user[i].dataValues.photoData = ''
                }
            }
            response.send(user)
        })
    }

    this.getUser = function(recordId, response) {
        try {
            token = jwt.verify(recordId, jwtsecret)
            this.user.find({
                attributes: ['userid', 'name', 'email', 'photo', 'gender', 'deviceid'],
                where: {
                    userid: token.userid
                }
            }).then(function(user) {
                try {
                    if (user.dataValues.photo) {
                        data = fs.readFileSync('img/public/user/' + user.dataValues.photo)
                        user.dataValues.photoData = data.toString('base64')
                    }
                } catch (error) {
                    user.dataValues.photoData = '';
                }
                response.send(user)
            }).catch(function(error) {
                response.send({
                    status: 2,
                    message: 'user does not exist'
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

    this.getUserImage = function(recordId, response) {
        try {
            console.log(recordId)
            token = jwt.verify(recordId, jwtsecret)
            this.user.find({
                attributes: ['photo'],
                where: {
                    userid: token.userid
                }
            }).then(function(user) {
                try {
                    if (user.dataValues.photo) {
                        data = fs.readFileSync('img/public/user/' + user.dataValues.photo)
                        user.dataValues.photoData = data.toString('base64')
                    }
                } catch (error) {
                    user.dataValues.photoData = ''
                }
                response.send({
                    photo: user.dataValues.photo,
                    photoData: user.dataValues.photoData
                })
            }).catch(function(error) {
                response.send({
                    status: 2,
                    message: 'User does not exist'
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

    this.post = function(record, response) {
        hash = crypto.createHmac('sha256', secret)
            .update(record.pswd)
            .digest('hex')
        this.user.create({
            name: record.name,
            email: record.email,
            pswd: hash,
            gender: record.gender,
            deviceid: record.deviceid
        }).then(function() {
            response.send({
                status: 0,
                message: 'User added Successfully'
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
                    message: 'User not added'
                })
            }
        })
    }

    this.update = function(record, response) {
        try {
            token = jwt.verify(record.token, jwtsecret)
            userid = token.userid
            this.user.find({
                where: {
                    userid: userid
                }
            }).then(function(user) {
                if (record.photo) {
                    photo = new Date().toISOString()
                    photo += record.email || user.dataValues.email
                    photo += record.photo
                } else
                    photo = null
                user.update({
                    name: record.name || user.dataValues.name,
                    email: record.email || user.dataValues.email,
                    photo: photo || user.dataValues.photo,
                    gender: record.gender || user.dataValues.gender,
                    deviceid: record.deviceid || user.dataValues.deviceid
                }, {
                    where: {
                        userid: userid
                    }
                }).then(function(updatedRecord) {
                    if (record.photo) {
                        updatedRecord.photoData = record.photoData.replace(/\s/g, '+')
                        fs.writeFile('img/public/user/' + photo, updatedRecord.photoData, 'base64', function(error) {
                            if (error) {
                                return console.error(error);
                            }
                        })
                    }
                    if (record)
                        response.send({
                            status: 0,
                            message: 'User updated successfully'
                        })
                    else
                        response.send({
                            status: 1,
                            message: 'User not updated'
                        })
                }).catch(function(error) {
                    response.send({
                        status: 2,
                        message: 'User does not exist'
                    })
                })
            }).catch(function(error) {
                response.send({
                    status: 2,
                    message: 'User does not exist'
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
            userid = token.userid
            this.user.find({
                attributes: ['pswd'],
                where: {
                    userid: userid
                }
            }).then(function(user) {
                oldPassword = crypto.createHmac('sha256', secret)
                    .update(record.oldPswd)
                    .digest('hex')
                newPassword = crypto.createHmac('sha256', secret)
                    .update(record.newPswd)
                    .digest('hex')
                if (oldPassword == user.dataValues.pswd) {
                    user.update({
                        pswd: newPassword
                    }, {
                        where: {
                            userid: userid
                        }
                    }).then(function(record) {
                        if (record)
                            response.send({
                                status: 0,
                                message: 'user updated successfully'
                            })
                        else
                            response.send({
                                status: 1,
                                message: 'user not updated'
                            })
                    }).catch(function(error) {
                        response.send({
                            status: 2,
                            message: 'user does not exist'
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
                    message: 'user does not exist'
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
            this.user.destroy({
                where: {
                    userid: token.userid
                }
            }).then(function(record) {
                if (record)
                    response.send({
                        status: 0,
                        message: 'User deleted successfully'
                    })
                else
                    response.send({
                        status: 1,
                        message: 'User does not exist'
                    })
            }).catch(function(error) {
                response.send({
                    status: 1,
                    message: 'User does not exist'
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
        this.user.find({
            attributes: ['userid', 'pswd'],
            where: {
                email: record.email
            }
        }).then(function(user) {
            hash = crypto.createHmac('sha256', secret)
                .update(record.pswd)
                .digest('hex')
            if (hash == user.dataValues.pswd) {
                token = jwt.sign({
                    userid: user.dataValues.userid
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
                message: 'User does not exist'
            })
        })
    }
}

module.exports = new user()
