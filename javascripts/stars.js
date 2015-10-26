define(["jquery", "hbs", "bootstrap", "search", "q", "templates", "bootstrap-star-rating"],
    function($, Handlebars, bootstrap, search, Q, templates, stars) {

  var ref = new Firebase("https://fear-film.firebaseio.com/");

  return {

  	loadRating: function(movieID, movieRating) {

      var authData = ref.getAuth();
      var userUID = authData.uid;

  		$(".starRating").rating({
        min: 0,
        max: 10,
        step: 1,
        showClear: true,
        size: "xs",
      });

      if (movieRating == -1){
        movieRating = 0;
      }
      $("#rating"+movieID+ " .starRating").rating('update', movieRating);

      $("#rating"+movieID+ " .starRating").on('rating.change', function(e, value, caption){
        console.log(value);
        ref.child(userUID+"/library/"+movieID+"/userRating").set(value);
      });

      $("#rating"+movieID+ " .starRating").on('rating.clear', function(e){
        ref.child(userUID+"/library/"+movieID+"/userRating").set(-1);
      });

      }, //end loadrating

  }; //end return

});
