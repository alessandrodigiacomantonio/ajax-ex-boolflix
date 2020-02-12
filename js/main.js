$(document).ready(function() {

  $(document).on('keydown',
  function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      $('.main__button').click();
    }
  });
  $('.main__button').on('click',
  function() {
    $('.main__content-searched__film__item:not(:first-child)').remove();
    $('.main__content-searched__tv__item:not(:first-child)').remove();
    var input = $('.main__searchbar').val();
    getSearchedFilm(input);
    getSearchedTv(input);
  });

});

function getSearchedFilm(query) {
  var filmTemplateSource = $('#film_template').html();
  var filmTemplate = Handlebars.compile(filmTemplateSource);
  $.ajax({
    url:"https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {
      api_key: "aa90d1c8a08bcd8ade655691dd0a97fd",
      query: query,
      include_adult: true,
      language: "it-IT",
    },
    success: function(response) {
      $('.film-counter').text('Film trovati: '+response.total_results)
      for (var numFilm = 0; numFilm < response.results.length; numFilm++) {
        var filmContext = {
          poster_path: "https://image.tmdb.org/t/p/w185"+response.results[numFilm].poster_path,
          title: response.results[numFilm].title,
          original_title: response.results[numFilm].original_title,
          original_language: response.results[numFilm].original_language,
          overview: function() {
            if (response.results[numFilm].overview.length == 0) return 'Nessuna anteprima disponibile';
            else return response.results[numFilm].overview;
          },
          list_type: 'film',
        };
        var newFilm = filmTemplate(filmContext);
        $('.main__content-searched__film').append(newFilm);
        var vote = (response.results[numFilm].vote_average / 2).toFixed(0);
        for (var stars = 0; stars < vote; stars++) {
          $('.main__content-searched__film__item').last().find('.vote').append('<i class="fas fa-star"></i>');
        }
        while (stars < 5) {
            $('.main__content-searched__film__item').last().find('.vote').append('<i class="far fa-star"></i>');
            stars++;
        }
      };
    },
    error: function(request, stats, errors){
      $('.main__content-searched__film').text('Nessun Film Trovato');
    },
  });
}
function getSearchedTv(query) {
  var tvTemplateSource = $('#film_template').html();
  var tvTemplate = Handlebars.compile(tvTemplateSource);
  $.ajax({
    url:"https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: {
      api_key: "aa90d1c8a08bcd8ade655691dd0a97fd",
      query: query,
      language: "it-IT",
    },
    success: function(response) {
      $('.tv-counter').text('Serie TV trovate: '+response.total_results)
      for (var numTv = 0; numTv < response.results.length; numTv++) {
        var tvContext = {
          poster_path: "https://image.tmdb.org/t/p/w185"+response.results[numTv].poster_path,
          title: response.results[numTv].name,
          original_title: response.results[numTv].original_name,
          original_language: response.results[numTv].original_language,
          overview: function() {
            if (response.results[numTv].overview.length == 0) return 'Nessuna anteprima disponibile';
            else return response.results[numTv].overview;
          },
          list_type: 'tv',
        };
        var newTv = tvTemplate(tvContext);
        $('.main__content-searched__tv').append(newTv);
        var vote = (response.results[numTv].vote_average / 2).toFixed(0);
        for (var stars = 0; stars < vote; stars++) {
          $('.main__content-searched__tv__item').last().find('.vote').append('<i class="fas fa-star"></i>');
        }
        while (stars < 5) {
            $('.main__content-searched__tv__item').last().find('.vote').append('<i class="far fa-star"></i>');
            stars++;
        }
      };
    },
    error: function(request, stats, errors){
      $('.main__content-searched__tv').text('Nessuna Serie TV Trovata');
    },
  });
}
