'use strict';

var mongoose = require('mongoose');
var dbConfig = require('./secret/config-mongo.json');

var spotifyUserSchema = new mongoose.Schema({

});

var SpotifyUser = mongoose.model('SpotifyUser', spotifyUserSchema);

mongoose.connect(dbConfig.url);
mongoose.connection.on('error', function(err) {
    console.error(err);
});