define(["hbs",
        "hbs!../templates/welcome",
        "hbs!../templates/signUp",
        "hbs!../templates/logIn",
        "hbs!../templates/movies",
        "hbs!../templates/basedfilms",
        "hbs!../templates/main"],
function(handlebars, welcome, signUpTemplate, logInTemplate, moviesTemplate, basedfilmsTemplate, main) {

  var templates = {};
  templates.welcome = welcome;
  templates.signUp = signUpTemplate;
  templates.logIn = logInTemplate;
  templates.movies = moviesTemplate;
  templates.basedFilms = basedfilmsTemplate;
  templates.main = main;

  return templates;

});
