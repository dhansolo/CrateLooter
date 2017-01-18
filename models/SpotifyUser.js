'use strict';

var mongoose = require('mongoose');
var bluebird = require('bluebird');
var bcrypt = bluebird.promisifyAll(require('bcrypt-nodejs'));

var schema = new mongoose.Schema({
    spotify: {
        spotifyid: Number,
        name: String,
        url: String,
        uri: String
    },
    method: String
});

schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('SpotifyUser', schema);