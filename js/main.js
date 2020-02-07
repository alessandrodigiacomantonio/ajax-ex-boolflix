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
          };
          var newFilm = filmTemplate(filmContext);
          $('.main__content-searched').append(newFilm);
          var vote = (response.results[numFilm].vote_average / 2).toFixed(0);
          for (var stars = 0; stars < vote; stars++) {
            $('.main__content-searched__film').last().find('.vote').append('<i class="fas fa-star"></i>');
          }
          while (stars < 5) {
              $('.main__content-searched__film').last().find('.vote').append('<i class="far fa-star"></i>');
              stars++;
          }
        };
      },
      error: function(request, stats, errors){
        $('.main__content-searched').append('Nessun Film Trovato');
      },
    });
  });

});
