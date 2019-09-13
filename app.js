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
    $.getJSON('http://www.omdbapi.com/?s='+ searchParam +'&apikey=576f5cb7', function(data){
        //console.log(data.Search[0]);
        //console.log(data.Search);
        let movieList = data.Search;

        $('#movie-list').html('');

        for (let i = 0; i < movieList.length; i++) {
            //console.log(movieList[i].Title)
    
            $('#movie-list').append(
                `
                <div class="col-md-4 mb-5">
                    <div class="card" style="width: 18rem;">
                        <img src="#" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${movieList[i].Title}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary">View Show Times</a>
                        </div>
                    </div>
                </div>
                `
            )
        }
    })  
    
}


