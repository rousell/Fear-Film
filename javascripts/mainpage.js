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

      $("#stars").rating({
        min: 0,
        max: 10,
      });


      // ------- Tab functionality -------
    	$('#myTabs a').click(function (e) {
		    e.preventDefault()
		  $(this).tab('show')
			})
      // ------- End tab functionality -------



      // ------- search functionality -------
			$("#search-by-title-button").click(function(e) {
				e.preventDefault();
				console.log('CLICKED!');
        console.log(URL)
        //var globalFilmData;
        search.filmFinder()
          .then(function(json_data) {
           console.log("checking json data in mainpage", json_data)
           var array = $.map(json_data, function(value) {
             return value;
           });
           console.log(value);
           // globalFilmData = json_data;
            // globalFilmData.map() = filmArray;
            // console.log("film array:", filmArray)

            // types = Object.keys ( types ).map(key => types[ key ])
            // allMovies = Object.keys ( allMovies ).map(key => allMovies[ key ])


            // console.log("working?")


            // var moviesArray = allMovies.map(movie => {
            //   movie.type = _.find(types, { id:movie.movieType }).label;
            //   return movie;
            // });
           // globalFilmData = filmData;
           // console.log("globalFilmData", globalFilmData);
            $('#populatee').html("test", movieTpl({json_data}))
            console.log("Mainpage finished executing")
          });

      })
      // ------- end search functionality -------
    });


      /* search.filmFinder()
        .then(function(fData) {
          console.log("fData = ", fData)
          $('#populatee').html(fData.title);
        })
			console.log(URL);
			console.log('movietitle', movietitle);
      $("#populatee").html(URL);
    })
    });
*/
