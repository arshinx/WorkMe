$(document).ready(function(){
  var ref = new Firebase("https://workme.firebaseio.com/");

  $("#submit").click(function() {
    var fullname = $("#fullname").val();
    var sub_email = $("#email").val();
    var sub_password = $("#password").val();
    var street = $("#street").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var zipcode = $("#zipcode").val();
    var worker = document.getElementById("worker").checked;
    var comma = ", ";
    var full_address = street+comma+city+comma+state;
    ref.createUser({
        email    : sub_email,
        password : sub_password
        }, function(error, userData) {
        if (error) {
        console.log("Error creating user:", error);
        window.alert("Error creating user");
        } else {
            var usersRef = ref.child(userData.uid);
            usersRef.set({
               userInformation: {
               full_address: full_address,
               zipcode: zipcode,
               fullname: fullname,
               worker: worker
               }
            });
            console.log("Successfully created user account with uid:", userData.uid);
            window.location.replace("thankyoupage.html");
        }
    
    });

});
});
