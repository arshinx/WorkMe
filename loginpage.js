$(document).ready(function(){
  var ref = new Firebase("https://workme.firebaseio.com/");

  $("#submit").click(function() {
    var sub_email = $("#email").val();
    var sub_password = $("#password").val();
    ref.authWithPassword({
        email    : sub_email,
        password : sub_password
    }, function(error, authData) {
        if (error) {
        console.log("Login Failed!", error);
        window.alert("Login Failed!")
        } else {
            console.log("Authenticated successfully with payload:", authData);
            var url = "https://workme.firebaseio.com/users/"+authData.uid+"/worker";
            var worker = new Firebase(url).once('value', function(snap){
            if(!snap.val()){
               window.location.replace("dashboard.html");
            }
            else{
               
            }
            });
         }
        });
});

});
