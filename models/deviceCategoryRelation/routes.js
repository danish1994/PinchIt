var deviceCategoryRelation = require('./model')

function deviceCategoryRelation_routes() {

    this.route = function(service) {
        service.get('/deviceCategoryRelation/', function(request, response) {
            deviceCategoryRelation.get(response)
        })

        service.post('/deviceCategoryRelation/', function(request, response) {
            deviceCategoryRelation.post(request.body, response)
        })
    }
}

module.exports = new deviceCategoryRelation_routes()