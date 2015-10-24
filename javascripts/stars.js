define(["jquery", "hbs", "bootstrap", "search", "q", "templates", "bootstrap-star-rating"],
    function($, Handlebars, bootstrap, search, Q, templates, stars) {

  return {

  	loadRating: function() {

      $(#starRating).html(templates.stars);



  		// require(["hbs!../templates/basedfilms"], function(movieTpl({
  		// $("#").html(movieTpl({}))
  		// $(".stars").rating({
    //     min: 0,
    //     max: 5,
    //     size: "xs",
    //     starCaptions: {
    //     	1: "Brutal",
    //     	2: "This sucked fairly bad",
    //     	3: "Eh... I guess",
    //     	4: "I can dig this",
    //     	5: "Shut up and take my money!"
    //     }
    //   });

    //   })
    } //end loadrating
  }; //end return

});
