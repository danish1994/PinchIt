var connection = require('../connection')

function subcategory() {

    this.conn = null
    sequelize = null
    this.subcategory = null

    this.init = function() {
        this.conn = connection.getConnection()
        sequelize = connection.getSequelize()
        this.subcategory = this.conn.define('subcategory', {
            subcategoryid: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            subcategory: sequelize.STRING(100),
        }, {
            freezeTableName: true,
            timestamps: true
        })
        this.subcategory.sync()
    }

    this.getSubCategoryObject = function() {
        return this.subcategory
    }

    this.post = function(record, response) {
        this.subcategory.create({
            subcategory: record.subcategory,
        }).then(function() {
            response.send({
                status: 0,
                message: 'SubCategory added Successfully'
            })
        }).catch(function(error) {
            response.send({
                status: 1,
                message: 'SubCategory not added'
            })
        })
    }
}

module.exports = new subcategory()