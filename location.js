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
   var object_coordinate;
   var coordinate
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
         object_coordinate = data.results[0].geometry.location;
         console.log(object_coordinate);
         //console.log(coordinate[0]);
      });
      
});
      var map;
      function initialize() {
        var mapOptions = {
          zoom: 2,
          center: {lat: -33.865427, lng: 151.196123},
          mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        map = new google.maps.Map(document.getElementById('map'),
              mapOptions);
        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');
        // (In this example we use a locally stored copy instead.)
        // script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
        //script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
        document.getElementsByTagName('head')[0].appendChild(script);
      }
      function eqfeed_callback(results) {
        map.data.addGeoJson(results);
      }
      // Call the initialize function after the page has finished loading
      google.maps.event.addDomListener(window, 'load', initialize);

});