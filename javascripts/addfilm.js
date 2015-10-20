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
  function($, Handlebars, bootstrap, search, Q, movieTpl)   {
    
    //var firebaseRef = new Firebase("https://fear-film.firebaseio.com/");

    //var authData = firebaseRef.getAuth();

    // if(authData) {
    //   console.log("Authenticated user with uid:", authData);
    //   }      
    console.log('print me')
    $("button").on("click", ".addFilm", function(e) {
        e.preventDefault();
        console.log('you clicked add');
        // var filmInfo = {
        //     title: $('h1').val(),
        //     year: $('h2').val(),
        //     img: $('img').val()
        // };
        //console.log(filmInfo)


    // var addForm = firebaseRef.set(filmInfo,
    //     function(error, getAuth){
    //         if(error){
    //             console.log('error adding film info:', error);
    //         }else{
    //             console.log("success with uid", getAuth.uid);
    //             firebaseRef.child(getAuth.uid).set(filmInfo);
    //             window.location = "/mainpage.html"
    //         }
    //   });
  });
});

