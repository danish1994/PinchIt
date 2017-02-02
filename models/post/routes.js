var post = require('./model')

function post_routes() {

    this.route = function(service) {

        service.delete('/post/:id', function(request, response) {
            post.delete(request.params.id, response)
        })

        service.get('/post/getAll/', function(request, response) {
            post.getAll(request.body, response)
        })

        service.get('/post/unverified/', function(request, response) {
            post.getUnverified(request.body, response)
        })

        service.get('/post/:id', function(request, response) {
            post.getPost(request.params.id, response)
        })

        service.get('/post/', function(request, response) {
            post.get(request.body, response)
        })

        service.post('/post/', function(request, response) {
            post.postObject(request.body, response)
        })

        service.post('/post/verify/', function(request, response) {
            post.verify(request.body, response)
        })
    }
}

module.exports = new post_routes()