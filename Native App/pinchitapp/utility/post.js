function post(){
  this.get = function(){
    return fetch('https://localhost:8888/post/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    }).then((response)=>{
      return response;
    }).error((error)=>{
      console.log(error);
    })
  }
}

module.exports = new post();
