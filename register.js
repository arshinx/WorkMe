$(document).ready(function(){
  var ref = new Firebase("https://workme.firebaseio.com/");
  document.getElementById("warning").style.display = "none";
  document.getElementById("worker_type").style.display = "none";
  document.getElementById("worker").onclick = function(){
     toggleShow(this, "worker_type");
   };
   function toggleShow(box, id) {
    // get reference to related content to display/hide
    var el = document.getElementById(id);
    
    if ( box.checked ) {
        el.style.display = 'block';
    } else {
        el.style.display = 'none';
    }
   }

  $("#submit").click(function() {
    var fullname = $("#fullname").val();
    var sub_email = $("#email").val();
    var sub_password = $("#password").val();
    var street = $("#street").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var zipcode = $("#zipcode").val();
    var worker = document.getElementById("worker").checked;
    var cleaning = document.getElementById("cleaning").checked;
    var plumbing = document.getElementById("plumbing").checked;
    var moving = document.getElementById("moving").checked;
    var painting = document.getElementById("painting").checked;
    var comma = ", ";
    var full_address = street+comma+city+comma+state;
    var object_coordinate;
    var coordinate
    var address;
    //var address_funct = new Firebase(url).once('value', function(snap){
      //address_full=snap.val();
    var temp=full_address.split(" ");
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
    
    
    ref.createUser({
        email    : sub_email,
        password : sub_password
        }, function(error, userData) {
        if (error) {
        console.log("Error creating user:", error);
        //window.alert("Error creating user");
        document.getElementById("warning").style.display = "block";
        } else {
            var usersRef = ref.child("users").child(userData.uid);
            usersRef.set({
               full_address: full_address,
               coordinate_lat: object_coordinate.lat,
               coordinate_lng: object_coordinate.lng,
               zipcode: zipcode,
               fullname: fullname,
               worker: worker,
               workertype:{
                  cleaner: cleaning,
                  plumber: plumbing,
                  mover: moving,
                  painter: painting
               }
            });
            if(worker){
               var uid = userData.uid
               if(localStorage.getItem("worker_ids") === null){
                  localStorage.setItem("worker_ids", uid);
                  console.log(uid);
               }
               else{
                  var workerids=localStorage.getItem("worker_ids");
                  workerids+=" ";
                  workerids+=uid;
                  localStorage.setItem("worker_ids", workerids);
                  console.log(workerids);
                  }
            }
            console.log("Successfully created user account with uid:", userData.uid);
            //window.location.replace("thankyoupage.html");
        }
    
    });

});
});
