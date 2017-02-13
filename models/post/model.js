var connection = require('../../connection')
var fs = require('fs')
var jwt = require('jsonwebtoken')
const jwtsecret = '7fchy5GCHGHJGYYC'
const secret = 'jcjudr4yjj888HGCFC'
var crypto = require('crypto')


var s3 = require('s3');

var client = s3.createClient({
    maxAsyncS3: 20, // this is the default 
    s3RetryCount: 3, // this is the default 
    s3RetryDelay: 1000, // this is the default 
    multipartUploadThreshold: 20971520, // this is the default (20 MB) 
    multipartUploadSize: 15728640, // this is the default (15 MB) 
    s3Options: {
        accessKeyId: "AKIAICF55LTRN4M2NU5Q",
        secretAccessKey: "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",
        region: 'us-west-2'
    },
})

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
            title: {
                type: sequalize.STRING,
                allowNull: false
            },
            post: {
                type: sequalize.STRING(500),
                allowNull: false
            },
            link: {
                type: sequalize.STRING,
                allowNull: true
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
            offset: record.offset,
            limit: record.limit,
            order: [
                ['updatedAt', 'DESC']
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
                verified: true,
                updatedAt: {
                    $lt: new Date(),
                    $gt: new Date(record.updatedAt || new Date() - 10 * 24 * 60 * 60 * 1000)
                }
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

    this.getUnverified = function(record, response) {
        this.post.findAll({
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
                verified: false
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
        }).then(function(post) {
            response.send(post)
        }).catch(function(error) {
            response.send({
                status: 1,
                message: error
            })
        })
    }



    this.getAll = function(record, response) {
        this.post.findAll({
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
                        var imageName = null
                        var bucket = 'www.pinched.in'
                        if (record.image) {
                            imageName = new Date().toISOString() + record.title + writer.writerid
                            imageName = crypto.createHmac('sha256', secret)
                                .update(imageName)
                                .digest('hex')

                            imageName = imageName + '.' + record.image.split('.')[record.image.split('.').length - 1]

                            imagePath = 'public/img/posts/' + imageName

                            var image = record.imageData.replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/png;base64,/, "").replace(/^data:image\/jpg;base64,/, "")


                            fs.writeFile(imagePath, image, 'base64', function(error) {
                                if (error) {
                                    return console.error(error);
                                } else {
                                    var params = {
                                        localFile: imagePath,

                                        s3Params: {
                                            Bucket: bucket,
                                            Key: 'post/' + imageName,
                                            ACL: 'public-read'
                                        },
                                    }

                                    var uploader = client.uploadFile(params)

                                    uploader.on('error', function(err) {
                                        console.error("unable to upload:", err.stack)
                                    })

                                    // uploader.on('progress', function() {
                                    //     console.log("progress", uploader.progressMd5Amount,
                                    //         uploader.progressAmount, uploader.progressTotal)
                                    // })

                                    uploader.on('end', function() {
                                        console.log("done uploading")
                                    })
                                }
                            })

                        }
                        parent.post.create({
                            title: record.title,
                            post: record.post,
                            image: s3.getPublicUrlHttp(bucket, 'post/' + imageName, 'us-west-2'),
                            link: record.link,
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

    this.delete = function(record, response) {
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
                    parent.post.destroy({
                        where: {
                            postid: record.id
                        }
                    }).then(function(record) {
                        if (record)
                            response.send({
                                status: 0,
                                message: 'Post deleted successfully'
                            })
                        else
                            response.send({
                                status: 1,
                                message: 'Post not deleted'
                            })
                    }).catch(function(error) {
                        response.send({
                            status: 2,
                            message: 'Post does not exist'
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
