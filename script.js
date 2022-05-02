$(".search-button").on("click", function () {
  $.ajax({
    url:
      "http://www.omdbapi.com/?apikey=dca61bcc&s=" + $(".input-keyword").val(),
    success: (results) => {
      const movies = results.Search;
      let cards = "";
      movies.forEach((movie) => {
        cards += showCards(movie);
      });
      $(".movie-container").html(cards);

      // ketika tombol detail modal di-klik
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=dca61bcc&i=" +
            $(this).data("imdbid"),
          success: (movie) => {
            const movieDetail = showMovieDetail(movie);

            $(".modal-body").html(movieDetail);
          },
          error: (errors) => {
            const errorMessage = errors.responseText;
            alert(errorMessage);
            console.log(errorMessage);
          },
        });
      });
    },
    error: (errors) => {
      const errorMessage = errors.responseText;
      alert(errorMessage);
      console.log(errorMessage);
    },
  });
});

const showCards = (movie) => {
  return `<div class="col-md-4 my-3">
            <div class="card">
                <img src="${movie.Poster}" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <h6 class="card-subtittle mb-2 text-muted">${movie.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                    data-bs-target="#movieDetailModal" data-imdbid="${movie.imdbID}" >Show Details</a>
                </div>
            </div>
        </div>`;
};

const showMovieDetail = (movie) => {
  return ` <div class="container-fluid">
                <div class="row">
                <div class="col-md-3">
                    <img src=${movie.Poster} class="img-fluid" />
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item"><h4>${movie.Title} (${movie.Year})</h4></li>
                    <li class="list-group-item">
                        <strong>Director : </strong>${movie.Director}
                    </li>
                    <li class="list-group-item">
                        <strong>Actors : </strong>${movie.Actors}
                    </li>
                    <li class="list-group-item">
                        <strong>Writer : </strong>${movie.Writer}
                    </li>
                    <li class="list-group-item">
                        <strong>Plot : </strong> <br />
                        ${movie.Plot}
                    </li>
                    </ul>
                </div>
                </div>
            </div>`;
};
