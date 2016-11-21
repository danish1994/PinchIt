var connection = require('../connection')

function category() {

    this.conn = null
    sequelize = null
    this.category = null

    this.init = function() {
        this.conn = connection.getConnection()
        sequelize = connection.getSequelize()
        this.category = this.conn.define('category', {
            categoryid: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            category: sequelize.STRING(100),
        }, {
            freezeTableName: true,
            timestamps: true
        })
        this.category.sync()
    }

    this.getCategoryObject = function() {
        return this.category
    }

    this.post = function(record, response) {
        this.category.create({
            category: record.category,
        }).then(function() {
            response.send({
                status: 0,
                message: 'Category added Successfully'
            })
        }).catch(function(error) {
            response.send({
                status: 1,
                message: 'Category not added'
            })
        })
    }


}

module.exports = new category()