function placeMovie(){
				
				var values = new Array();
			    values.push(document.forms["searchMovie"]["movies"].value);
			    localStorage.setItem('movie_title', values); 

			    
			}

			$(function(){


				if (localStorage.length == 0) {
					$('article').append('<font>Welcome!</font>');
				}
				else
				{
				$('article').append('<h3><font color = "white">Search Results for: "' + localStorage.getItem('movie_title') +'"</font></h3>')
				var server = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
					$.ajax({
						url:server,
						dataType: 'jsonp',
						data: {
							q: localStorage.getItem('movie_title'),
							apiKey: 'hcrurhsttexasrgfm2y6yahm',
						},
						success: showMovies
					});
				function showMovies(response){
					console.log('response', response);
					var movies = response.movies;
						if (movies.length == 0) {
						$('article').append('<h4><br/> There are no Movies found for:"' + localStorage.getItem('movie_title') +'"</h4>');
						}
						else
						{
						$('#featured').remove();
						$('article').append('<div class="panel-group" id="accordion"></div>');
						for (var i=0; i<movies.length; i++){
							var movie = movies[i];
							var casts = movie.abridged_cast;
							$('div#accordion').append(' <div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapse'+[i]+'"><img src="'+movie.posters.thumbnail+'"class="img-thumbnail" border = "15px" align= "right"><h4>'+movie.title+'</h4><font size = "2">Cast:</font><div id = "cast'+[i]+'" font size = "2" word-spacing= "2px" margin = "30px"></div> <font size = "2">Audience Rating:</font>'+movie.ratings.audience_score+' <font size = "2">Date Released:</font>'+movie.release_dates.dvd+'</a></h4>Synopsis:</div><div id="collapse'+[i]+'" class="panel-collapse collapse"><div class="panel-body"><font size= "2" align = "justify">'+movie.synopsis+'</font></div></div></div>');

							for (var x=0; x<casts.length; x++){
								var cast = casts[x];
								$('div#cast'+[i]+'').append('"'+cast.name+'", ');
								}

							}
						}
					}

				}
				$('#buttons').akordeon();
            	$('#button-less').akordeon({ buttons: false, toggle: true, itemsOrder: [2, 0, 1] });


				});				