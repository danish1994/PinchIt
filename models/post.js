var connection = require('../connection')
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

    this.init = function(admin, category, subcategory, writer) {
        this.conn = connection.getConnection()
        sequalize = connection.getSequelize()
        this.admin = admin
        this.category = category
        this.subcategory = subcategory
        this.writer = writer

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
            verify: {
                type: sequalize.BOOLEAN,
                allowNull: false
            }

        }, {
            freezeTableName: true,
            timestamps: true
        })
        this.post.sync()

        this.admin.hasMany(this.post, {
            foreignKey: 'adminid'
        })

        this.category.hasMany(this.post, {
            foreignKey: 'categoryid'
        })

        this.subcategory.hasMany(this.post, {
            foreignKey: 'subcategoryid'
        })

        this.writer.hasMany(this.post, {
            foreignKey: 'writerid'
        })
    }

    this.getPostObject = function() {
        return this.post
    }

    this.get = function(record, response) {
        this.post.findAll({
            attributes: ['postid', 'post', 'image', 'adminid', 'categoryid', 'subcategoryid', 'writerid', 'verify', 'updatedAt'],
            order: ['updatedAt', 'DESC'],
            limit: record.limit,
            offset: record.offset,
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
        })
    }

    this.postObject = function(record, response) {
        try {
            token = jwt.verify(record.token, jwtsecret)
            writerid = token.writerid
            parent = this
            this.writer.find({
                where: {
                    writerid: writerid
                }
            }).then(function(writer) {
                if (writer.dataValues.verified) {
                    parent.post.create({
                        post: record.post,
                        image: record.image,
                        categoryid: record.category,
                        subcategoryid: record.subcategory,
                        writerid: writer.dataValues.writerid,
                        verify: false
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