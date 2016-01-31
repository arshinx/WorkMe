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
   var coordinate;
   var address_full;
   var address;
   var authData = ref.getAuth();
   var url = "https://workme.firebaseio.com/users/"+authData.uid+"/full_address";
   var address_funct = new Firebase(url).once('value', function(snap){
      address_full=snap.val();
      var temp=address_full.split(" ");
      address = temp[0];
      var i;
      for (i=1; i<temp.length-1; i++){
         address+= "+";
         address += temp[i];
      }
      address += temp[temp.length-1];
      console.log(address);
      $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + address, function(data, textStatus){
         coordinate = data.results[0].geometry.location;
         console.log(coordinate);
      });
});
});