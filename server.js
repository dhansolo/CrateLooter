'use strict';

//Foundation Modules
var express = require('express');
var morgan = require('morgan');
var handlebars = require('handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis');
var passport = require('passport');
var spotifyStrategy = require('passport-spotify').Strategy;
var spotifyConfig = require('./secret/spotify-auth.json');

//Database Modules
var dbConfig = require('./secret/config-mongo.json')
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var SpotifyUser = require('./models/SpotifyUser.js');

//Spotify Passport
var spotifyStrat = new spotifyStrategy({
        clientID: spotifyConfig.clientID,
        clientSecret: spotifyConfig.clientSecret,
        callbackURL: spotifyConfig.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            console.log(profile);
            return done(null, profile);
        });
    });

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

passport.use(spotifyStrat);

passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
})

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/spotify', passport.authenticate('spotify'));
app.get('/auth/spotify/callback', passport.authenticate('spotify'), function(req, res) {
    console.log('authenticated');
    res.redirect('/secure.html')
});

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    next();
})

app.use(express.static(__dirname + '/secure'));

app.listen(8080, function() {
    console.log('server is listening');
})

/*
if(user) {
    console.log('exists');
    return done(err, user);
} else {
    console.log('who dis');
    var newSpotifyUser = new SpotifyUser();
    newSpotifyUser.spotify.id = profile.id;
    newSpotifyUser.spotify.token = accessToken;
    newSpotifyUser.method = 'spotify';
    newSpotifyUser.save(function(err) {
        if(err) {
            throw err;
        }
        return done(null, newSpotifyUser);
    });
}
*/