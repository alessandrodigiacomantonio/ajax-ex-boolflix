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
    var input = $('.main__searchbar').val();
    $.ajax({
      url:"https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: "aa90d1c8a08bcd8ade655691dd0a97fd",
        query: input,
      },
      success: function(response) {
        console.log(response);
        for (var numFilm = 0; numFilm < response.results.length; numFilm++) {
          var filmContext = response.results[numFilm];
          var newFilm = filmTemplate(filmContext);
          $('.main__content-searched').append(newFilm);
        };
      },
      error: function(request, stats, errors){},
    });
  });

});
