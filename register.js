$(document).ready(function(){
  var ref = new Firebase("https://workme.firebaseio.com/");
   console.log(" dsu javascript");

  $("#submit").click(function() {
    var fullname = $("#fullname").val();
    var sub_email = $("#email").val();
    var sub_password = $("#password").val();
    var street = $("#street").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var zipcode = $("#zipcode").val();
    ref.createUser({
        email    : sub_email,
        password : sub_password
        }, function(error, userData) {
        if (error) {
        console.log("Error creating user:", error);
        } else {
        console.log("Successfully created user account with uid:", userData.uid);
        }
    
    });

});
});
