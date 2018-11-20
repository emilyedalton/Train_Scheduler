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
//train time converted to unix
var firsttrainConverted = "";

var currentTime = "";




//reset function clears out the input fields after user submits
function reset() {
    train = $("#trainName-input").val(" ");
    destination = $("#destination-input").val(" ");
    firstTrain = $("#firstTrain-input").val(" ");
    frequency = $("#frequency-input").val(" ");
}
// Capture Button Click
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Stores user's info on train intput into the database
    train = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    frequency = $("#frequency-input").val().trim();
    currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));



    // Code for the push
    dataRef.ref().push({
        train: train,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain

    });
    reset();

});
dataRef.ref().on("child_added", function (childSnapshot) {
    // Making new variables for values pulled from DB. Trying out "let".Log everything that's coming out of snapshot
    let dbTrain = childSnapshot.val().train;
    let dbDestination = childSnapshot.val().destination;
    let dbFrequency = childSnapshot.val().frequency;
    let dbfirsttrain = childSnapshot.val().firstTrain;
    console.log("This is the name of the first train" + " " + childSnapshot.val().train);
    console.log("This is where the train is going" + " " + childSnapshot.val().destination);
    console.log("this is how often the train runs" + " " + childSnapshot.val().frequency);
    console.log("this is the time the first train leaves" + " " + childSnapshot.val().firstTrain);


    //difference between now and the time the first train leaves
    console.log("CONVERTED" + " " + firsttrainConverted);
    let diffTime = moment().diff(moment.unix(dbfirsttrain), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    console.log("THIS IS THE FREQUENCY" + " " + frequency);

    let timeRemainder = diffTime % dbFrequency;
    console.log("this is the remainder" + " " + timeRemainder);
    let tMinutesTillTrain = dbFrequency - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    let nextArrival = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm A"));





    $("tbody").append(`<tr><td>${dbTrain}<td>
    ${dbDestination}</td><td>
    ${dbFrequency}</td><td>
    ${nextArrival}</td><td>
    ${tMinutesTillTrain}</td>`)

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);


});
