define(["hbs",
        "hbs!../templates/welcome",
        "hbs!../templates/signUp",
        "hbs!../templates/logIn",
        "hbs!../templates/basedfilms",
        "hbs!../templates/main",
        "hbs!../templates/stars"],

function(handlebars, welcome, signUpTemplate, logInTemplate, basedfilmsTemplate, main, starsTemplate) {

  var templates = {};
  templates.welcome = welcome;
  templates.signUp = signUpTemplate;
  templates.logIn = logInTemplate;
  templates.basedFilms = basedfilmsTemplate;
  templates.main = main;
  templates.stars = starsTemplate;

  return templates;

});
