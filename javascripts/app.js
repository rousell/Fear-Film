requirejs.config({
    baseUrl: './javascripts',
    paths: {
        'q': '../lib/bower_components/q/q',
        'jquery': '../lib/bower_components/jquery/dist/jquery.min',
        'lodash': '../lib/bower_components/lodash/lodash.min',
        'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
        'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
        'bootstrap-star-rating': '../lib/bower_components/bootstrap-star-rating/js/star-rating.min',
        'firebase': '../lib/bower_components/firebase/firebase'
    },
    shim: {
        'bootstrap': ['jquery'],
        'bootstrap-star-rating': ['bootstrap']
    }
});

requirejs(
    ["jquery", "hbs", "bootstrap", "search", "q", "bootstrap-star-rating", "templates", "userAuth", "library"],
    function($, Handlebars, bootstrap, search, Q, stars, templates, userAuth, library) {

  //When the page loads: show log in and sign up buttons
  $("#contentDiv").html(templates.welcome);

  //show log in form on login button click
  $(document).on('click', '.showLogIn', function(){
    $("#contentDiv").html(templates.logIn);
  });

  //show sign up form on sign up button click
  $(document).on('click', '.showSignUp', function(){
    $("#contentDiv").html(templates.signUp);
  });

  //signUp when form is filled out just signs up
  $(document).on('click', '#signUp', function(e){
    e.preventDefault();
    userAuth.signUp();
    $("#contentDiv").html(templates.logIn);

  });


  //logIn is a promise that returns the UID
   $(document).on('click', '#logIn', function(e){
    e.preventDefault();
    userAuth.logIn()
      .then(function(uid){

        $("#contentDiv").html(templates.main);

      });
  });






      // $("#stars").rating({
      //   min: 0,
      //   max: 10,
      // });

   // ------- search functionality -------
  $(document).on('click', "#search-by-title-button", function(e) {
    e.preventDefault();
    var searchTemplate = templates.basedFilms;
    //search returns a promise with json_data from OMDB
    search.filmFinder() //returns search object from omdb
      .then(function(searchData) {
        library.check(searchData) //adds user ratings -2 (default) -1 (not Watched) 0-10 (Watched)
          .then(function(filteredSearchData){
            $('#searchResults').html(searchTemplate(filteredSearchData));
            //check user rating and add in correct display
            $('div.userRating').each(function(){

              var thisMovieRating = $(this).attr('rating');
              var thisMovieID = $(this).attr('imdbID');

              if (thisMovieRating == -2) {
                $(this).html('<button class="addFilm" omdbid="'+thisMovieID+'">Add Film</button>');
              } else if (thisMovieRating == -1) {
                $(this).html('<p>Not Yet Watched</p>');
              } else {
                $(this).html('<p>Rating: ' + thisMovieRating);
              }

            });//end each

          });

      });


  });//end search handler

   // ------- addMovie functionality -------
    $(document).on("click", ".addFilm", function(e) {
        e.preventDefault();
        var omdbid = $(this).attr('omdbid');
        library.addMovie(omdbid);
        $(this).hide();
  });//end add handler



});

