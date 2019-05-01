function init() {
    var user_email = '';
    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('user_menu');
        // Check user login
        if (user) {
            user_email = user.email;
            menu.innerHTML = "<a class='btn' style='color: white;' href='userpage.html'>" + user_email +"</a><a class='btn' style='color: white;' id='btnLogout'>Logout</a>";

            btnLogout.addEventListener('click', function () {
                firebase.auth().signOut()
                .then(function() {
                    alert("Log out successfully!");
                    window.location = "index.html";
                })
                .catch(function(error) {
                    alert("Fail to Log out!");
                });
            });

        } else {
            menu.innerHTML = "<a class='btn' style='color: white;' href='signin.html'>Log In</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

    // The html code for post
    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'></h6><div class='media text-muted pt-3'><img src='img/user.png' alt='' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 big lh-125 border-bottom border-gray'>";
    var str_after_username = "</p></div></div>";
    var postsRef = firebase.database().ref('post');

    postsRef.on('child_added',snapshot=> {
        var post_list = document.getElementById('post_list');
            
        var new_post = str_before_username + snapshot.val().email +"<strong style='font-size:20px' class='d-block text-gray-dark'>" + snapshot.val().comment + "</strong><div style='float:right;'>#" + snapshot.val().type + str_after_username;
        post_list.innerHTML = post_list.innerHTML + new_post;
    })
    .catch(e => console.log(e.message));

        
}

window.onload = function () {
    init();
};