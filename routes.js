user = require('./models/user')

module.exports = {
    configure: function(service) {

        
        service.get('/', function(request, response) {
              response.send({
                status: 0,
                message: 'Hello API'
            })    
        })

        //User Routes
        service.get('/user/getall/',function(request,response){
            user.get(response)
        })

        service.get('/user/:id',function(request,response){
            user.getUser(request.params.id,response)
        })

        service.get('/user/image/:id',function(request,response){
            user.getUserImage(request.params.id,response)
        })
        
        service.post('/user/',function(request,response){
            user.post(request.body,response)
        })

        service.post('/user/login/',function(request,response){
            user.login(request.body,response)
        })

        service.put('/user/',function(request,response){
            user.update(request.body,response)
        })

        service.delete('/user/:id',function(request,response){
            user.delete(request.params.id,response)
        })

    }
}
