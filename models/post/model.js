var connection = require('../../connection')
var fs = require('fs')
var jwt = require('jsonwebtoken')
const jwtsecret = '7fchy5GCHGHJGYYC'

function post() {

    this.conn = null
    sequalize = null
    this.post = null

    this.category = null
    this.subcategory = null
    this.writer = null
    this.admin = null
    this.views = null

    this.init = function(admin, category, subcategory, writer, views) {
        this.conn = connection.getConnection()
        sequalize = connection.getSequelize()
        this.admin = admin
        this.category = category
        this.subcategory = subcategory
        this.writer = writer
        this.views = views

        this.post = this.conn.define('post', {
            postid: {
                type: sequalize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            post: {
                type: sequalize.STRING,
                allowNull: false
            },
            image: {
                type: sequalize.STRING,
                allowNull: false
            },
            adminid: {
                type: sequalize.INTEGER,
                references: {
                    model: 'admin',
                    key: 'adminid'
                }
            },
            categoryid: {
                type: sequalize.INTEGER,
                allowNull: false,
                references: {
                    model: 'category',
                    key: 'categoryid'
                }
            },
            subcategoryid: {
                type: sequalize.INTEGER,
                allowNull: false,
                references: {
                    model: 'subcategory',
                    key: 'subcategoryid'
                }
            },
            writerid: {
                type: sequalize.INTEGER,
                allowNull: false,
                references: {
                    model: 'writer',
                    key: 'writerid'
                }
            },
            verified: {
                type: sequalize.BOOLEAN,
                allowNull: false
            }

        }, {
            freezeTableName: true,
            timestamps: true
        })
        this.post.sync()

        this.post.belongsTo(this.admin, {
            as: 'admin',
            foreignKey: 'adminid'
        })

        this.post.belongsTo(this.category, {
            as: 'category',
            foreignKey: 'categoryid'
        })

        this.post.belongsTo(this.subcategory, {
            as: 'subcategory',
            foreignKey: 'subcategoryid'
        })

        this.post.belongsTo(this.writer, {
            as: 'writer',
            foreignKey: 'writerid'
        })

        this.post.hasMany(this.views, {
            as: 'views',
            foreignKey: 'postid'
        })

        this.views.belongsTo(this.post, {
            foreignKey: 'postid'
        })
    }

    this.getPostObject = function() {
        return this.post
    }


    this.get = function(record, response) {
        this.post.findAll({
            attributes: ['postid', 'post', 'image', 'adminid', 'categoryid', 'subcategoryid', 'writerid', 'verified', 'updatedAt', 'createdAt'],
            offset: record.offset,
            limit: record.limit,
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{
                model: this.category,
                as: 'category',
                attributes: ['categoryid', 'category']
            }, {
                model: this.subcategory,
                as: 'subcategory',
                attributes: ['subcategoryid', 'subcategory']
            }, {
                model: this.writer,
                as: 'writer',
                attributes: ['writerid', 'name', 'email', 'deviceid', 'verified']
            }],
            where: {
                verified: true
            }
        }).then(function(posts) {
            response.send(posts)
        }).catch(function(error) {
            console.log
            response.send({
                status: 1,
                message: error
            })
        })
    }


    this.getPost = function(recordId, response) {
        this.post.findAll({
            attributes: ['postid', 'post', 'image', 'adminid', 'categoryid', 'subcategoryid', 'writerid', 'verified', 'updatedAt', 'createdAt'],
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{
                model: this.category,
                as: 'category',
                attributes: ['categoryid', 'category']
            }, {
                model: this.subcategory,
                as: 'subcategory',
                attributes: ['subcategoryid', 'subcategory']
            }, {
                model: this.writer,
                as: 'writer',
                attributes: ['writerid', 'name', 'email', 'deviceid', 'verified']
            }],
            where: {
                postid: recordId
            }
        }).then(function(posts) {
            response.send(posts)
        }).catch(function(error) {
            response.send({
                status: 1,
                message: error
            })
        })
    }



    this.getAll = function(record, response) {
        this.post.findAll({
            attributes: ['postid', 'post', 'image', 'adminid', 'categoryid', 'subcategoryid', 'writerid', 'verified', 'updatedAt', 'createdAt'],
            limit: record.limit,
            offset: record.offset,
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{
                model: this.category,
                as: 'category',
                attributes: ['categoryid', 'category']
            }, {
                model: this.subcategory,
                as: 'subcategory',
                attributes: ['subcategoryid', 'subcategory']
            }, {
                model: this.writer,
                as: 'writer',
                attributes: ['writerid', 'name', 'email', 'deviceid', 'verified']
            }]
        }).then(function(posts) {
            response.send(posts)
        }).catch(function(error) {
            response.send({
                status: 1,
                message: error
            })
        })
    }



    this.postObject = function(record, response) {
        try {
            token = jwt.verify(record.token, jwtsecret)
            writerid = token.writerid
            parent = this
            this.writer.find({
                where: {
                    writerid: writerid,
                }
            }).then(function(writer) {
                if (writer) {
                    if (writer.dataValues.verified) {
                        parent.post.create({
                            post: record.post,
                            image: record.image,
                            categoryid: record.category,
                            subcategoryid: record.subcategory,
                            writerid: writer.dataValues.writerid,
                            verified: false
                        }).then(function(post) {
                            response.send({
                                status: 0,
                                message: 'Post Added.'
                            })
                        }).catch(function(error) {
                            response.send({
                                status: 1,
                                message: error
                            })
                        })
                    } else
                        response.send({
                            status: 2,
                            message: 'Writer not verified'
                        })
                } else
                    response.send({
                        status: 3,
                        message: 'Token Expired'
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
                    parent.post.update({
                        verified: true,
                        adminid: admin.dataValues.adminid
                    }, {
                        where: {
                            postid: record.postid
                        }
                    }).then(function(post) {
                        if (post)
                            response.send({
                                status: 0,
                                message: 'Post verified'
                            })
                        else
                            response.send({
                                status: 1,
                                message: 'Post not verified'
                            })
                    }).catch(function(error) {
                        response.send({
                            status: 2,
                            message: error
                        })
                    })
                } else
                    response.send({
                        status: 3,
                        message: 'Token Expired'
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

module.exports = new post()