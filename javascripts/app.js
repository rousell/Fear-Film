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
    ["jquery", "hbs", "bootstrap", "search", "q", "bootstrap-star-rating", "templates", "userAuth"],
    function($, Handlebars, bootstrap, search, Q, stars, templates, userAuth) {

  //When the page loads: show log in and sign up buttons
  $("#contentDiv").html(templates.welcome);

  //show log in
  $(document).on('click', '.showLogIn', function(){
    $("#contentDiv").html(templates.logIn);
  });

  //show sign up
  $(document).on('click', '.showSignUp', function(){
    $("#contentDiv").html(templates.signUp);
  });

  //signUp just signs up
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


      })
  });



      //$("#contentDiv").html(templates.main);


      // $("#stars").rating({
      //   min: 0,
      //   max: 10,
      // });


      // ------- Tab functionality -------
   //  	$('#myTabs a').click(function (e) {
		 //    e.preventDefault();
		 //  $(this).tab('show');
			// });
      // ------- End tab functionality -------



      // ------- search functionality -------
			$(document).on('click', "#search-by-title-button", function(e) {
				e.preventDefault();

        var globalJson;
        //var globalFilmData;

        //search returns a promise with json_data from OMDB
        search.filmFinder()
          .then(function(json_data) {
           searchObject = json_data;
           var searchArray = $.map(json_data, function(value) {
             return value;
           });
           searchTemplate = templates.basedFilms;
           console.log(searchTemplate);
           console.log(searchObject);
          $('#searchResults').html(searchTemplate(searchObject));
          });

      // ------- end search functionality -------
    });//end search handler

});


