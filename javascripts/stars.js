define(["jquery", "hbs", "bootstrap", "search", "q", "templates", "bootstrap-star-rating"],
    function($, Handlebars, bootstrap, search, Q, templates, stars) {

  var ref = new Firebase("https://fear-film.firebaseio.com/");

  return {

  	loadRating: function(movieID) {

      var authData = ref.getAuth();
      var userUID = authData.uid;

  		$(".starRating").rating({
        min: 0,
        max: 10,
        step: 1,
        showClear: true,
        size: "md",
      });

      }, //end loadrating

    editRating: function(movieID) {
      $(".starRating").on('rating.change', function(event, value, caption) {
        console.log(value);
        console.log(caption);

        var newRating = $('#rating' +movieID).val();
        ref.child("Users/"+currentUID+"/library/"+movieID+"/userRating").set(newRating);

      });


    }



  }; //end return

});
