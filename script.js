const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (err) {
    alert(err);
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=dca61bcc&s=" + keyword)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((res) => {
      if (res.Response === "False") {
        throw new Error(res.Error);
      }
      return res.Search;
    });
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((movie) => (cards += showCards(movie)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

// event binding
document.addEventListener("click", async function (e) {
  try {
    if (e.target.classList.contains("modal-detail-button")) {
      const imdbid = e.target.dataset.imdbid;
      const movieDetail = await getMovieDetail(imdbid);
      updateUIDetail(movieDetail);
    }
  } catch (err) {
    alert(err);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=dca61bcc&i=" + imdbid)
    .then((res) => res.json())
    .then((movie) => movie);
}

function updateUIDetail(movie) {
  const movieDetail = showMovieDetail(movie);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

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
