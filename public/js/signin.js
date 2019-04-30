function initApp() {
    // Login with Email/Password
    var txtEmail = document.getElementById('inputEmail');
    var txtPassword = document.getElementById('inputPassword');
    var btnLogin = document.getElementById('btnLogin');
    var btnGoogle = document.getElementById('btngoogle');
    var btnSignUp = document.getElementById('btnSignUp');

    btnLogin.addEventListener('click', function () {
        var email = txtEmail.value;
        var pass = txtPassword.value;
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(function() {
            window.location = "index.html";
        })
        .catch(function(error) {
            txtEmail.value = "";
            txtPassword.value = "";
            create_alert("error","Email Login");
        });
    });

    btnGoogle.addEventListener('click', function () {

        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                window.location = "index.html";
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                create_alert("error","Google Login");
            });
    });

    btnSignUp.addEventListener('click', function () {
        var email = txtEmail.value;
        var pass = txtPassword.value;
        firebase.auth().createUserWithEmailAndPassword(email,pass)
        .then(function() {
            txtEmail.value = "";
            txtPassword.value = "";
            create_alert("success","sign up");
        })
        .catch(function(error) {
            txtEmail.value = "";
            txtPassword.value = "";
            create_alert("error","sign up");
        });

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
    initApp();
};