$.ajax({
  url: "http://www.omdbapi.com/?apikey=dca61bcc&s=avengers",
  success: (res) => {
    const movies = res.Search;
    console.log(movies);
  },
  error: (err) => {
    console.log(err.responseText);
  },
});
