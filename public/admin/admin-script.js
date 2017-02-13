'use-strict'
var admin_token
var imageData
var image


$(document).ready(function() {
    $('#loading-modal').modal('show')
    loginHide()
    adminHide()
    admin_token = localStorage.getItem('admin_token')
    if (admin_token) {
        adminShow()
    } else {
        $('#loading-modal').modal('hide')
        $('#login').show()
    }
})


function loginHide() {
    $('#login').hide()
}

function adminHide() {
    $('#admin').hide()
    $('#logout').hide()
}

function adminShow() {
    $.ajax({
        type: 'GET',
        url: '/post/unverified/',
        success: function(res) {
            $('#admin').show()
            $('#logout').show()
            $('#loading-modal').modal('hide')
            loadPost(res)
        },
        error: function(err) {
            console.log(err)
        }
    })
}

function loadPost(posts) {
    $.each(posts, function(i, post) {
        $('#post-container').append(postPrototype(post))
    })
    $('#post-container').append('<div class="row"> <div class="text-center col-sm-12"> <h4> No More Posts </h4> </div> </div>')
}

function postPrototype(post) {

    var res = '<div class="col-sm-4">' +
        '                                <div class="row post">' +
        '                                    <div class="col-sm-12 post-image">' +
        '                                        <img src="' + post.image + '" style="width: 100%">' +
        '                                    </div>' +
        '                                    <div class="col-sm-12">' +
        '                                        <h4>' + post.title + '</h4>' +
        '                                    </div>' +
        '                                    <div class="col-sm-12">' +
        '                                        <p>' + post.post + '</p>' +
        '                                    </div>' +
        '                                    <div class="col-sm-12 read-more text-center">' +
        '                                        <a href="' + post.link + '" target="_blank">Read More</a>' +
        '                                    </div>' +
        '                                    <div class="col-sm-12">' +
        '                                        <button class="btn btn-default full-width" onClick="verifyPost(' + post.postid + ')">Verify</button>' +
        '                                    </div>' +
        '                                    <div class="col-sm-12">' +
        '                                        <button class="btn btn-danger full-width" onClick="deletePost(' + post.postid + ')">Delete</button>' +
        '                                    </div>' +
        '                                </div>' +
        '                            </div>';

    return res
}

function deletePost(id) {
    $('#loading-modal').modal('show')
    $.ajax({
        type: 'DELETE',
        url: '/post/' + id + '/' + admin_token,
        success: function(res) {
            console.log(res)
            if (res.status == 0) {
                $('#loading-modal').modal('hide')
                alert('Post Deleted')
                location.reload()
            } else {
                $('#loading-modal').modal('hide')
                alert(res.message)
            }
        },
        error: function(err) {
            alert('Something Went Wrong. Please Try Again.')
            $('#loading-modal').modal('hide')
        }
    })
}

function verifyPost(id) {
    $('#loading-modal').modal('show')
    $.ajax({
        type: 'POST',
        url: '/post/verify/',
        data: {
            token: admin_token,
            postid: id
        },
        success: function(res) {
            console.log(res)
            if (res.status == 0) {
                $('#loading-modal').modal('hide')
                alert('Post Verified')
                location.reload()
            } else {
                $('#loading-modal').modal('hide')
                alert(res.message)
            }
        },
        error: function(err) {
            alert('Something Went Wrong. Please Try Again.')
            $('#loading-modal').modal('hide')
        }
    })
}


$('#admin-login-form').submit(function(event) {
    event.preventDefault()
    var query = $(this).serialize()

    $('#loading-modal').modal('show')

    $.ajax({
        type: 'POST',
        url: '/admin/login/',
        data: query,
        success: function(res) {
            console.log(res)
            if (res.status == 0) {
                admin_token = res.message.token
                localStorage.setItem('admin_token', admin_token)
                loginHide()
                adminShow()
                $('#loading-modal').modal('hide')
            } else {
                $('#loading-modal').modal('hide')
                alert(res.message)
            }
        },
        error: function(err) {
            alert('Something Went Wrong. Please Try Again.')
            $('#loading-modal').modal('hide')
        }
    })
})




$('#logout').click(function() {
    localStorage.removeItem('admin_token')
    location.reload()
})
