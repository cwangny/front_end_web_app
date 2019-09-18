/*
- Search Movies.
- Show movie theater near user's location.
*/

/*OMDB API*/
let search;
$(document).ready(function(){
    $('#search-form').on('submit',function(e){
        e.preventDefault();
        search = $('#movie-name').val();
        $('#movie-name').val('');
        //console.log(search.length);

        getMovies(search);
        initMap();
    })

    //Modal
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })
})

//Sends HTTP requests to OMDB API and displays the movie. 
function getMovies(searchParam) {
    //For Search param: http://www.omdbapi.com/?s=home&apikey=576f5cb7
    //For title param: http://www.omdbapi.com/?i=tt3896198&apikey=576f5cb7
    //Needs minimum of 3 letters in searchparam
    //Pagination feature. 
    $.getJSON('http://www.omdbapi.com/?apikey=576f5cb7&s='+ searchParam /* &page=1 */, function(data){
        //console.log(data.Search[0]);
        //console.log(data.Search);
        let movieList = data.Search;

        if (search.length < 3) {
            console.log('To many search results');
            alert('Too many results! Movie name needs to be longer than 2 letters.')

        } else {
            $('#movie-list').html('');

            for (let i = 0; i < movieList.length; i++) {
                //console.log(movieList[i].Title)
        
                $('#movie-list').append(
                    `
                    <div class="col-lg-4 mb-5 movie-grid-item">
                        <div class="card" style="width: 18rem;">
                            <img src="${movieList[i].Poster}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${movieList[i].Title}</h5>
                                <h6 class="card-title">${movieList[i].Year}</h6>
                                <a href="https://www.imdb.com/title/${movieList[i].imdbID}/" class="card-link" target="_blank">More Info</a>
                                <p class="card-text"></p>
                                <a class="btn btn-primary" id="show-time-btn" href="https://www.imdb.com/showtimes/title/${movieList[i].imdbID}" role="button" target="_blank">View Show Times</a>
                                
                            </div>
                        </div>
                    </div>
                    `
                )
            }
        }
    })   
}

/*GOOGLE MAPS API*/

//Global variables
var map;
var service;
var infoWindow;
var pos;
//Main map function
function initMap() {
    var sydney = new google.maps.LatLng(-33.867, 151.195);

    infoWindow = new google.maps.InfoWindow;

    //Create a map object 
    map = new google.maps.Map(document.getElementById('map'), {center: sydney, zoom: 12});

    // Geolocation API
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            //console.log(position);
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            
            //infoWindow.open(map);
            //Add a green marker for user location.
            var image = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            var marker = new google.maps.Marker({
                position: pos, 
                map: map,
                title: 'User Location',
                icon: image 
            });

            //Infowindow displays when green marker is clicked
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });

            infoWindow.setPosition(pos);
            infoWindow.setContent('Your Location');
            
            map.setCenter(pos);
            marker.setMap(map);

            //Search param 
            var request = {
                //Test for perth:
                //{lat: -31.953512, lng: 115.8605}, 
                location: {lat: position.coords.latitude, lng: position.coords.longitude},
                radius: '10000',
                type: ['movie_theater']
            };
        
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);

        })
    } else {
        console.log('Geolocation not supported by your browser');
    }      
}

//Creates red markers for movie theatres 
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
            //console.log(results[i]);
        }
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });
}