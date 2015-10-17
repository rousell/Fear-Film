define(["jquery", "firebase"], function($, Firebase) {
	$(document).click("#signUp", function)
		var ref = new Firebase("https://fear-film.firebaseio.com/");
	  var newUser ={
	  	email: $('#email').val()
	  	passW: $("#pwd").val()	  	
	  }
		ref.createUser({
	    email: newUser.email,
	    password: newUser.passW
		}, function(error, userData) {
			if (error) {
				console.log("User not nonexistant ", error)
			} else {
				console.log("You now matter in this world ", userData)
			}
		}	
});
// login User
$(document).click("#login", function()) {
	var userMem ={
		mail: $('#email').val()
	  passW: $("#pwd").val()	
	}
	var ref =new Firebase("https://fear-film.firebaseio.com/")
	ref.authWithPassword({
		email: userMem.mail,
		password: userMem.passW
	}, function (error, authData) {
     if (error) {
     	console.log("Wrong ", error)
     }, else {
     	console.log("login successful", authData)
     }
	} 
}