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
var inpTrainName = "";
var inpDestination = "";
var inpFirstTrain = 0;
var inpFrequency = 0;

// Capture Button Click
$(".submitInfo").on("click", function(event){
    // prevent default
    event.preventDefault();

    // Grab values from text boxes
    inpTrainName = $(".nameInput").val().trim();
    inpDestination =  $(".destinationInput").val().trim();
    inpFirstTrain = $(".FirstTrainInput").val().trim();
    inpFrequency = $(".frequencyInput").val().trim();


    // create object tying input to firebase objects
    var schedule ={
        trainName: inpTrainName,
        destination: inpDestination,
        firstTrain: inpFirstTrain ,
        frequency: inpFrequency
    }

    //push object to firebase
    database.ref().push(schedule);
       
    //clear input fields
    $(".nameInput").val("");
    $(".destinationInput").val("");
    $(".FirstTrainInput").val("");
    $(".frequencyInput").val("");

});


// create firebase snapshot using child_added

database.ref().on("child_added", function(snap){
    //set input values to db values ussing snap.val()
    inpTrainName = snap.val().trainName;
    inpDestination = snap.val().destination
    inpFirstTrain = snap.val().firstTrain
    inpFrequency = snap.val().frequency

    // append data to table
    var addedRow = $("<tr>").append(
       $("<td>").text(inpTrainName),
       $("<td>").text(inpDestination),
       $("<td>").text(inpFirstTrain),
       $("<td>").text(inpFrequency)
    );
    $("table").append(addedRow);

})