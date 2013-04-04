$(document).ready(function(){

    $('.scroll').click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    });


    // Last.FM
    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&period=7day&user=leeladj&api_key=20b6cd99a92e234d7619bb34e99faf3a&format=json&callback=?',
        function (data) {
            var chart = data.topalbums.album;
            var img;

            for (var i = 0 ; i < Math.min(8,chart.length); i++){
                img = chart[i].image[3]['#text'];

                // if (img.search(/noimage/i) > 1) {
                //     img = 'assets/img/lastfm.png';
                // }

                $('#lastfm').append(
                     "<li><a href='" + chart[i].url + "' title='" + chart[i].artist.name + " - " + chart[i].name + "'><img src='" + img + "'></a></li>"
                );
            }

            $('#lastfm').removeClass('loading');
        }
    );

});