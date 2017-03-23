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
        url: '/post/getAll/?category=1',
        success: function(res) {
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
            loadPostAllEducation(res)
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

    $('.update-post').submit(function(event) {
        event.preventDefault()
        let id = this.id
        title = $('#post-title' + id).val()
        post = $('#post-data' + id).val()
        link = $('#post-link' + id).val()

        let data = {
            token: admin_token,
            title: title,
            post: post,
            link: link,
            postid: id
        }

        $.ajax({
            type: 'PUT',
            url: '/post/',
            data: data,
            success: function(res) {
                if (res.status == 0) {
                    location.reload()
                    alert('Post Updated')
                } else {
                    alert('Something Went Wrong. Please Try Again.')
                }
            },
            error: function(err) {
                alert('Something Went Wrong. Please Try Again.')
            }
        })

    })

    $('#post-container').append('<div class="row"> <div class="text-center col-sm-12"> <h4> No More Posts </h4> </div> </div>')
}

function loadPostAllEducation(posts) {
    $.each(posts, function(i, post) {
        $('#post-container-all-education').append(postPrototypeAllEducation(post))
    })

    $('#post-container-all-education').append('<div class="row"> <div class="text-center col-sm-12"> <h4> No More Posts </h4> </div> </div>')
}

function postPrototype(post) {
    var res = '<div class="col-sm-4"> <div class="row post"> <div class="col-sm-12 post-image"> <img src="' + post.image + '" style="width: 100%"> </div><div class="col-sm-12"> <h4>' + post.title + '</h4> </div><div class="col-sm-12"> <p>' + post.post + '</p><br/> <br/> <p>Pinch By: ' + post.writer.name + '</p></div><div class="col-sm-12 read-more text-center"> <a href="' + post.link + '" target="_blank">Read More</a> </div><div class="col-sm-12"> <button class="btn btn-success full-width" onClick="verifyPost(' + post.postid + ',true)">Verify with Notification</button> </div><div class="col-sm-12"> <button class="btn btn-warning full-width" onClick="verifyPost(' + post.postid + ', false)">Verify without Notification</button> </div><div class="col-sm-12"> <button class="btn btn-danger full-width" onClick="deletePost(' + post.postid + ')">Delete</button> </div><div class="col-sm-12"> <button class="btn btn-primary full-width" data-toggle="modal" data-target="#myModal' + post.postid + '">Edit</button> </div></div><div id="myModal' + post.postid + '" class="modal fade" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Edit Post</h4> </div><div class="modal-body"> <div class="col-sm-10 col-sm-offset-1"> <div class="row"> <form class="form-inline update-post" id="' + post.postid + '"> <br/> <div class="col-sm-12"> <img src="' + post.image + '" style="width: 100%; padding-bottom: 20px;"> </div><div class="col-sm-12"> <div class="row"> <div class="col-sm-2"> <label>Title*</label> </div><div class="col-sm-10"> <input type="text" id="post-title' + post.postid + '" name="title" class="form-control full-width" maxlength="60" required value="' + post.title + '"> </div></div></div><div class="col-sm-12"> <div class="row"> <div class="col-sm-2"> <label>Desc*</label> </div><div class="col-sm-10"> <textarea rows="4" cols="50" id="post-data' + post.postid + '" class="form-control full-width" maxlength="320" required>' + post.post + '</textarea> </div></div></div><div class="col-sm-12"> <div class="row"> <div class="col-sm-2"> <label>Link</label> </div><div class="col-sm-10"> <input type="text" id="post-link' + post.postid + '" name="link" class="form-control full-width" value="' + post.link + '"> </div></div></div><div class="col-sm-12"> <input type="submit" value="Submit" class="btn btn-default full-width"> </div></form> </div></div></div><div class="modal-footer"> </div></div></div></div></div>';
    return res
}

function postPrototypeAllEducation(post) {
    var res = '<div class="col-sm-4"> <div class="row post"> <div class="col-sm-12 post-image"> <img src="' + post.image + '" style="width: 100%"> </div><div class="col-sm-12"> <h4>' + post.title + '</h4> </div><div class="col-sm-12"> <p>' + post.post + '</p><br/> <br/> <p>Pinch By: ' + post.writer.name + '</p></div><div class="col-sm-12 read-more text-center"> <a href="' + post.link + '" target="_blank">Read More</a> </div><div class="col-sm-12"> <button class="btn btn-success full-width" onClick="verifyPost(' + post.postid + ',true)">Repost with Notification</button> </div><div class="col-sm-12"> <button class="btn btn-warning full-width" onClick="verifyPost(' + post.postid + ', false)">Repost without Notification</button> </div></div></div>';
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

function verifyPost(id, notification) {
    $('#loading-modal').modal('show')
    $.ajax({
        type: 'POST',
        url: '/post/verify/',
        data: {
            token: admin_token,
            postid: id,
            notification: notification
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
