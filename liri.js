var dotenv = require('dotenv');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');


//import dotenv from 'dotenv';
dotenv.config();
//require("dotenv").config();
 
var keys = require("./keys")
var spotify = new Spotify(keys.spotify);

function pickTwitter() {
    var client = new Twitter(keys.twitter);

    // node liri.js my-tweets
    var params = {screen_name: 'noora_kochi'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //console.log(tweets);
            //console.log(tweets[0].text);
            for (var tweet of tweets) {
                console.log(tweet.text + '\n');
            }
        }
    
    });
}

function spotifyThis(song) {
  spotify.search({type: 'track', query: song}, function(error, data) {
    if (!error) {
      for (var i = 2; i < data.tracks.items.length; i++) {
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");
      }
    } else {
      console.log('Error occurred.');
    }

  });
}

function movieThis(movie) {
    request('http://www.omdbapi.com/?apikey=trilogy&t=' + movie, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
}

function liri(pick, arg) {
    console.log('pick', pick);
    console.log('arg', arg);
    if (pick === 'my-tweets') {
        pickTwitter();
    } else if (pick === 'spotify-this') {
        spotifyThis(arg);
    } else if (pick === 'movie-this') {
        movieThis(arg);
    }
}


liri(process.argv[2], process.argv[3]);
