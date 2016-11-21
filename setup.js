var admin = require('./models/admin')
var user = require('./models/user')
var category = require('./models/category')
var subcategory = require('./models/subcategory')
var writer = require('./models/writer')


module.exports = function() {
    user.init()
    category.init()
    subcategory.init()
    admin.init()
    writer.init(admin.getAdminObject())
}