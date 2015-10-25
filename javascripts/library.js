define(["jquery", "firebase", "q", "lodash", "search", "templates", "stars"], function($, fb, Q, _, search, templates, stars) {

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

  		ref.child(userUID+'/library/').once("value", function(snapshot){

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

			var authData = ref.getAuth();
      var userUID = authData.uid;

      var alphabetizeByTitle = function(listOfMovies){

        var alphabetizedData = _.values(listOfMovies).sort(function(a, b) {
          if (a.Title[0] < b.Title[0]) {
            return -1;
          }
          if (a.Title[0] > b.Title[0]) {
            return 1;
          }
          return 0;
          });

        return alphabetizedData
      }

      ref.child(userUID +'/library/').on("value", function(snapshot){

      	var userLibrary = snapshot.val();
      	var userLibraryKeys = _.keys(userLibrary);

      		//templates
      		var  movieTemplate = templates.basedFilms;

      		//filter for unwatched movies
      		var unwatchedMovies = {},
              watchedMovies = {},
              stars0 = {},
              stars1 = {},
              stars2 = {},
              stars3 = {},
              stars4 = {},
              stars5 = {},
              stars6 = {},
              stars7 = {},
              stars8 = {},
              stars9 = {},
              stars10 = {};



      	  userLibraryKeys.forEach(function(key){
            console.log(userLibraryKeys);

            if(userLibrary[key].active){

              var rating = userLibrary[key].userRating;
              stars0[key] = userLibrary[key];      //0 stars is essentiall "all movies"

                if (rating == -1) {
                unwatchedMovies[key] = userLibrary[key];
              } else if (rating == 1)  {
                stars1[key] = userLibrary[key];
                 watchedMovies[key] = userLibrary[key];
              } else if (rating == 2)  {
                stars2[key] = userLibrary[key];
                 watchedMovies[key] = userLibrary[key];
              } else if (rating == 3)  {
                stars3[key] = userLibrary[key];
                 watchedMovies[key] = userLibrary[key];
              } else if (rating == 4)  {
                stars4[key] = userLibrary[key];
                 watchedMovies[key] = userLibrary[key];
              } else if (rating == 5)  {
                stars5[key] = userLibrary[key];
                 watchedMovies[key] = userLibrary[key];
              } else if (rating == 6)  {
                stars6[key] = userLibrary[key];
                 watchedMovies[key] = userLibrary[key];
              } else if (rating == 7)  {
                stars7[key] = userLibrary[key];
                 watchedMovies[key] = userLibrary[key];
              } else if (rating == 8)  {
                stars8[key] = userLibrary[key];
                 watchedMovies[key] = userLibrary[key];
              } else if (rating == 9)  {
                stars9[key] = userLibrary[key];
                 watchedMovies[key] = userLibrary[key];
              } else if (rating == 10)  {
                stars10[key] = userLibrary[key];
                watchedMovies[key] = userLibrary[key];
              }

            } //end if
          }); //end for Each

          console.log(unwatchedMovies);
          console.log(watchedMovies);
          console.log('stars 0', stars0);
          console.log('stars1', stars1);

          $("#watchListTab").html(movieTemplate({Search: alphabetizeByTitle(unwatchedMovies)}));
          $("#viewedTab").html(movieTemplate({Search: alphabetizeByTitle(watchedMovies)}));
          $("#stars0").html(movieTemplate({Search: alphabetizeByTitle(stars0)}));
          $("#stars1").html(movieTemplate({Search: alphabetizeByTitle(stars1)}));
          $("#stars2").html(movieTemplate({Search: alphabetizeByTitle(stars2)}));
          $("#stars3").html(movieTemplate({Search: alphabetizeByTitle(stars3)}));
          $("#stars4").html(movieTemplate({Search: alphabetizeByTitle(stars4)}));
          $("#stars5").html(movieTemplate({Search: alphabetizeByTitle(stars5)}));
          $("#stars6").html(movieTemplate({Search: alphabetizeByTitle(stars6)}));
          $("#stars7").html(movieTemplate({Search: alphabetizeByTitle(stars7)}));
          $("#stars8").html(movieTemplate({Search: alphabetizeByTitle(stars8)}));
          $("#stars9").html(movieTemplate({Search: alphabetizeByTitle(stars9)}));
          $("#stars10").html(movieTemplate({Search: alphabetizeByTitle(stars10)}));


          $('div.userRating').each(function(){
              var thisMovieRating = $(this).attr('rating');
              var thisMovieID = $(this).attr('imdbID');

              if (thisMovieRating == -2) {
                $(this).html('<button class="addFilm" omdbid="'+thisMovieID+'">Add Film</button>');
              } else {
                $(this).html(templates.stars);
                stars.loadRating(thisMovieID, thisMovieRating);
              }

            });//end each

     	}); //end firebase snapshot
		} // end populateTabs

  }; //end Return
});//end Define