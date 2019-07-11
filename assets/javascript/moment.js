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



});


// PSEUDO CODING
    // Current Time shows time for Now.
    // Click to add Button will send the input values to the Table.
    // Input values will clear, when button is clickes.
    // Use event.preventDefault() to prevent stored date on table not to disappear when refresh the page.
    // If user repeats to fill and to click the button, the train information appends.