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
    ref.createUser({
        email    : sub_email,
        password : sub_password
        }, function(error, userData) {
        if (error) {
        console.log("Error creating user:", error);
        //window.alert("Error creating user");
        document.getElementById("warning").style.display = "block";
        } else {
            var usersRef = ref.child(userData.uid);
            usersRef.set({
               userInformation: {
               full_address: full_address,
               zipcode: zipcode,
               fullname: fullname,
               worker: worker,
               cleaner: cleaning,
               plumber: plumbing,
               mover: moving,
               painter: painting
               }
            });
            console.log("Successfully created user account with uid:", userData.uid);
            window.location.replace("thankyoupage.html");
        }
    
    });

});
});
