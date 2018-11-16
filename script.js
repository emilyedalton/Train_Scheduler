// Initialize Firebase
var config = {
    apiKey: "AIzaSyA1HucabAD13ocHDp6VV8Shj-AS05J19No",
    authDomain: "train-scheduler-9ae3c.firebaseapp.com",
    databaseURL: "https://train-scheduler-9ae3c.firebaseio.com",
    projectId: "train-scheduler-9ae3c",
    storageBucket: "train-scheduler-9ae3c.appspot.com",
    messagingSenderId: "52421215999"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial variables
//this is the train name
var train = "";
//this is where the train is going 
var destination = "";
// this is how often the train runs
var frequency = 0;
//this is when the train arrives
var arrival = "";
//this is the time the first train leaves
var firstTrain = "";
// this is how many minutes away the train is
var minutesAway = 0;
// the time the next train arrives
var nextArrival = 0;
var firsttrainConverted = "";
// var dateAdded = "";
// var minutesAway = "";
// var currentTime= "";
function reset (){
    train = $("#trainName-input").val (" ");
    destination = $("#destination-input").val (" ");
    firstTrain = $("#firstTrain-input").val (" ");
    frequency = $("#frequency-input").val (" ");

}
// Capture Button Click
$("#submit").on("click", function (event) {
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    train = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));



    // Code for the push
    dataRef.ref().push({
        train: train,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,
        arrival: arrival
        //dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
    reset();

});
dataRef.ref().on("child_added", function (childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log("This is the name of the first train" + " " + childSnapshot.val().train);
    console.log("This is where the train is going" + " " + childSnapshot.val().destination);
    console.log("this is how often the train runs" + " " + childSnapshot.val().frequency);
    console.log(childSnapshot.val().arrival);
    console.log("this is the time the first train leaves" + " " + childSnapshot.val().firstTrain);
    
    var firsttrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

    // var diffTime = 0;
    var timeRemainder = 0;
    var nextArrival = 0;
    //difference between now and the time the first train leaves
    console.log("CONVERTED" + " " + firsttrainConverted);
   var diffTime = moment().diff(moment(firsttrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

console.log("THIS IS THE FREQUENCY" + " " + frequency);

    timeRemainder = diffTime % frequency;
  console.log ("this is the remainder" + " " + timeRemainder);
var tMinutesTillTrain = frequency - timeRemainder;
   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  nextArrival = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm A"));



    
    // // Test for correct times and info
    // console.log(moment().format("X"));


    $("tbody").append(`<tr><td>${childSnapshot.val().train}<td>
     ${childSnapshot.val().destination}</td><td>
    ${childSnapshot.val().frequency}</td><td>
    ${nextArrival}</td><td>
    ${tMinutesTillTrain}</td>`)

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

    
});
