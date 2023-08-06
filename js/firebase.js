
const firebaseConfig = {
	apiKey: "AIzaSyCDyjePrSBEQMrEnWnHJiHc9AccTcRr5PU",
	authDomain: "gcdauthentication.firebaseapp.com",
	projectId: "gcdauthentication",
	storageBucket: "gcdauthentication.appspot.com",
	messagingSenderId: "686076361753",
	appId: "1:686076361753:web:f527041986a07bf2b2be88"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// var db = firebase.database();
const auth = firebase.auth();
const db = firebase.firestore();
