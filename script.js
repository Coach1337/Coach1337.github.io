(() => {
  const url = new URL(window.location)
  const vid = url.searchParams.get('v') ?? 'NAo38Q9c4xA'
  url.searchParams.delete('v')
  const embedUrl = new URL(`https://www.youtube.com/embed/${vid}?${url.searchParams.toString()}`)
  document.querySelector('iframe').src = embedUrl.href
})()

window.addEventListener('message', function(event) {
  if (event.data.message == "volume") {
    setVolume(event.data.volume)
  } else if (event.data.message == "unMute") {
    unmuteVideo()
  };
});

var player;
var iframe = document.getElementById('youtube-player');
var firstLoad = true;

// Funkcja do ustawiania głośności
function setVolume(volume) {
    if (player) {
        player.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'setVolume',
            args: [volume]
        }), '*');
    }
}

function unmuteVideo() {
    if (player) {
        player.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'unMute'
        }), '*');
    }
}

// Nasłuchiwanie na komunikaty z iframe
window.addEventListener('message', function(event) {
    if (event.data && firstLoad) {
        var data = JSON.parse(event.data);
        if (data.event === 'onReady') {
            player = iframe;
            firstLoad = false;
        }
    }
});

// Wysyłanie komunikatu do iframe aby zainicjalizować API
iframe.onload = function() {
    iframe.contentWindow.postMessage(JSON.stringify({
        event: 'listening'
    }), '*');
};

// Dodanie skryptu YouTube IFrame API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Funkcja YouTube API ready
function onYouTubeIframeAPIReady() {
    // Inicjalizacja nie jest potrzebna, ponieważ działamy z istniejącym iframe
}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
