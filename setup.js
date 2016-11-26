var admin = require('./models/admin/model')
var category = require('./models/category/model')
var post = require('./models/post/model')
var subcategory = require('./models/subcategory/model')
var writer = require('./models/writer/model')
var user = require('./models/user/model')
var views = require('./models/views/model')


module.exports = function() {
    user.init()
    category.init()
    subcategory.init(category.getCategoryObject())
    admin.init()
    writer.init(admin.getAdminObject())
    post.init(admin.getAdminObject(), category.getCategoryObject(), subcategory.getSubCategoryObject(), writer.getWriterObject())
    views.init(user.getUserObject(),post.getPostObject())
}