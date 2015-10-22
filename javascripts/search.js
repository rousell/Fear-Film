define(function(require) {
  var Q = require("q");
  var movieTpl = require('hbs!../templates/movies');
  return {
    filmFinder: function() {
    var deferred = Q.defer();
    var baseUrl= "http://www.omdbapi.com/?s=";
    var movietitle= $("#t").val();
    var URL= baseUrl+movietitle;
      $.ajax({ url: URL })
        .done(function(json_data) {
        $('#populatee').append(json_data);
        deferred.resolve(json_data);
        return json_data
        })
        .fail(function(xhr, status, error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
  }
});

