$(document).ready(function() {

  var filmTemplateSource = $('#film_template').html();
  var filmTemplate = Handlebars.compile(filmTemplateSource);
  $(document).on('keydown',
  function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      $('.main__button').click();
    }
  });
  $('.main__button').on('click',
  function() {
    $('.main__content-searched').html('');
    var input = $('.main__searchbar').val();
    $.ajax({
      url:"https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: "aa90d1c8a08bcd8ade655691dd0a97fd",
        query: input,
        include_adult: true,
        language: "it-IT",
      },
      success: function(response) {
        for (var numFilm = 0; numFilm < response.results.length; numFilm++) {
          var filmContext = {
            title: response.results[numFilm].title,
            original_title: response.results[numFilm].original_title,
            original_language: response.results[numFilm].original_language,
            vote_average: response.results[numFilm].vote_average,
            // function() {
            //   var vote = reponse.results[numFilm].vote_average.toFixed(0);
            // }
          };
          var newFilm = filmTemplate(filmContext);
          $('.main__content-searched').append(newFilm);
        };
      },
      error: function(request, stats, errors){
        $('.main__content-searched').append('Nessun Film Trovato');
      },
    });
  });

});
