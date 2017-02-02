var admin_routes = require('./models/admin/routes')
var category_routes = require('./models/category/routes')
var subcategory_routes = require('./models/subcategory/routes')
var post_routes = require('./models/post/routes')
var user_routes = require('./models/user/routes')
var views_routes = require('./models/views/routes')
var writer_routes = require('./models/writer/routes')

var path = require('path')


module.exports = {
    configure: function(service) {


        service.get('/', function(request, response) {
            response.sendFile(path.join(__dirname, 'public/website/index.html'))
        })

        service.get('/writePost', function(request, response) {
            response.sendFile(path.join(__dirname, 'public/writer/index.html'))
        })

        service.get('/adminControl', function(request, response) {
            response.sendFile(path.join(__dirname, 'public/admin/index.html'))
        })

        //Admin Routes
        admin_routes.route(service)


        //Category Routes
        category_routes.route(service)


        //SubCategory Routes
        subcategory_routes.route(service)


        //Post Routes
        post_routes.route(service)


        //User Routes
        user_routes.route(service)


        //Writer Routes
        writer_routes.route(service)

        //Views Routes
        views_routes.route(service)
    }
}