$(function(){

	$('article').append('<h1>Movies</h1>')
	var server = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
	$.ajax({
		url:server,
		dataType: 'jsonp',
		data: {
			q: '',
			apiKey: 'hcrurhsttexasrgfm2y6yahm',
		},
		success: showMovies
	});
	function showMovies(response){
		console.log('response', response);
		var movies = response.movies;
		for (var i=0; i<movies.length; i++){
			var movie = movies[i];
			$('article').append('<h3>' + movie.title + '</h3>');
			$('article').append('<img src="' + movie.posters.thumbnail + '" />');
		}
	}
});