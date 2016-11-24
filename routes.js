var admin = require('./models/admin')
var user = require('./models/user')
var writer = require('./models/writer')
var post = require('./models/post')
var category = require('./models/category')
var subcategory = require('./models/subcategory')


module.exports = {
    configure: function(service) {


        service.get('/', function(request, response) {
            response.send({
                status: 0,
                message: 'Hello API'
            })
        })


        //Admin Routes
        service.get('/admin/getall/', function(request, response) {
            admin.get(response)
        })

        service.get('/admin/:id', function(request, response) {
            admin.getAdmin(request.params.id, response)
        })

        service.post('/admin/', function(request, response) {
            admin.post(request.body, response)
        })

        service.post('/admin/login/', function(request, response) {
            admin.login(request.body, response)
        })

        service.put('/admin/', function(request, response) {
            admin.update(request.body, response)
        })

        service.delete('/admin/:id', function(request, response) {
            admin.delete(request.params.id, response)
        })


        //Category Routes
        service.get('/category/', function(request, response) {
            category.get(response)
        })

        service.post('/category/', function(request, response) {
            category.post(request.body, response)
        })


        //SubCategory Routes
        service.get('/subcategory/', function(request, response) {
            subcategory.get(response)
        })

        service.post('/subcategory/', function(request, response) {
            subcategory.post(request.body, response)
        })



        //User Routes
        service.get('/user/getall/', function(request, response) {
            user.get(response)
        })

        service.get('/user/:id', function(request, response) {
            user.getUser(request.params.id, response)
        })

        service.get('/user/image/:id', function(request, response) {
            user.getUserImage(request.params.id, response)
        })

        service.post('/user/', function(request, response) {
            user.post(request.body, response)
        })

        service.post('/user/login/', function(request, response) {
            user.login(request.body, response)
        })

        service.put('/user/', function(request, response) {
            user.update(request.body, response)
        })

        service.delete('/user/:id', function(request, response) {
            user.delete(request.params.id, response)
        })


        //Writer Routes
        service.get('/writer/getall/', function(request, response) {
            writer.get(response)
        })

        service.get('/writer/:id', function(request, response) {
            writer.getWriter(request.params.id, response)
        })

        service.post('/writer/', function(request, response) {
            writer.post(request.body, response)
        })

        service.post('/writer/verify/', function(request, response) {
            writer.verify(request.body, response)
        })

        service.post('/writer/login/', function(request, response) {
            writer.login(request.body, response)
        })

        service.put('/writer/', function(request, response) {
            writer.update(request.body, response)
        })

        service.delete('/writer/:id', function(request, response) {
            writer.delete(request.params.id, response)
        })


        //Post Routes
        service.get('/post/', function(request, response) {
            post.get(request.body, response)
        })

        service.post('/post/', function(request, response) {
            post.postObject(request.body, response)
        })

    }
}