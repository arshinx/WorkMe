$(document).ready(function(){
  function initMap() {
    var markersArray = [];
    var userlat = parseFloat(localStorage.getItem("lat"));
    var userlng = parseFloat(localStorage.getItem("lng"));
    console.log(userlat);
    console.log(userlng);
    var workerlocation = JSON.parse(localStorage["storedcoordinates"]);
    var origin = {lat: workerlocation[0], lng: workerlocation[1]};
    var destination = {lat: userlat, lng: userlng};
    console.log(origin);
    console.log(destination);
    
    var destinationIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=D|FF0000|000000';
    var originIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=O|FFFF00|000000';
   /*var centerlat = (userlat+workerlocation[0])/2;
   var centerlng = (userlat+workerlocation[1])/2;
      console.log(centerlat);
      console.log(centerlng); */
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: workerlocation[0], lng: workerlocation[1]},
    zoom: 13
  });
  var marker;
  var userLatLng = {lat: userlat, lng: userlng};
   console.log(origin);
         marker=new google.maps.Marker({
            position: origin,
            map: map
         });
  console.log(destination);
         marker=new google.maps.Marker({
            position: destination,
            map: map
         });
  var geocoder = new google.maps.Geocoder;

  var service = new google.maps.DistanceMatrixService;
  service.getDistanceMatrix({
    origins: [origin],
    destinations: [destination],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      var originList = response.originAddresses;
      var destinationList = response.destinationAddresses;
      var outputDiv = document.getElementById('output');
      outputDiv.innerHTML = '';
      deleteMarkers(markersArray);

      var showGeocodedAddressOnMap = function(asDestination) {
        var icon = asDestination ? destinationIcon : originIcon;
        return function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            map.fitBounds(bounds.extend(results[0].geometry.location));
            markersArray.push(new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              icon: icon
            }));
          } else {
            alert('Geocode was not successful due to: ' + status);
          }
        };
      };

      for (var i = 0; i < originList.length; i++) {
        var results = response.rows[i].elements;
        geocoder.geocode({'address': originList[i]},
            showGeocodedAddressOnMap(false));
        for (var j = 0; j < results.length; j++) {
          geocoder.geocode({'address': destinationList[j]},
              showGeocodedAddressOnMap(true));
          outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
              ': ' + results[j].distance.text + ' in ' +
              results[j].duration.text + '<br>';
        }
      }
    }
  });
}

function deleteMarkers(markersArray) {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}
      google.maps.event.addDomListener(window, 'load', initMap);

});