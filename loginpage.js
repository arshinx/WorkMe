$(document).ready(function(){
  var ref = new Firebase("https://workme.firebaseio.com/");
  
  document.getElementById("warning").style.display = "none"; 
  $("#submit").click(function() {
    var sub_email = $("#email").val();
    var sub_password = $("#password").val();
    var uid
    ref.authWithPassword({
        email    : sub_email,
        password : sub_password
    }, function(error, authData) {
        if (error) {
        console.log("Login Failed!", error);
        document.getElementById("warning").style.display = "block";
        } else {
            console.log("Authenticated successfully with payload:", authData);
            uid=authData.uid;
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
                  console.log(coordinate_lat);
                  localStorage.setItem("lat", coordinate_lat);
                  localStorage.setItem("lng", coordinate_lng);
               });
               var workerids=localStorage.getItem("worker_ids");
               var workerarray=workerids.split(" ");
               var i;
               var worker_coordinates= new Array(2*workerarray.length);
               for (i=0; i<workerarray.length-; i++){
                  url_lat = "https://workme.firebaseio.com/users/"+workerarray[i]+"/coordinate_lat";
                  new Firebase(url_lat).once('value', function(snap){
                  worker_coordinates[2*i]=snap.val();
                  console.log(i);
                  console.log(coordinate_lat);
               });
                  url_lng = "https://workme.firebaseio.com/users/"+workerarray[i]+"/coordinate_lng";
                  new Firebase(url_lng).once('value', function(snap){
                  worker_coordinates[2*i+1]=snap.val();
                  console.log(coordinate_lng);
                  console.log(i);
                  //worker_coordinates[i]=coordinate_lat;
                  console.log(worker_coordinates);
                  //worker_coordinates[i+1]=coordinate_lng;
                  //console.log(worker_coordinates);
                  localStorage["worker_coordinates"]=JSON.stringify(worker_coordinates);
               });

               }
               //window.location.replace("dashboard.html");
            }
            else{
               /*ref.orderByChild("worker").on("child_added", function(snapshot) {
               console.log("works");
               console.log(snapshot.val());
               console.log(snapshot.val().authData.uid);
            }); */
            /*if(localStorage.getItem("worker-ids") === null){
               localStorage.setItem("worker-ids", uid);
               console.log(uid);
            }
            else{
               var workerid=localStorage.getItem("worker-ids");
               workerids+=" ";
               workerids+=uid;
               console.log(workerids);
               }*/
             window.location.replace("dashboard-worker.html");
            }
            });
         }
        });
});

});
