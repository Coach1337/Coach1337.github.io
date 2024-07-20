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
    let audio_iframe = document.querySelector('iframe');
    widget = SC.Widget(audio_iframe);
    widget.setVolume(event.data.volume);
  };
});

function onYouTubeIframeAPIReady() {
    var player;
    var iframe = document.querySelector('iframe');

    // Funkcja do ustawiania głośności
    window.setVolume = function (volume) {
        if (player) {
            player.postMessage(JSON.stringify({
                event: 'command',
                func: 'setVolume',
                args: [volume]
            }), '*');
        }
    }

    // Nasłuchiwanie na komunikaty z iframe
    window.addEventListener('message', function (event) {
        if (event.data && event.data.event === 'onReady') {
            player = iframe.contentWindow;
        }
    });

    // Wysyłanie komunikatu do iframe aby zainicjalizować API
    iframe.contentWindow.postMessage(JSON.stringify({
        event: 'listening'
    }), '*');
}

// Dodanie skryptu YouTube IFrame API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Funkcja YouTube API ready
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
