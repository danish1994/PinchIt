var admin = require('./models/admin')
var category = require('./models/category')
var post = require('./models/post')
var subcategory = require('./models/subcategory')
var writer = require('./models/writer')
var user = require('./models/user')

module.exports = function() {
    user.init()
    category.init()
    subcategory.init(category.getCategoryObject())
    admin.init()
    writer.init(admin.getAdminObject())
    post.init(admin.getAdminObject(), category.getCategoryObject(), subcategory.getSubCategoryObject(), writer.getWriterObject())
}