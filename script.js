$.ajax({
  url: "http://www.omdbapi.com/?apikey=dca61bcc&s=avengers",
  success: (results) => {
    const movies = results.Search;
    console.log(movies);
  },
  error: (errors) => {
    const errorMessage = errors.responseText;
    alert(errorMessage);
    console.log(errorMessage);
  },
});
