var connection = require('../../connection')

function deviceCategoryRelation() {

    this.conn = null
    sequelize = null
    this.deviceCategoryRelation = null
    this.deviceid = null
    this.category = null
    this.subcategory = null

    this.init = function(deviceid, category, subcategory) {
        this.conn = connection.getConnection()
        sequelize = connection.getSequelize()
        this.deviceid = deviceid
        this.category = category
        this.subcategory = subcategory

        console.log(deviceid, category, subcategory)
        this.deviceCategoryRelation = this.conn.define('deviceCategoryRelation', {
            deviceCategoryRelationid: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            deviceidid: {
                type: sequelize.INTEGER,
                references: {
                    model: 'deviceid',
                    key: 'deviceidid'
                }
            },
            categoryid: {
                type: sequelize.INTEGER,
                references: {
                    model: 'category',
                    key: 'categoryid'
                }
            },
            subcategoryid: {
                type: sequelize.INTEGER,
                references: {
                    model: 'subcategory',
                    key: 'subcategoryid'
                }
            }
        }, {
            freezeTableName: true,
            timestamps: true
        })
        this.deviceCategoryRelation.sync()

        this.deviceCategoryRelation.belongsTo(this.deviceid, {
            as: 'deviceid',
            foreignKey: 'deviceidid'
        })

        this.deviceCategoryRelation.belongsTo(this.category, {
            as: 'category',
            foreignKey: 'categoryid'
        })

        this.deviceCategoryRelation.belongsTo(this.subcategory, {
            as: 'subcategory',
            foreignKey: 'subcategoryid'
        })


    }

    this.getDeviceCategoryRelationObject = function() {
        return this.deviceCategoryRelation
    }

    this.get = function(response) {
        this.deviceCategoryRelation.findAll().then((deviceid) => {
            response.send(deviceid)
        }).catch((error) => {
            response.send({
                status: 1,
                message: error
            })
        })
    }


    this.post = function(req, res) {
        let _self = this

        this.deviceid.find({
            where: {
                deviceid: req.deviceid
            }
        }).then((result) => {
            let device = result
            _self.deviceCategoryRelation.destroy({
                where: {
                    deviceidid: result.deviceidid
                }
            }).then((result) => {
                console.log(req)
                let categories = req.category.split(',')
                for (let i = 0; i < categories.length; i++) {
                    _self.deviceCategoryRelation.create({
                        deviceidid: device.deviceidid,
                        categoryid: categories[i],
                        subcategoryid: req.subcategory
                    }).then((res) => {
                        // console.log(res)
                    }).error((err) => {
                        console.log(err)
                    })
                }

                res.send({
                    status: 0,
                    message: 'Category Added to Devices'
                })
            }).error((err) => {
                console.log(err)
            })

        }).error((err) => {
            console.log(err)
        })
    }
}

module.exports = new deviceCategoryRelation()
