function init() {
    var user_email = '';
    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('dynamic-menu');
        // Check user login
        if (user) {
            user_email = user.email;
            menu.innerHTML = "<span class='dropdown-item'>" + user.email + "</span><span class='dropdown-item' id='btnLogout'>Logout</span>";
            /// TODO 5: Complete logout button event
            ///         1. Add a listener to logout button 
            ///         2. Show alert when logout success or error (use "then & catch" syntex)

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
            // It won't show any post if not login
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

    post_btn = document.getElementById('post_btn');
    post_txt = document.getElementById('comment');

    post_btn.addEventListener('click', function () {
        if (post_txt.value != "") {
            /// TODO 6: Push the post to database's "com_list" node
            ///         1. Get the reference of "com_list"
            ///         2. Push user email and post data
            ///         3. Clear text field

        
            firebase.database().ref('com_list').push({ 
                email : user_email,
                comment : post_txt.value
            });
            post_txt.value ="";
        }
    });

    // The html code for post
    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'>Recent updates</h6><div class='media text-muted pt-3'><img src='img/test.svg' alt='' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
    var str_after_content = "</p></div></div>\n";

    var postsRef = firebase.database().ref('com_list');
    // List for store posts html
    var total_post = [];
    // Counter for checking history post update complete
    var first_count = 0;
    // Counter for checking when to update new post
    var second_count = 0;

    postsRef.on('child_added',snapshot=> {
            /// TODO 7: Get all history posts when the web page is loaded and add listener to update new post
            ///         1. Get all history post and push to a list (str_before_username + email + </strong> + data + str_after_content)
            ///         2. Join all post in list to html in once
            ///         4. Add listener for update the new post
            ///         5. Push new post's html to a list
            ///         6. Re-join all post in list to html when update
            ///
            ///         Hint: When history post count is less then new post count, update the new and refresh html
            var post_list = document.getElementById('post_list');

            var new_post = str_before_username + snapshot.val().email + "</strong>" + snapshot.val().comment + str_after_content;
            post_list.innerHTML = post_list.innerHTML + new_post;
        })
        .catch(e => console.log(e.message));
}

window.onload = function () {
    init();
};