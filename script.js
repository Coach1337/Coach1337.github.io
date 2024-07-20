(() => {
  const url = new URL(window.location)
  const vid = url.searchParams.get('v') ?? 'NAo38Q9c4xA'
  url.searchParams.delete('v')
  const embedUrl = new URL(`https://www.youtube.com/embed/${vid}?${url.searchParams.toString()}`)
  document.querySelector('iframe').src = embedUrl.href
})()

window.addEventListener('message', function(event) {
  console.log(event.data.message);
});
