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

            if(userLibrary[key].active){

              var rating = userLibrary[key].userRating;
              var check;

              if (rating > -1) {
                check = rating;
              }
              //0 stars is essentiall "all movies"
             stars0[key] = userLibrary[key]

              switch (rating) {
                case -1:
                  unwatchedMovies[key] = userLibrary[key]
                  break;
                case check:
                  watchedMovies[key] = userLibrary[key];
                case 1:
                  stars1[key] = userLibrary[key]
                  break;
                case 2:
                  stars2[key] = userLibrary[key]
                  break;
                case 3:
                  stars3[key] = userLibrary[key]
                  break;
                case 4:
                  stars4[key] = userLibrary[key]
                  break;
                case 5:
                  stars5[key] = userLibrary[key]
                  break;
                case 6:
                  stars6[key] = userLibrary[key]
                  break;
                case 7:
                  stars7[key] = userLibrary[key]
                  break;
                case 8:
                  stars8[key] = userLibrary[key]
                  break;
                case 9:
                  stars9[key] = userLibrary[key]
                  break;
                case 10:
                  stars10[key] = userLibrary[key]
                  break;
                default:
                  //Statements executed when none of the values match the value of the expression
                  break;
              }
            }
          });

          console.log(unwatchedMovies);
          console.log(watchedMovies);

          $("#watchListTab").html(movieTemplate({Search: unwatchedMovies}));
          $("#viewedTab").html(movieTemplate({Search: watchedMovies}));
          $("#stars0").html(movieTemplate({Search: stars0}));
          $("#stars1").html(movieTemplate({Search: stars1}));
          $("#stars2").html(movieTemplate({Search: stars2}));
          $("#stars3").html(movieTemplate({Search: stars3}));
          $("#stars4").html(movieTemplate({Search: stars4}));
          $("#stars5").html(movieTemplate({Search: stars5}));
          $("#stars6").html(movieTemplate({Search: stars6}));
          $("#stars7").html(movieTemplate({Search: stars7}));
          $("#stars8").html(movieTemplate({Search: stars8}));
          $("#stars9").html(movieTemplate({Search: stars9}));
          $("#stars10").html(movieTemplate({Search: stars10}));


          $('div.userRating').each(function(){
              var thisMovieRating = $(this).attr('rating');
              var thisMovieID = $(this).attr('imdbID');

              if (thisMovieRating == -2) {
                $(this).html('<button class="addFilm" omdbid="'+thisMovieID+'">Add Film</button>');
              } else if (thisMovieRating == -1) {
                $(this).append(templates.stars);
                stars.loadRating(thisMovieID, thisMovieRating);
              } else {
                $(this).html(templates.stars);
                stars.loadRating(thisMovieID, thisMovieRating);
              }

            });//end each

     	}); //end firebase snapshot
		} // end populateTabs

  }; //end Return
});//end Define