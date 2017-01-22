'use-strict'
var token
var imageData
var image


$(document).ready(function() {
	$('#login').hide()
	$('#post').hide()
	token = localStorage.getItem('token')
	if(token){
		postShow()	
	}else{
		$('#login').show()
	}
})


$.ajax({
	type: 'GET',
	url: '/subcategory/',
	success: function(res){
		console.log(res)
	},
	error: function(err){
		console.log(err)
	}
})

function postShow(){
	$('#loading-modal').modal('show')
	$.ajax({
		type: 'GET',
		url: '/category/',
		success: function(res){
			console.log(res)
			$('#post').show()
			$('#loading-modal').modal('hide')
		},
		error: function(err){
			console.log(err)
		}
	})
}


$('#login-form').submit(function(event){
	event.preventDefault()
	var query = $(this).serialize()

	$('#loading-modal').modal('show')

	$.ajax({
		type: 'POST',
		url: '/writer/login/',
		data: query,
		success: function(res){
			console.log(res)
			if(res.status == 0){
				token = res.message.token
				localStorage.setItem('token', token)
				$('#login').hide()
				$('#post').show()
				$('#loading-modal').modal('hide')
			}else{
				$('#loading-modal').modal('hide')
				alert(res.message)
			}
		},
		error: function(err){
			alert('Something Went Wrong. Please Try Again.')
			$('#loading-modal').modal('hide')
		}
    })
})

$('#post-form').submit(function(event){
	event.preventDefault()
	
	title = $('#post-title').val()
	post = $('#post-data').val()

	$('#loading-modal').modal('show')

	$.ajax({
		type: 'POST',
		url: '/post/',
		data: {
			token: token,
			title: title,
			image: image,
			imageData: imageData,
			category: 1,
			subcategory: 1,
			post: post
		},
		success: function(res){
			console.log(res)
			$('#loading-modal').modal('hide')
			if(res.status == 0){
				alert('Post Added and is Waiting for Verification')
			}else{
				alert('Something Went Wrong. Please Try Again.')
			}
		},
		error: function(err){
			alert('Something Went Wrong. Please Try Again.')
			$('#loading-modal').modal('hide')
		}
    })

})

function readFile() {
  if (this.files && this.files[0]) {
  	image = this.files[0].name
    var FR= new FileReader()
    FR.onload = function(e) {
    	imageData = e.target.result
    };       
    FR.readAsDataURL(this.files[0])
  }
}

document.getElementById("post-image").addEventListener("change", readFile, false);
