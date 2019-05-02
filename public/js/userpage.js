function init() {
    var user_email = '';
    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('user_menu');
        var username = document.getElementById('username');

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
            username.innerHTML = "Welcome back!!   <a style='color:rgb(60, 105, 158);'> " + user_email + "</a>"; 

        } else {
            menu.innerHTML = "<a class='btn' style='color: white;' href='signin.html'>Log In</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

    
}

// Custom alert
function create_alert(type, message) {
    var alertarea = document.getElementById('custom-alert');
    if (type == "success") {
        str_html = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    } else if (type == "error") {
        str_html = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    }
}

window.onload = function () {
    init();
};