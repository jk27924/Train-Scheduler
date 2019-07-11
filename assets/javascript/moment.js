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

// PSEUDO CODING
    // Current Time shows time for Now.
    // Click to add Button will send the input values to the Table.
    // Input values will clear, when button is clickes.
    // Use event.preventDefault() to prevent stored date on table not to disappear when refresh the page.
    // If user repeats to fill and to click the button, the train information appends.