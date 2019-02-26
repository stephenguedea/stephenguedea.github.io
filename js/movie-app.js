"use strict";
// CATCH A SUBMIT AND TAKE THE VALUE
$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
getMovies(searchText);
e.preventDefault();
});

function getMovies(searchText) {
    // console.log(searchText);

    axios.get('http://www.omdbapi.com?s=' + searchText +'&apikey=1eeb6a7f')
        .then((response) => {
        console.log(response);
    let movies = response.data.Search;
    let output = '';
    $.each(movies, (index, movie) => {
        output += `
					<div class="col-md-3">
						<div class='well text-center'>
							<img src='${movie.Poster}'>
							<p>${movie.Title}</>
							<p>${movie.Year}</p>
                            
							<a href="http://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Movie Details</a>

						</div>
					</div>
					`;
});

    $('#movies').html(output);
})

.catch((err) => {
        console.log(err);
});
}
// <a href="movie-info.html" class="btn btn-primary">Movie Details</a>

// <a href="http:imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Movie Details</a>
});