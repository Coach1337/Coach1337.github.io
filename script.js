(() => {
  const url = new URL(window.location)
  const vid = url.searchParams.get('v') ?? 'NAo38Q9c4xA'
  url.searchParams.delete('v')
  const embedUrl = new URL(`https://www.youtube.com/embed/${vid}?${url.searchParams.toString()}`)
  document.querySelector('iframe').src = embedUrl.href
})()

window.addEventListener('message', function(event) {
  if (event.data.message == "volume") {
    console.log('received volume message with value: '+event.data.volume)
    setVolume(event.data.volume)
  };
});

var player;
var iframe = document.getElementById('youtube-player');

// Funkcja do ustawiania głośności
function setVolume(volume) {
    console.log('set volume triggered');
    if (player) {
        console.log('player is not null');
        player.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'setVolume',
            args: [volume]
        }), '*');
    }
}

// Nasłuchiwanie na komunikaty z iframe
window.addEventListener('message', function (event) {
    var data = JSON.parse(event.data);
    console.log(event.data);
    if (data.event === 'onReady') {
        console.log('onReady triggered');
        player = iframe;
    }
});

// Wysyłanie komunikatu do iframe aby zainicjalizować API
iframe.onload = function () {
    console.log('listening post message');
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
    console.log('on ytiframe ready');
  
    // Inicjalizacja nie jest potrzebna, ponieważ działamy z istniejącym iframe
}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
