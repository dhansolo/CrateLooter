'use strict'

// find template and compile it
window.onload = function() {
    var templateSource1 = document.getElementById('results-template1').innerHTML;
    var template1 = Handlebars.compile(templateSource1);
    var resultsPlaceholder1 = document.getElementById('results1');

    var templateSource2 = document.getElementById('results-template2').innerHTML;
    var template2 = Handlebars.compile(templateSource2);
    var resultsPlaceholder2 = document.getElementById('results2');

    //GET search results from query string
    var search = function (query) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'album,artist,track',
            },
            success: function (response) {
                console.log(response);
                resultsPlaceholder1.innerHTML = template1(response);
            }
        });
    };

    //GET album details
    var details = function(albumId) {
        $.ajax({
            url: 'https://api.spotify.com/v1/albums/' + albumId,
            success: function(response) {
                console.log(response);
                resultsPlaceholder2.innerHTML = template2(response);
            }
        });
    };

    //When you press 'enter' for search
    document.getElementById('search-form').addEventListener('submit', function (e) {
        e.preventDefault();
        search(document.getElementById('query').value);
    }, false);    

    //When you click the actual button
    document.getElementById('search-form').addEventListener('click', function (e) {
        e.preventDefault();
        search(document.getElementById('query').value);
    }, false);    

    //Get details when you click on an album cover
    document.getElementById('cover').addEventListener('click', function (e) {
        //e.preventDefault();
        var target = e.target;
        details(target.getAttribute('album-id'));
    }, false);    
}