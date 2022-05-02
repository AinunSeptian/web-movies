$.ajax({
  url: "http://www.omdbapi.com/?apikey=dca61bcc&s=avengers",
  success: (results) => {
    const movies = results.Search;
    let cards = "";
    movies.forEach((movie) => {
      cards += `<div class="col-md-4 my-3">
                    <div class="card">
                        <img src="${movie.Poster}" class="card-img-top" />
                        <div class="card-body">
                            <h5 class="card-title">${movie.Title}</h5>
                            <h6 class="card-subtittle mb-2 text-muted">${movie.Year}</h6>
                            <a href="#" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#movieDetailModal">Show Details</a>
                        </div>
                     </div>
                </div>`;
    });
    $(".movie-container").html(cards);
  },
  error: (errors) => {
    const errorMessage = errors.responseText;
    alert(errorMessage);
    console.log(errorMessage);
  },
});
