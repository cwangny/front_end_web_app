/*
- Search Movies and return a list.
- Click the movie poster and show the location and time it's playing, if it's not then show nothing. 

- Popular movies playing in your city. (Use google maps api)

*/
$(document).ready(function(){
    $('#search-btn').on('click', function(e){
        e.preventDefault();
        let search = $('#movie-name').val();
        $('#movie-name').val('');
        console.log(search);

        getMovies(search);
    })
        

})

//Requesting to OMDB API  
function getMovies(searchParam) {
    //For Search param: http://www.omdbapi.com/?s=home&apikey=576f5cb7
    //For title param: http://www.omdbapi.com/?i=tt3896198&apikey=576f5cb7
    $.getJSON('http://www.omdbapi.com/?s='+ searchParam +'&apikey=576f5cb7', function(data){
        console.log(data)
    })  
}

//getMovies('Iron')
