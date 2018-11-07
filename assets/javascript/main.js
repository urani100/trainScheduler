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
var nextArrival ="";
var timeAway  = 0;


// Capture Button Click
$(".submitInfo").on("click", function(event){
    // prevent default
    event.preventDefault();

    // Grab values from text boxes
    inpTrainName = $(".nameInput").val().trim();
    inpDestination =  $(".destinationInput").val().trim();
    inpFrequency = $(".frequencyInput").val().trim();
    inpFirstTrain = $(".FirstTrainInput").val().trim();

    //get time away
    timeAway = frequency()

     //calculate next arrival
     nextArrival = moment().add(timeAway, "minutes");
     nextArrival =  moment(nextArrival).format("hh:mm");


    // create object tying input to firebase objects
    var schedule ={
        trainName: inpTrainName,
        destination: inpDestination,
        frequency: inpFrequency,
        nextArrival: nextArrival,
        timeAway:timeAway
    }


    //push object to firebase
    database.ref().push(schedule);
       
    //clear input fields
    $(".nameInput").val("");
    $(".destinationInput").val("");
    $(".frequencyInput").val("");
    $(".FirstTrainInput").val("");

});

// create firebase snapshot using child_added
database.ref().on("child_added", function(snap){
    //set input values to db values ussing snap.val()
    inpTrainName = snap.val().trainName;
    inpDestination = snap.val().destination;
    inpFrequency = snap.val().frequency;
    nextArrival= snap.val().nextArrival,
    timeAway= snap.val().timeAway

    // append data to table
    var addedRow = $("<tr>").append(
       $("<td>").text(inpTrainName),
       $("<td>").text(inpDestination),
       $("<td>").text(inpFrequency),
       $("<td>").text(nextArrival),
       $("<td>").text(timeAway),
    );
    $("table").append(addedRow);
}, function(error){
    console.log("Error Thrown: ", error.code);
})

function frequency(){
    //convert inpFirstTrain  in "HH:mm"
    var convertedTime = moment(inpFirstTrain, "HH:mm");

    //calculate difference beween current time and inpFirstTrain
    var TimeDifference= moment().diff(convertedTime, 'minutes');
    
    // calculate reaminder
    var remainder = TimeDifference% inpFrequency;
   
    //calculate how far away the next train is
     return timeAway = inpFrequency-remainder;
   
}