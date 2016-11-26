var connection = require('../../connection')
var jwt = require('jsonwebtoken')
const jwtsecret = '7fchy5GCHGHJGYYC'

function views() {

    this.conn = null
    sequelize = null
    this.views = null

    this.user = null
    this.post = null

    this.init = function(user, post) {
        this.conn = connection.getConnection()
        sequelize = connection.getSequelize()
        this.user = user
        this.post = post

        this.views = this.conn.define('views', {
            viewsid: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            time: {
                type: sequelize.INTEGER,
                allowNull: false
            },
            postid: {
                type: sequelize.INTEGER,
                references: {
                    model: 'post',
                    key: 'postid'
                }
            },
            userid: {
                type: sequelize.INTEGER,
                references: {
                    model: 'user',
                    key: 'userid'
                }
            }

        }, {
            freezeTableName: true,
            timestamps: true
        })

        this.views.sync()

        this.views.belongsTo(this.user, {
            as: 'user',
            foreignKey: 'userid'
        })

        this.views.belongsTo(this.post, {
            as: 'post',
            foreignKey: 'postid'
        })
    }

    this.getViewsObject = function() {
        return this.views
    }

    this.addView = function(record, response) {
        try {
            token = jwt.verify(record.token, jwtsecret)
            userid = token.userid
            parent = this
            this.user.find({
                attributes: ['userid', 'pswd'],
                where: {
                    userid: userid
                }
            }).then(function(user) {
                if (user) {
                    parent.views.create({
                        time: record.time,
                        postid: record.postid,
                        userid: user.dataValues.userid
                    }).then(function(views) {
                        response.send({
                            status: 0,
                            message: 'Views Added'
                        })
                    }).catch(function(error) {
                        response.send({
                            status: 1,
                            message: error
                        })
                    })
                } else {
                    response.send({
                        status: 2,
                        message: 'User does not exist'
                    })
                }
            }).catch(function(error) {

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

module.exports = new views