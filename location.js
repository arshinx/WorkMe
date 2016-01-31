$(document).ready(function(){
   // Create a callback which logs the current auth state
   function authDataCallback(authData) {
      if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } else {
      //console.log("User is logged out");
      window.location.replace("index.html");
      }
    }

   // Register the callback to be fired every time auth state changes
   var ref = new Firebase("https://workme.firebaseio.com");
   ref.onAuth(authDataCallback);
   var authData = ref.getAuth();
   var url = "https://workme.firebaseio.com/users/"+authData.uid+"/full_address";
   var  = new Firebase(url).once('value', function(snap){
   console.log(url);
});