// PSEUDO CODING
    // Current Time shows time for Now.
    // Click to add Button will send the input values to the Table.
    // Input values will clear, when button is clickes.
    // Use event.preventDefault() to prevent stored date on table not to disappear when refresh the page.
    // If user repeats to fill and to click the button, the train information appends.

// ---------------------------------------------------

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

    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X"); // Shows time with format of “HH:mm”, and convert the amount of time passed into seconds.
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
    // .subtract(1, "years") MEANS assuming the very first train time one year ago, so I would always get positive number when calculated.
        // Without it .subtract(1, "years"), If the first train time is in the future, the number becomes negative, so messes up the calculation.
    var tRemainder = moment().diff(moment.unix(firstTrain).subtract(1, "years"), "minutes") % frequency;
    console.log(tRemainder);

    // Calculates minutes until next train
    var tMinutes = frequency - tRemainder;

    // To calculate the arrival time, add the tMinutes to the currrent time
    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    // Creates the new row, and appends to the table
        // Creates cells with input value to form a new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(tArrival),
        $("<td>").text(tMinutes),
    );

    // Append the new row to the table
        // Instead of targetting any tag in the HTML that has the ID of "trainTable" with $("#trainTable").append(newRow); (It still works for this specific Work)
        // Using $("#trainTable > tbody").append(newRow); more specificlly targets tags that are 'tbody' and are children of a tag with the ID of "trainTable"
    $("#trainTable > tbody").append(newRow);
});