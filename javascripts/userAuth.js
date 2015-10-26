define(["jquery", "firebase", "q"], function($, fb, Q) {

	return {

			signUp: function() {
				console.log('signUp called');

			var ref = new Firebase("https://fear-film.firebaseio.com/");

		  var newUser = {};
		 	newUser.email = $('#email').val();
		 	newUser.passW = $("#pwd").val();

		 	if(userMem.mail !== "" && userMem.passW !== ""){
				ref.createUser({
			    password: newUser.passW,
			    email: newUser.email
				}, function(error, userData) {
					if (error) {
						console.log('Error creating account:' + error);
					} else {
						console.log("You now matter in this world ", userData);
					}

				}); //end callback
			} //end if
		}, //end signup

		logIn: function() {
			var userMem = {};
			userMem.mail = $('#lEmail').val();
			userMem.passW = $("#lPassword").val();

			var ref = new Firebase("https://fear-film.firebaseio.com/");

			if(userMem.mail !== "" && userMem.passW !== ""){

				var deferred = Q.defer();


				ref.authWithPassword({
					email: userMem.mail,
					password: userMem.passW
				}, function (error, authData) {
			    if (error) {
			     //handle error
			    } else {
			     	deferred.resolve(authData.uid);
			    }
			  }); //end callback

			 return deferred.promise;
			} // end if
		}, //end logIn

		logOut: function(){

			var ref = new Firebase("https://fear-film.firebaseio.com/");
			var deferred = Q.defer();

			ref.unauth();

      return deferred.promise;
     }

	}; // end return
});//end define
