define(["jquery", "hbs", "bootstrap", "search", "q", 'hbs!../templates/movies', "bootstrap-star-rating"],
    function($, Handlebars, bootstrap, search, Q, movieTpl, stars) {
    ["jquery", "hbs", "bootstrap", "search", "q", 'hbs!../templates/movies', 'addfilm'],
    function($, Handlebars, bootstrap, search, Q, movieTpl, addfilm], function() {
	
  return {
  	loadRating: function() {
  		require(["hbs!../templates/basedfilms"], function(movieTpl({
  		$("#").html(movieTpl({}))	
  		$(".stars").rating({
        min: 0,
        max: 5,
        size: "xs",
        starCaptions: {
        	1: "Brutal",
        	2: "This sucked fairly bad",
        	3: "Eh... I guess",
        	4: "I can dig this",
        	5: "Shut up and take my money!"
        }
      });
  		
  	}
  }


});