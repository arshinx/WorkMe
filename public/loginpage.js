$(document).ready(function){
  var ref = new Firebase("https://workme.firebaseio.com/");
  ref.authWithPassword({
    email    : "bobtony@firebase.com",
    password : "correcthorsebatterystaple"
   }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        }else {
          console.log("Authenticated successfully with payload:", authData);
        }
});


}