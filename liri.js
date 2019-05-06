var axios = require("axios");
require("dotenv").config();
var moment = require("./moment.js");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
//console.log("spotify is " + keys.spotify);
//console.log("spotify.id is " + keys.spotify.id);
//console.log("spotify.secret is " + keys.spotify.secret);

var choice = process.argv[2];
var identifier = process.argv.slice(3).join(" ");

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
      for (var i = 0; i < response.data.length; i++){
      console.log(response.data[i].venue.name);
      console.log(response.data[i].venue.city +", "+ response.data[i].venue.country);
      var concertDate = response.data[i].datetime;
      console.log("Concert date is " + moment(concertDate).format("MMMM Do YYYY"));
      console.log("");
      }
    }
      )
  }
function spotifySong(){
       spotify.search({ type:'track', query: identifier}).then(function(response)
       {var responseData = response.tracks.items;
        //console.log("JSON OBJECT IS " + JSON.stringify(responseData[0]));
        dataArray =["The artist is " + responseData[0].artists[0].name,
        " The title is "+ responseData[0].name,
        " The album name is "+ responseData[0].album.name,
        " The title is "+ responseData[0].name,
        " The preview Link: " + responseData[0].preview_url,
       ].join("\n\n");

        console.log(dataArray);
       });

/*.catch(function(error) {
  console.log("keys.id is "+keys.spotify.id);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an object that comes back with details pertaining to the error that occurred.
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
});*/
}



