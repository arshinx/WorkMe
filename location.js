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
   var coordinate_lat;
   var coordinate_lng;
   /*var url_lat = "https://workme.firebaseio.com/users/"+authData.uid+"/coordinate_lat";
   new Firebase(url_lat).once('value', function(snap){
      coordinate_lat=snap.val();
      //console.log(coordinate_lat);
   });
   var url_lng = "https://workme.firebaseio.com/users/"+authData.uid+"/coordinate_lng";
   new Firebase(url_lng).once('value', function(snap){
      coordinate_lng=snap.val();
      console.log(coordinate_lng);
      console.log(coordinate_lat)
   });
   console.log(coordinate_lat);
   console.log(coordinate_lng);*/
   var stored_coordinates=JSON.parse(localStorage["storedcoordinates"]);
      console.log(stored_coordinates);
      var map;
      function initialize() {
         coordinate_lat=parseFloat(localStorage.getItem("lat"));
         coordinate_lng=parseFloat(localStorage.getItem("lng"));
         console.log(coordinate_lat);
         console.log(coordinate_lng);
        var mapOptions = {
          zoom: 13,
          center: {lat: coordinate_lat, lng: coordinate_lng},
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map'),
              mapOptions);
       
        // Create a <script> tag and set the USGS URL as the source.
        //var script = document.createElement('script');
        // (In this example we use a locally stored copy instead.)
        // script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
        //script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
        //document.getElementsByTagName('head')[0].appendChild(script);
      }
      var marker;
      for(var n=0; n<stored_coordinates.length/2;n++){
            console.log(n)
            console.log(stored_coordinates[2*n]);
            console.log(stored_coordinates[2*n+1]);
            console.log("something");
         var latLng =   {lat: stored_coordinates[2*n], lng: stored_coordinates[2*n+1]};
         console.log(latLng);
         marker=new google.maps.Marker({
            position: latLng,
            map: map
         });
      }
      //function eqfeed_callback(results) {
        //map.data.addGeoJson(results);
      //}
      // Call the initialize function after the page has finished loading
      google.maps.event.addDomListener(window, 'load', initialize);

});