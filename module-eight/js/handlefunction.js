$(function() {

	var apiKey = "srbnk5ud89tumbv8a8y9tywf";



    function request(url, data, callback) {
        $.ajax({
            url: url,
            data: data,
            dataType: 'jsonp',
            success: callback
        });
    }

    function getTemplate(template_name, data) {
        var markup = "";
        var template = $('#' + template_name).html();
        var $template = Handlebars.compile(template);
        markup = $template(data);
        return markup;
    }

    function showBoxOffice(response) {
        console.log('response',response);
        var box_office;
        for (var i = 0; i < response.movies.length; i++) {
            var box_office = response.movies[i];
            $('#box_office').append(getTemplate('show_tab', box_office));
            $('#box_office a:eq('+[i]+')').prepend('<i class="glyphicon glyphicon-thumbs-up"></i>');
            if (i == 0) {
                $('#details').append(getTemplate('show', box_office));
            };
        };
        
    }
    function showInTheater(response) {
        var in_theater;
        for (var i = 0; i < response.movies.length; i++) {
            var in_theater = response.movies[i];
            $('#in_theater').append(getTemplate('show_tab', in_theater));
            $('#in_theater a:eq('+[i]+')').prepend('<i class="glyphicon glyphicon-film"></i>');
            if (i == 0) {
                $('#details').append(getTemplate('show', in_theater));
            };
        };
    }

    function showOpening(response) {
        var opening;
        for (var i = 0; i < response.movies.length; i++) {
            var opening = response.movies[i];
            $('#opening').append(getTemplate('show_tab', opening));
            $('#opening a:eq('+[i]+')').prepend('<i class="glyphicon glyphicon-eye-open"></i>');
            if (i == 0) {
                $('#details').append(getTemplate('show', opening));
            };
        };
    }

    function showUpcoming(response) {
        var upcoming;
        for (var i = 0; i < response.movies.length; i++) {
            var upcoming = response.movies[i];
            $('#upcoming').append(getTemplate('show_tab', upcoming));
            $('#upcoming a:eq('+[i]+')').prepend('<i class="glyphicon glyphicon-calendar"></i>');
            if (i == 0) {
                $('#details').append(getTemplate('show', upcoming));
            };

        };
    }

    function showTopRental(response) {
        var top_rental;
        for (var i = 0; i < response.movies.length; i++) {
            var top_rental = response.movies[i];
            $('#top_rental').append(getTemplate('show_tab', top_rental));
            $('#top_rental a:eq('+[i]+')').prepend('<i class="glyphicon glyphicon-star-empty"></i>');
        };
    }

    function showCurrentRelease(response) {
        var current_release;
        for (var i = 0; i < response.movies.length; i++) {
            var current_release = response.movies[i];
            $('#current_release').append(getTemplate('show_tab', current_release));
            $('#current_release a:eq('+[i]+')').prepend('<i class="glyphicon glyphicon-check"></i>');
        };
    }

    function showNewRelease(response) {
        var new_release;
        for (var i = 0; i < response.movies.length; i++) {
            var new_release = response.movies[i];
            $('#new_release').append(getTemplate('show_tab', new_release));
            $('#new_release a:eq('+[i]+')').prepend('<i class="glyphicon glyphicon-random"></i>');
        };
    }

    function showDupcoming(response) {
        var dupcoming;
        for (var i = 0; i < response.movies.length; i++) {
            var dupcoming = response.movies[i];
            $('#dupcoming').append(getTemplate('show_tab', dupcoming));
            $('#dupcoming a:eq('+[i]+')').prepend('<i class="glyphicon glyphicon-calendar"></i>');
        };
    }

    function showSearchResults(response) {
        var movie;
        var x = 0;
        $('#details').empty();
        $('#pages').empty();
        $('#bot_pages').empty();
        $('#details').append('<div class ="row"><div class ="col-md-12"><div class ="row" id ="row0" ></div></div></div>');
        if (response.total == 0) {
            $('#details').append('<div class ="row"><div class ="col-md-12"><div class ="row" id ="row'+[i]+'"><h3>No Results Found</h3></div></div></div>');
            return false;
        };
        for (var i = 0; i < response.movies.length; i++) {
            var movie = response.movies[i];
            if ((i==3) || (i==6) || (i==9) || (i==12) || (i==15) || (i==18) || (i==21) || (i==24) || (i==27))
            {
                $('#details').append('<div class ="row"><div class ="col-md-12"><div class ="row" id ="row'+[i]+'"></div></div></div>');
                $('#row'+[i]+'').append(getTemplate('show_search_results', movie));
                x = i;
            }
            else
            {
                $('#row'+[x]+'').append(getTemplate('show_search_results', movie));
            };

            $('.btn').click(
                function() { 
                var data = this.childNodes[1].childNodes;

                var theData = {
                    title: data[1].textContent,
                    year:data[3].textContent,
                    image:data[5].textContent,
                    synopsis:data[7].textContent,
                    audience:data[9].textContent,
                    critics:data[11].textContent,
                    runtime:data[13].textContent,
                    link:data[15].textContent
                        };

                $('#container_modal').empty();
                $('#container_modal').append(getTemplate('show_modal', theData));
                    $('#modal').reveal({ 
                        animation: 'fade',         
                        animationspeed: 600,              
                        closeonbackgroundclick: true,      
                        dismissmodalclass: 'close'  
                    });
                return false;
                });
        };
        if (response.total > 30) {
            $('#pages').append(getTemplate('show_buttons', response));
            $('#bot_pages').append(getTemplate('show_buttons', response)); 
        };

    $('.next_page').click(
        function(){
            request(response.links.next,
                {
                   apiKey:apiKey
                },
                    showSearchResults);
        });
    $('.previous_page').click(
        function(){
            request(response.links.prev,
                {
                   apiKey:apiKey
                },
                    showSearchResults);
        });

        $('.none').css('display','none');
    }
    request('https://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json', {apiKey:apiKey, limit:'5'}, showBoxOffice);
    request('https://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json', {apiKey:apiKey, page:'1', page_limit:'8'}, showInTheater);
    request('https://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json', {apiKey:apiKey, limit:'4'}, showOpening);
    request('https://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json', {apiKey:apiKey, limit:'4'}, showUpcoming);

    request('https://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json', {apiKey:apiKey, limit:'5'}, showTopRental);
    request('https://api.rottentomatoes.com/api/public/v1.0/lists/dvds/current_releases.json', {apiKey:apiKey, page:'1', page_limit:'8'}, showCurrentRelease);
    request('https://api.rottentomatoes.com/api/public/v1.0/lists/dvds/new_releases.json', {apiKey:apiKey, page:'1', page_limit:'8'}, showNewRelease);
    request('https://api.rottentomatoes.com/api/public/v1.0/lists/dvds/upcoming.json', {apiKey:apiKey, page:'1', page_limit:'8'}, showDupcoming);

    $('#search_movie_button').click(
        function(){
            if ((document.getElementById('search_movie_field').value) == "") {
                alert("Please Input Something!");
                return false;
            };
            search();
            $('#search_movie_field').val('');
        });

    $('#search_movie_field').keypress (function(enter){       
     if (enter.which == 13){
            if ((document.getElementById('search_movie_field').value) == "") {
                alert("Please Input Something!");
                return false;
            };
            search();
            $('#search_movie_field').val('');
            }
        });

    $('.showboxOffice').click(
    function(){
        request('https://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json', {apiKey:apiKey}, showSearchResults);
    });
    $('.showtheaters').click(
    function(){
        request('https://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json', {apiKey:apiKey}, showSearchResults);
    });
    $('.showopenings').click(
    function(){
        request('https://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json', {apiKey:apiKey}, showSearchResults);
    });
    $('.showupcoming').click(
    function(){
        request('https://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json', {apiKey:apiKey}, showSearchResults);
    });

    $('.showtoprentals').click(
    function(){
        request('https://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json', {apiKey:apiKey}, showSearchResults);
    });
    $('.showcurrentreleases').click(
    function(){
        request('https://api.rottentomatoes.com/api/public/v1.0/lists/dvds/current_releases.json', {apiKey:apiKey}, showSearchResults);
    });
    $('.showonewreleases').click(
    function(){
        request('https://api.rottentomatoes.com/api/public/v1.0/lists/dvds/new_releases.json', {apiKey:apiKey}, showSearchResults);
    });
    $('.showdupcoming').click(
    function(){
        request('https://api.rottentomatoes.com/api/public/v1.0/lists/dvds/upcoming.json', {apiKey:apiKey}, showSearchResults);
    });



    function search(){
        request('https://api.rottentomatoes.com/api/public/v1.0/movies.json',
                {   q:$('#search_movie_field').val(),
                    apiKey:apiKey
                },
                    showSearchResults);
    }

    $('#myTab li:eq(1)').click(
        function(){
            $('#myTab a[href="#profile"]').tab('show');
        });
    $('#myTab li:eq(0)').click(
        function(){
            $('#myTab a[href="#home"]').tab('show');
        });
    $('[data-toggle=offcanvas]').click(function() {
      $('.row-offcanvas').toggleClass('active');
    });


});

