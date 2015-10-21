requirejs.config({
    baseUrl: './javascripts',
    paths: {
        'q': '../lib/bower_components/q/q',
        'jquery': '../lib/bower_components/jquery/dist/jquery.min',
        'lodash': '../lib/bower_components/lodash/lodash.min',
        'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
        'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
        'bootstrap-star-rating': '../lib/bower_components/bootstrap-star-rating/js/star-rating.min'
    },
    shim: {
        'bootstrap': ['jquery'],
        'bootstrap-star-rating': ['bootstrap']
    }
});

requirejs(
    ["jquery", "hbs", "bootstrap", "search", "q", 'hbs!../templates/movies', "bootstrap-star-rating"],
    function($, Handlebars, bootstrap, search, Q, movieTpl, stars) {
    ["jquery", "hbs", "bootstrap", "search", "q", 'hbs!../templates/movies', 'addfilm'],
    function($, Handlebars, bootstrap, search, Q, movieTpl, addfilm) {


      $("#stars").rating({
        min: 0,
        max: 5,
      });
      

      // ------- Tab functionality -------
    	$('#myTabs a').click(function (e) {
		    e.preventDefault()
		  $(this).tab('show')
			})
      // ------- End tab functionality -------

  
});
      // ------- search functionality -------
			$("#search-by-title-button").click(function(e) {

				var globalJson;

				e.preventDefault();
				console.log('CLICKED!');
        //var globalFilmData;
        search.filmFinder()
          .then(function(json_data) {
           console.log("checking json data in mainpage", json_data)
           globalJson = json_data;
           var array = $.map(json_data, function(value) {
             return value;
           });
           }).then(function(){
           	console.log("bla");
           	console.log("Mainpage finished executing", globalJson);
           	$('#populatee').html(movieTpl(globalJson));
          });

      })
      // ------- end search functionality -------
    });


  
