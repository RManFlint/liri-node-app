var axios = require("axios");
require("dotenv").config();

var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);

var choice = process.argv[2];
var identifier = process.argv.slice(3).join(" ")

switch (choice) {
    case "concert-this":
      concertThis();
      break;
    
    case "spotify-this-song":
      spotifySong();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-it-says":
      doThis();
      break;
    }
function movieThis(){
    axios.get("http://www.omdbapi.com/?t="+identifier+"&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's title is: " + response.data.Title);
    console.log("The movie's year of release is: " + response.data.Year);
    console.log("The movie's IMDB rating is: " + response.data.imdbRating);
    console.log("The movie's rating on Rotten Tomatoes is: " + response.data.Ratings[1].Value);
    console.log("The movie's country of production is: " + response.data.Country);
    console.log("The movie is in: " + response.data.Language);
    console.log("The movie's plot is: " + response.data.Plot);
    console.log("The movie's cast includes: " + response.data.Actors);

  }
)
}
function concertThis(){
    axios.get("https://rest.bandsintown.com/artists/" + identifier + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log(response);
    /*console.log("The movie's title is: " + response.data.Title);
    console.log("The movie's year of release is: " + response.data.Year);
    console.log("The movie's IMDB rating is: " + response.data.imdbRating);
    console.log("The movie's rating on Rotten Tomatoes is: " + response.data.Ratings[1].Value);
    console.log("The movie's country of production is: " + response.data.Country);
    console.log("The movie is in: " + response.data.Language);
    console.log("The movie's plot is: " + response.data.Plot);
    console.log("The movie's cast includes: " + response.data.Actors);
    */

  }
)
}



