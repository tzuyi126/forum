function initApp() {
    // Login with Email/Password
    var txtEmail = document.getElementById('inputEmail');
    var txtPassword = document.getElementById('inputPassword');
    var txtPassword2 = document.getElementById('inputPassword2');
    var btnSignUp = document.getElementById('btnSignUp');

    btnSignUp.addEventListener('click', function () {
        var email = txtEmail.value;
        var pass = txtPassword.value;
        var pass2 = txtPassword2.value;

        if(pass==pass2 && pass!=""){
            firebase.auth().createUserWithEmailAndPassword(email,pass)
            .then(function() {
                txtEmail.value = "";
                txtPassword.value = "";
                txtPassword2.value = "";
                create_alert("success","sign up");
            })
            .catch(function(error) {
                create_alert("error","sign up");
            });
        }
        else{
            create_alert("error","Your passwords aren't the same!");
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
    initApp();
};