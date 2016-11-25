var connection = require('../connection')

function subcategory() {

    this.conn = null
    sequelize = null
    this.subcategory = null

    this.category = null

    this.init = function(category) {
        this.conn = connection.getConnection()
        sequelize = connection.getSequelize()

        this.category = category

        this.subcategory = this.conn.define('subcategory', {
            subcategoryid: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            subcategory: sequelize.STRING(100),
            categoryid: {
                type: sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'category',
                    key: 'categoryid'
                }
            }
        }, {
            freezeTableName: true,
            timestamps: true
        })
        this.subcategory.sync()

        this.subcategory.belongsTo(this.category, {
            as: 'category',
            foreignKey: 'categoryid'
        })
    }

    this.getSubCategoryObject = function() {
        return this.subcategory
    }

    this.get = function(response) {
        this.subcategory.findAll({
            attributes: ['subcategoryid', 'subcategory'],
            include: [{
                model: this.category,
                as: 'category',
                attributes: ['categoryid', 'category']
            }]
        }).then(function(subcategory) {
            response.send(subcategory)
        }).catch(function(error) {
            response.send({
                status: 1,
                message: error
            })
        })
    }

    this.post = function(record, response) {
        this.subcategory.create({
            subcategory: record.subcategory,
            categoryid: record.category
        }).then(function() {
            response.send({
                status: 0,
                message: 'SubCategory added Successfully'
            })
        }).catch(function(error) {
            response.send({
                status: 1,
                message: 'SubCategory not Added'
            })
        })
    }
}

module.exports = new subcategory()