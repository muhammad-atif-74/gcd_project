let passwordField = document.getElementById("password");
let show = document.getElementById("show");

show.addEventListener("click", () => {
	const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
	passwordField.setAttribute("type", type);
})

// document.querySelector("#register").addEventListener("click", register(e))

function register(event) {
	document.querySelector('#waitLoader').classList.remove('d-none')

	event.preventDefault()
	let email = document.querySelector(".email").value
	let username = document.querySelector(".username").value
	let password = document.querySelector(".password").value

	if (password < 6) {
		showAlert('Password should be minimum 6 character');
		return;
	}
	else {
		auth.createUserWithEmailAndPassword(email, password)
			.then(userCredential => {
				const user = userCredential.user;
				const uid = user.uid;
				console.log(user);

				// Add the user to Firestore with the same UID
				db.collection("users").doc(uid).set({
					username: username,
					email: email,
					last_login: Date.now()
				})
					.then(() => {
						document.querySelector('#waitLoader').classList.add('d-none')
						// console.log("User added to Firestore");
						showAlert('User registered successfully')
						setTimeout(() => {
							window.location.href = 'login.html'
						}, 700);
					})
					.catch((error) => {
						document.querySelector('#waitLoader').classList.add('d-none')
						console.log("Error adding user to Firestore: ", error);
					});

			})
			.catch(e => {
				document.querySelector('#waitLoader').classList.add('d-none')
				let errorcode = e.code;
				let errormessage = e.message;
				console.log(errormessage)
				// alert(errormessage)
				showAlert(errormessage)
			})
	}
}
function login(event) {
	document.querySelector('#waitLoader').classList.remove('d-none')
	event.preventDefault()
	let email = document.querySelector(".email").value
	let password = document.querySelector(".password").value

	if (password < 6) {
		showAlert('Password should be minimum 6 character');
		return;
	}
	else {
		auth.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				document.querySelector('#waitLoader').classList.add('d-none')
				const user = userCredential.user;
				let uid = user.uid;
				sessionStorage.setItem('userid', uid)
				window.location.href = 'index.html';
			})
			.catch((error) => {
				document.querySelector('#waitLoader').classList.add('d-none')
				const errorCode = error.code;
				const errormessage = error.message;
				// alert(errorMessage);
				showAlert(errormessage)
				// console.log(errormessage)
			});
	}
}

function logout(event) {
	auth.signOut()
		.then(() => {
			// User signed out
			console.log("User signed out");
			// You can redirect to the login page or perform additional actions after successful logout.
		})
		.catch((error) => {
			// Handle error
			console.log(error);
			// Display appropriate error message to the user.
		});
}


function showAlert(msg) {
	document.querySelector("#alert").innerHTML = msg;
	document.querySelector("#alert").classList.replace('invisible', 'visible')
	setTimeout(() => {
		document.querySelector("#alert").classList.replace('visible', 'invisible')
	}, 10000);
}