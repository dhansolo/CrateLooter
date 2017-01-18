create database if not exists SpotifyUsers character set='UTF8';

use SpotifyUsers;

create or replace table spotifyUser (
    id int not null primary key auto_increment,
    spotifyid int not null,
    name string not null,
    url string not null,
    uri string not null
)