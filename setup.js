var user = require('./models/user')
var category = require('./models/category')
var subcategory = require('./models/subcategory')


module.exports = function() {
    user.init()
    category.init()
    subcategory.init()
}
