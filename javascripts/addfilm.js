define(function(require) {
  var _ = require("lodash"),
      q = require("q"),
      firebase = require('firebase'),
      $ = require('jquery'),
      app = require('app');

  return {
    add: function(movieID) {
      var firebaseRef = new Firebase("https://fear-film.firebaseio.com/");

      var authData = firebaseRef.getAuth();

      var userUID = authData.uid;

      var myGlobalFilm;

      if(authData) {
        console.log("Authenticated user with uid:", userUID);
      }

      $(document).on("click", ".addFilm", function(e) {
          e.preventDefault();
          console.log('you clicked add');
          findID.idFinder(this.id).then(function(myFilm){
            var filmInfo = {
              Title: myFilm.Title,
              Year: myFilm.Year,
              Poster: myFilm.Poster,
              Rating: 0,
              Watched: false
            };
            console.log('myFilm=', myFilm);
            myGlobalFilm = myFilm;
            }).then(function(){
              console.log("myGlobalFilm", myGlobalFilm);
              console.log("firebase", firebaseRef);
              firebaseRef.child(userUID).child(myGlobalFilm.imdbID).set(myGlobalFilm);
            });
          });

    }
  };
  });
