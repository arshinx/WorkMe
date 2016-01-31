$(document).ready(function(){
  var ref = new Firebase("https://workme.firebaseio.com/");
  document.getElementById("warning").style.display = "none"; 
  $("#submit").click(function() {
    var sub_email = $("#email").val();
    var sub_password = $("#password").val();
    ref.authWithPassword({
        email    : sub_email,
        password : sub_password
    }, function(error, authData) {
        if (error) {
        console.log("Login Failed!", error);
        document.getElementById("warning").style.display = "block";
        } else {
            console.log("Authenticated successfully with payload:", authData);
            window.location.replace("dashboard.html");
        }
});

});
});