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


// capture submit information
$(".submitInfo").on("click", function(event){
    // prevent default
    event.preventDefault();
    // Grab values from text boxes
    inpTrainName = $(".nameInput").val().trim();
    inpDestination =  $(".destinationInput").val().trim();
    inpFrequency = $(".frequencyInput").val().trim();
    inpFirstTrain = $(".FirstTrainInput").val().trim();

    //call frequency to get time away 
    timeAway = frequency();

    //calculate next arrival
   var nextArrival = moment().add(timeAway, "minutes");

   //format next arrival
    nextArrival =  moment(nextArrival).format("hh:mm");

    // create object tying input to firebase objects
    var schedule ={
        trainName: inpTrainName,
        destination: inpDestination,
        frequency: inpFrequency,
        firstTrain:inpFirstTrain,
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
});//end of submit

// TO DO: order by minutes away


// create firebase snapshot using child_added
database.ref().on("child_added", function(snap){
    //set input values to db values ussing snap.val()
    inpTrainName = snap.val().trainName;
    inpDestination = snap.val().destination;
    inpFrequency = snap.val().frequency;
    nextArrival= snap.val().nextArrival,
    timeAway = snap.val().timeAway,
    inpFirstTrain = snap.val().firstTrain
    var key = snap.key;
    var keyAvl = snap.key+ "Avl";
    var keyAwy = snap.key+ "Awy";

    // append data to table
    var addedRow = $("<tr>").append(
       $("<td>").text(inpTrainName),
       $("<td>").text(inpDestination),
       $("<td>").text(inpFrequency),
       $("<td>").addClass(keyAvl).text(nextArrival),
       $("<td>").addClass(keyAwy).text(timeAway),
    );
    $("table").append(addedRow);



    // function leverages snapshot to update arrival and time away
    function updates(){
        // debugger;
        var convertedTimeUp = moment(snap.val().firstTrain, "HH:mm");
        var TimeDifferenceUp = moment().diff(convertedTimeUp, 'minutes');
        var remainderUp = TimeDifferenceUp % snap.val().frequency;
        var timeAwayUp = snap.val().frequency - remainderUp;
        var nextArrivalUp = moment().add(timeAwayUp , "minutes");
        nextArrivalUp =  moment(nextArrivalUp).format("hh:mm");

        //update fields in DOM
        $("." + keyAvl).html(nextArrivalUp);
        $("." + keyAwy).html(timeAwayUp);

        //update database
        database.ref("/" + key).update({ nextArrival: nextArrivalUp });
        database.ref("/" + key).update({ timeAway: timeAwayUp });
    }// end of updates
    
    // udates arrival time away every two minutes.
    setInterval(updates, 20000);

}, function(error){
    console.log("Error Thrown: ", error.code);
})//end of on



function frequency(){
    //convert inpFirstTrain  in "HH:mm"
    var convertedTime = moment(inpFirstTrain, "HH:mm");
    //calculate difference beween current time and inpFirstTrain
    var TimeDifference= moment().diff(convertedTime, 'minutes');
    // calculate remainder
    var remainder = TimeDifference% inpFrequency;
    //calculate how far away the next train is
     return timeAway = inpFrequency-remainder;
}//end of frequency

 
 
