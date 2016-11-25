var subcategory = require('./model')

function subcategory_routes() {

    this.route = function(service) {
        service.get('/subcategory/', function(request, response) {
            subcategory.get(response)
        })

        service.post('/subcategory/', function(request, response) {
            subcategory.post(request.body, response)
        })
    }
}

module.exports = new subcategory_routes()