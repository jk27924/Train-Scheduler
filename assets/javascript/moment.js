// Web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDNWsKJBKuMPXEP_J2KX_6C65jEAGmnyCI",
    authDomain: "my-awsome-project-ccfcf.firebaseapp.com",
    databaseURL: "https://my-awsome-project-ccfcf.firebaseio.com",
    projectId: "my-awsome-project-ccfcf",
    storageBucket: "",
    messagingSenderId: "803700745900",
    appId: "1:803700745900:web:becdf39b2554f746"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// ---------------------------------------------------

// Get a reference to the database
var database = firebase.database();

//Current time
$("#currentTime").append(moment().format("hh:mm A"));

// Button for adding trains
$("#addTrainBtn").on("click", function (event) {

    // Prevents default action to occur, when addTrainBtn is clicked
    event.preventDefault();

    // Grabs user input
    var trainName = $("#trainNameInput").val().trim();
    console.log(trainName);

    var destination = $("#destinationInput").val().trim();
    console.log(destination);

    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X");
    console.log(firstTrain);

    var frequency = $("#frequencyInput").val().trim();
    console.log(frequency);

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };
    console.log(newTrain);

    // Uploads the new train data to the database
    database.ref().push(newTrain);

    // Alert
    alert(newTrain.name + " has been successfully added");

    // Clears all of the input values in text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
});


// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    // Calculates the Difference between Now and the First Train time in Seconds (by unix), and convert the Seconds into Minutes / Frequency
    var tRemainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    console.log(tRemainder);

    // Calculates minutes until next train
    var tMinutes = frequency - tRemainder;

    // To calculate the arrival time, add the tMinutes to the currrent time
    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    // Creates the new row, and appends to the table
        // Creates a cell with input value,
        // and appends as newly created Row.
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(tArrival),
        $("<td>").text(tMinutes),
    );
});

// PSEUDO CODING
    // Current Time shows time for Now.
    // Click to add Button will send the input values to the Table.
    // Input values will clear, when button is clickes.
    // Use event.preventDefault() to prevent stored date on table not to disappear when refresh the page.
    // If user repeats to fill and to click the button, the train information appends.