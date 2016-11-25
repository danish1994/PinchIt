var admin = require('./model')


function admin_routes() {

    this.route = function(service) {
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
    }
}

module.exports = new admin_routes()