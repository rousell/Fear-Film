define(function(require) {
  var Q = require("q");
  var movieTpl = require('hbs!../templates/movies');

  return {
    filmFinder: function() {
    var deferred = Q.defer();
    var baseUrl= "http://www.omdbapi.com/?s=";
    var movietitle= $("#t").val();
    var urlEnd = "&type=movie"
    var URL= baseUrl+movietitle + urlEnd;
      $.ajax({ url: URL })
        .done(function(json_data) {
        console.log(json_data);
        deferred.resolve(json_data);
        })
        .fail(function(xhr, status, error) {
          deferred.reject(error);
        });

      return deferred.promise;
    },

    getMovieData: function(omdbid) {
      var deferred = Q.defer();
      var baseUrl= "http://www.omdbapi.com/?i=";
      var URL= baseUrl+omdbid;
        $.ajax({
          type: 'GET',
          url: URL })
        .done(function(json_data) {
          deferred.resolve(json_data);
        })
        .fail(function(xhr, status, error) {
          deferred.reject(error);
        });
        return deferred.promise;
    }
  };
});

