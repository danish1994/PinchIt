var admin = require('./models/admin/model')
var category = require('./models/category/model')
var post = require('./models/post/model')
var subcategory = require('./models/subcategory/model')
var writer = require('./models/writer/model')
var user = require('./models/user/model')
var views = require('./models/views/model')
var deviceid = require('./models/deviceid/model')
var deviceCategoryRelation = require('./models/deviceCategoryRelation/model')


module.exports = function() {
    deviceid.init()
    user.init()
    category.init()
    subcategory.init(category.getCategoryObject())
    admin.init()
    writer.init(admin.getAdminObject())
    views.init(user.getUserObject())
    deviceCategoryRelation.init(deviceid.getDeviceIdObject(), category.getCategoryObject(), subcategory.getSubCategoryObject())
    post.init(admin.getAdminObject(), category.getCategoryObject(), subcategory.getSubCategoryObject(), writer.getWriterObject(), views.getViewsObject(), deviceid.getDeviceIdObject(), deviceCategoryRelation.getDeviceCategoryRelationObject())
}
