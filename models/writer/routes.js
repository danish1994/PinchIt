var writer = require('./model')

function writer_routes() {
    this.route = function(service) {
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
    }
}

module.exports = new writer_routes()