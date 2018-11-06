// Initialize Firebase

var config = {
    apiKey: "AIzaSyBAIk3ZZC-rtF9Ad-MW3NbGPDI4GI33ojk",
    authDomain: "counter-ad7f7.firebaseapp.com",
    databaseURL: "https://counter-ad7f7.firebaseio.com",
    projectId: "counter-ad7f7",
    storageBucket: "counter-ad7f7.appspot.com",
    messagingSenderId: "422933218698"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
database= firebase.database();

// Initial Values
var trainName = " ";
var destination = " ";
var firstTrain =0;
var frequency = 0;
var nextArrival = 0;
var minutesAway = 0;

// Capture Button Click
$(".submitInfo").on("click", function(event){
    //a prevent default
    event.preventDefault();

    //b// Grabb values from text boxes
    trainName = $(".nameInput").val().trim();
    destination =  $(".destinationInput").val().trim();
    firstTrain = $(".FirstTrainInput").val().trim();
    frequency = $(".frequencyInput").val().trim();

    //c create object tying input to fire base objects
    var schedule ={
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    //d the push object to firebase

    database.ref().on("child_added", function(snap){
        var data = snap.val();
        console.log(data);
    })

    //e clear input fields
    $(".nameInput").val("");
    $(".destinationInput").val("");
    $(".FirstTrainInput").val("");
    $(".frequencyInput").val("");

})



// Firebase watcher .on funtion
// append data to table