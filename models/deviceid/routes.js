var deviceid = require('./model')

function deviceid_routes() {

    this.route = function(service) {
        service.get('/deviceid/', function(request, response) {
            deviceid.get(response)
        })

        service.post('/deviceid/', function(request, response) {
            deviceid.post(request.body, response)
        })
    }
}

module.exports = new deviceid_routes()