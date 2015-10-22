define(["hbs",
        "hbs!../templates/signUp",
        "hbs!../templates/logIn",
        "hbs!../templates/movies",
        "hbs!../templates/basedfilms"],
function(handlebars, signUpTemplate, logInTemplate, moviesTemplate, basedfilmsTemplate) {

  var templates = {};
  templates.signUp = signUpTemplate;
  templates.logIn = logInTemplate;
  templates.movies = moviesTemplate;
  templates.basedFilms = basedfilmsTemplate;

  return templates;

});
