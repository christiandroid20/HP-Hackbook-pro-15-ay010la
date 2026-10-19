document.documentElement.classList.add('js-enabled');
// La página y los enlaces de documentación siguen funcionando sin JavaScript.
const footer = document.querySelector('footer span');
if (footer) footer.setAttribute('title', 'Sitio del proyecto HP HackBook');

// Christy FM: selección explícita de los dos audios previstos.
const player = document.querySelector('.retro-audio');
const trackButtons = document.querySelectorAll('.track-button');
const audioStatus = document.querySelector('.audio-status');
trackButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!player) return;
    const source = button.dataset.track;
    trackButtons.forEach((item) => item.classList.toggle('active', item === button));
    player.src = source;
    player.load();
    const label = button.querySelectorAll('span')[1]?.textContent || 'la pista seleccionada';
    if (audioStatus) audioStatus.textContent = '♪ Cargando ' + label + '…';
    player.play().then(() => {
      if (audioStatus) audioStatus.textContent = '♪ Reproduciendo ' + label;
    }).catch(() => {
      if (audioStatus) audioStatus.textContent = '♪ ' + label + ': pulsa reproducir o comprueba que el archivo esté publicado en assets/audio/.';
    });
  });
});
if (player) {
  player.addEventListener('error', () => {
    if (audioStatus) audioStatus.textContent = '♪ Aún no se encuentra esta pista. Comprueba que 1.mp3 o 2.mp3 esté en assets/audio/.';
  });
  player.addEventListener('ended', () => {
    if (audioStatus) audioStatus.textContent = '♪ Pista terminada. Puedes elegir la otra desde la lista.';
  });
}
