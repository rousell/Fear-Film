define(["jquery", "firebase", "q", "lodash", "search"], function($, fb, Q, _, search) {

	var ref = new Firebase("https://fear-film.firebaseio.com/");

	return {

		addMovie: function(movieID) {

      var authData = ref.getAuth();
      var userUID = authData.uid;

      search.getMovieData(movieID)
      	.then(function(myFilm){
      		myFilm.active = true;
	       	myFilm.userRating = -1;
          ref.child(userUID + "/library/" + movieID).set(myFilm);
	      });

      }, //end add Movie

    check: function(searchData){

    	var deferred = Q.defer();
      var authData = ref.getAuth();
      var userUID = authData.uid;
      console.log('userUID', userUID);

  		ref.child(userUID+'/library/').on("value", function(snapshot){

    	  var userMovies = snapshot.val();
    	  var allUserMovies = _.keys(userMovies);
    	  searchData.Search.forEach(function(movie){
	        movie.userRating = -2;

  	      if (allUserMovies.indexOf(movie.imdbID) !== -1) {
    	      movie.userRating = userMovies[movie.imdbID].userRating;
      	  }

     		}); //end forEach

      	deferred.resolve(searchData);


    	});// end  firebase snapshot

  		return deferred.promise;
		}, //end check

		populateTabs: function(){
			console.log('populate tabs');
		}

  }; //end Return
});//end Define