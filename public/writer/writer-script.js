'use-strict'
var writer_token
var imageData
var image


$(document).ready(function() {
	$('#loading-modal').modal('show')
	loginHide()
	postHide()
	writer_token = localStorage.getItem('writer_token')
	if(writer_token){
		postShow()	
	}else{
		$('#loading-modal').modal('hide')
		$('#login').show()
	}
})


function loginHide(){
	$('#login').hide()
}

function postHide(){
	$('#post').hide()
	$('#logout').hide()
}

function postShow(){
	$.ajax({
		type: 'GET',
		url: '/category/',
		success: function(res){
			$('#post').show()
			$('#logout').show()
			$('#loading-modal').modal('hide')
		},
		error: function(err){
			console.log(err)
		}
	})
}

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




$('#writer-login-form').submit(function(event){
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
				writer_token = res.message.token
				localStorage.setItem('writer_token', writer_token)
				loginHide()
				postShow()
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
	link = $('#post-link').val()

	$('#loading-modal').modal('show')

	$.ajax({
		type: 'POST',
		url: '/post/',
		data: {
			token: writer_token,
			title: title,
			image: image,
			imageData: imageData,
			category: 1,
			subcategory: 1,
			post: post,
			link: link
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

$('#logout').click(function(){
	localStorage.removeItem('writer_token')
	location.reload()
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
