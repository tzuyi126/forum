function init() {
    var user_email = '';
    firebase.auth().onAuthStateChanged(function (user) {
        var menu = document.getElementById('user_menu');
        var username = document.getElementById('username');
        var txtNP = document.getElementById('newPassword');
        var txtNP2 = document.getElementById('newPassword2');
        var btnChange = document.getElementById('btnChange');

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

            // Change Password
            btnChange.addEventListener('click', function () {
                var NP = txtNP.value;
                var NP2 = txtNP2.value;

                if(NP==NP2 && NP!=""){
                    user.updatePassword(NP).then(function(){
                        // Update successful.
                        create_alert("success","Your password has changed!");
                    }).catch(function(error) {
                        // An error happened.
                        create_alert("error","Fail to change password!");
                    });
                }
                else{
                    create_alert("error","Your new passwords are wrong!");
                }
            });

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