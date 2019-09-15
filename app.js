/*
- Search Movies and return a list.
- Click the movie poster and show the location and time it's playing, if it's not then show nothing. 

- Popular movies playing in your city. (Use google maps api)

*/
$(document).ready(function(){
    $('#search-form').on('submit',function(e){
        e.preventDefault();
        let search = $('#movie-name').val();
        $('#movie-name').val('');
        console.log(search);

        getMovies(search);
        
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
        console.log(data.Search);
        let movieList = data.Search;

        $('#movie-list').html('');

        for (let i = 0; i < movieList.length; i++) {
            //console.log(movieList[i].Title)
    
            $('#movie-list').append(
                `
                <div class="col-md-4 mb-5 movie-grid-item">
                    <div class="card" style="width: 18rem;">
                        <img src="${movieList[i].Poster}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${movieList[i].Title}</h5>
                            <h6 class="card-title">${movieList[i].Year}</h6>
                            <a href="https://www.imdb.com/title/${movieList[i].imdbID}/" class="card-link" target="_blank">More Info</a>
                            <p class="card-text"></p>

                            <button type="button" class="btn btn-primary" id="show-time-btn">View Show Times</button>
                        </div>
                    </div>
                </div>
                `
            )
        }
        //Use maps API
        showTime();
    })  
    
}

function showTime() {
    $('#show-time-btn').on('click', function(e){
        e.preventDefault();
        //alert('It worked');
    }) 
}


