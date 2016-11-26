var views = require('./model')

function views_routes() {
    this.route = function(service) {
        service.post('/views/', function(request, response) {
            views.addView(request.body, response)
        })
    }
}

module.exports = new views_routes()