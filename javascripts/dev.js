define(["jquery", "firebase", "q"], function($, fb, Q) {

	return {

		logIn: function(x, y) {

			var userMem = {};
			userMem.mail = "allen@test.com";
			userMem.passW = "allen";

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
		} //end logIn

	};// end return
});//end define
