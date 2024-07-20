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
