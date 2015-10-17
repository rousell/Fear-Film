requirejs.config({
    baseUrl: './javascripts',
    paths: {
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
    ["jquery", "hbs", "bootstrap"],
    function($, Handlebars, bootstrap) {
    	$('#myTabs a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
			})

			$("#search-by-title-button").click(function(e) {
				e.preventDefault();
				console.log('CLICKED!!!!!!AHhHHHHHHHHHh');
			var baseUrl= "http://www.omdbapi.com/?t=";
			var movietitle= $("#t").val();
			var URL= baseUrl+movietitle;
			console.log(URL);
			console.log('movietitle', movietitle);
			$.ajax({ 
				url:URL
				})
			})
    });