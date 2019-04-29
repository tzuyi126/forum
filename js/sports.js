function init() {
    var user_email = '';
    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('dynamic-menu');
        // Check user login
        if (user) {
            user_email = user.email;
            menu.innerHTML = "<span class='dropdown-item'>" + user.email + "</span><span class='dropdown-item' id='btnLogout'>Logout</span>";

            btnLogout.addEventListener('click', function () {
                firebase.auth().signOut()
                .then(function() {
                    alert("Log out successfully!");
                })
                .catch(function(error) {
                    alert("Fail to Log out!");
                });
            });

        } else {
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

    post_btn = document.getElementById('post_btn');
    post_txt = document.getElementById('comment');

    post_btn.addEventListener('click', function () {
        if (post_txt.value != "") {

            firebase.database().ref('com_list').push({ 
                email : user_email,
                comment : post_txt.value,
                type:"sports"
            });
            post_txt.value ="";
        }
    });

    // The html code for post
    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'></h6><div class='media text-muted pt-3'><img src='img/user.png' alt='' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 big lh-125 border-bottom border-gray'>";
    var str_after_content = "</p>SPORTS</div></div>\n";

    var postsRef = firebase.database().ref('com_list');
    // List for store posts html
    var total_post = [];
    // Counter for checking history post update complete
    var first_count = 0;
    // Counter for checking when to update new post
    var second_count = 0;

    postsRef.on('child_added',snapshot=> {
            var post_list = document.getElementById('post_list');

            if(snapshot.val().type == "sports"){
                var new_post = str_before_username + snapshot.val().email +"<strong style='font-size:20px' class='d-block text-gray-dark'>" + snapshot.val().comment + "</strong>"+ str_after_content;
                post_list.innerHTML = post_list.innerHTML + new_post;
            }
        })
        .catch(e => console.log(e.message));
}

window.onload = function () {
    init();
};