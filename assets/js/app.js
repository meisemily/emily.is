// @codekit-prepend "_secrets.js";

function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
}

$(document).ready(function() {
  $.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&period=1month&user=leeladj&api_key=' + Secrets.lastfm_api + '&format=json&callback=?',
    function (data) {
      var chart = data.topalbums.album;
      var img;

      // Large images only for large browsers
      for (var i = 0 ; i < Math.min(30,chart.length); i++){
        if ($(window).width() > 700) {
          img = chart[i].image[3]['#text'];
        } else {
          img = chart[i].image[2]['#text'];
        }

        if (img.length < 1) {
          img = '/assets/images/album_placeholder.png';
        }

        // Links only for non-touch devices
        if (isTouchDevice()) {
          $('#lastfm').append("<li><span title='" + chart[i].artist.name + " - " + chart[i].name + "'><img src='" + img + "'></span></li>");
        } else {
          $('#lastfm').append("<li><a href='" + chart[i].url + "' title='" + chart[i].artist.name + " - " + chart[i].name + "'><img src='" + img + "'></a></li>");
        }
      }

      $('#lastfm img').each(function(i) {
        $(this).load(function() {
          if ($('body').hasClass('loading')) {
            $('body').removeClass('loading');
          }
          $(this).delay(i * 50).fadeTo('slow', 0.2);
        });
      });
    }
  ).fail(function() {
    if ($('body').hasClass('loading')) {
      $('body').addClass('fail');
    }
  });
});
