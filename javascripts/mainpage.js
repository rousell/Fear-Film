requirejs.config({
    baseUrl: './javascripts',
    paths: {
        'q': '../lib/bower_components/q/q',
        'jquery': '../lib/bower_components/jquery/dist/jquery.min',
        'lodash': '../lib/bower_components/lodash/lodash.min',
        'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
        'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min'
    },
    shim: {
        'bootstrap': ['jquery']
    }
});

requirejs(
    ["jquery", "hbs", "bootstrap", "search", "q", 'hbs!../templates/movies'],
    function($, Handlebars, bootstrap, search, Q, movieTpl) {


      // ------- Tab functionality -------
    	$('#myTabs a').click(function (e) {
		    e.preventDefault()
		  $(this).tab('show')
			})
      // ------- End tab functionality -------



      // ------- search functionality -------
			$("#search-by-title-button").click(function(e) {
				var globalJson;

        e.preventDefault();
				console.log('CLICKED!');
        console.log(URL)
        //var globalFilmData;
        search.filmFinder()
          .then(function(json_data) {
           console.log("checking json data in mainpage", json_data)
           globalJson = json_data;
           var array = $.map(json_data, function(value) {
             return value;
           }).then(function(){
           console.log("after return", value);
            $('#populatee').html(movieTpl(globalJson));
            console.log("Mainpage finished executing")
            })
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
