var category = require('./model')

function category_routes() {

    this.route = function(service) {
        service.get('/category/', function(request, response) {
            category.get(response)
        })

        service.post('/category/', function(request, response) {
            category.post(request.body, response)
        })
    }
}

module.exports = new category_routes()