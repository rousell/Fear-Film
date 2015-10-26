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
    ["jquery", "hbs", "bootstrap", "search", "q", "bootstrap-star-rating", "stars", "templates", "userAuth", "library", "dev"],
    function($, Handlebars, bootstrap, search, Q, starRating, stars, templates, userAuth, library, dev) {

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
        library.populateTabs();
      });
  });

   dev.logIn()
    .then(function(uid){

          $("#contentDiv").html(templates.main);
          library.populateTabs();
    });

// log out
  $(document).on('click', '.logOut', function(){
    e.preventDefault();
    userAuth.logOut()
      .then(function(uid){
        $("#contentDiv").html(templates.welcome);
      })
  });

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
              } else if (thisMovieRating === "") {
                console.log($(this).parent()[0]);
                $(this).parent()[0].remove();
              } else if (thisMovieRating == -1) {
                $(this).html(templates.stars);
                stars.loadRating(thisMovieID, thisMovieRating);
              } else {
                $(this).html(templates.stars);
                stars.loadRating(thisMovieID, thisMovieRating);
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

        //////REDO THE WHOLE DAMN SEARCH

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
              } else if (thisMovieRating === "") {
                console.log($(this).parent()[0]);
                $(this).parent()[0].remove();
              } else {
                $(this).html(templates.stars);
                stars.loadRating(thisMovieID, thisMovieRating);
              }

            });//end each

          });

      });
        ///////REDO THE WHOLE DAMN SEARCH OVER

  });//end add handler

//////HANDLER FOR RATING TAB

  $(document).on('click', '#ratingRange', function () {

    selectedRating = $(this).val();
    $('.ratingDiv').hide();
    console.log(selectedRating);
    divToShow = "#stars" + selectedRating;
    $(divToShow).show();

  });

//end rating change handler

//////HANDLER FOR Delete Button

  $(document).on('click', '.deleteButton', function () {

    var omdbid = $(this).attr('omdbid');
    console.log(omdbid);
    library.removeMovie(omdbid);
    console.log($(this).parent()[0]);
    $(this).parent()[0].remove();

  });

//end rating change handler


});


