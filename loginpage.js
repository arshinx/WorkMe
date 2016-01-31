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
            var url = "https://workme.firebaseio.com/users/"+authData.uid+"/worker";
            var worker = new Firebase(url).once('value', function(snap){
            if(!snap.val()){
                  var url_lat = "https://workme.firebaseio.com/users/"+authData.uid+"/coordinate_lat";
                  new Firebase(url_lat).once('value', function(snap){
                  coordinate_lat=snap.val();
                  //console.log(coordinate_lat);
               });
                  var url_lng = "https://workme.firebaseio.com/users/"+authData.uid+"/coordinate_lng";
                  new Firebase(url_lng).once('value', function(snap){
                  coordinate_lng=snap.val();
                  console.log(coordinate_lng);
                  console.log(coordinate_lat)
                  localStorage.setItem("lat", coordinate_lat);
                  localStorage.setItem("lng", coordinate_lng);
               });
               window.location.replace("dashboard.html");
            }
            else{
               
            }
            });
         }
        });
});

});
