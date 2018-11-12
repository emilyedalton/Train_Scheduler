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
    var train = "";
    var destination = "";
    var frequency =  0;
    var arrival = "";
    var firstTrain ="";
    var table = "<tr><td id ='trainName' </td></tr> <td> <input type ='text' name ='lastname'> </td><td><input type ='text' name ='hours'></tr></td>"
    var dateAdded = "";
    // Capture Button Click
    $("#submit").on("click", function(event) {
      event.preventDefault();

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      train = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
       firstTrain= $("#firstTrain-input").val().trim();
       frequency = $("#frequency-input").val().trim();
      console.log("this is the train "+train);


      // Code for the push
      dataRef.ref().push({
        train: train,
        destination: destination,
        frequency: frequency,
        arrival: arrival,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

      });
    });
    dataRef.ref().on("child_added", function(childSnapshot) {
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().train);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().frequency);
        console.log(childSnapshot.val().arrival);
        console.log(dateAdded);
        
    
    $("tbody").append("<tr><td>" +
    childSnapshot.val().train + "<td>" +
    childSnapshot.val().destination + "</td>"+"<td>" +
    childSnapshot.val().frequency + "</td>")

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });