document.documentElement.classList.add('js-enabled');

// Wi-Fi/network indicator: reports the browser's online/offline state.
// Browsers do not expose Wi-Fi radio control to ordinary websites.
const networkIndicator = document.getElementById('networkIndicator');
const networkLabel = document.getElementById('networkLabel');
function updateNetworkState() {
  if (!networkIndicator || !networkLabel) return;
  const online = navigator.onLine;
  networkIndicator.classList.toggle('is-online', online);
  networkIndicator.classList.toggle('is-offline', !online);
  networkLabel.textContent = online ? 'NETWORK ONLINE' : 'NETWORK OFFLINE';
  networkIndicator.title = online
    ? 'El navegador informa que hay conexión. Esto no garantiza acceso a cada sitio.'
    : 'El navegador informa que no hay conexión.';
}
window.addEventListener('online', updateNetworkState);
window.addEventListener('offline', updateNetworkState);
updateNetworkState();

// Christy FM compact random playlist. The files are expected at assets/audio/1.mp3
// and assets/audio/2.mp3. Autoplay with sound is generally blocked until user gesture.
const player = document.querySelector('.retro-audio');
const toggle = document.getElementById('radioToggle');
const next = document.getElementById('radioNext');
const trackLabel = document.getElementById('compactTrack');
const audioStatus = document.getElementById('audioStatus');
const tracks = [
  { src: 'assets/audio/1.mp3', label: 'TRACK 01' },
  { src: 'assets/audio/2.mp3', label: 'TRACK 02' }
];
let lastTrack = -1;
let currentTrack = -1;
let triedAutoplay = false;

function setAudioStatus(message) {
  if (audioStatus) audioStatus.textContent = message;
}
function chooseRandomTrack() {
  if (tracks.length < 2) return 0;
  let index;
  do { index = Math.floor(Math.random() * tracks.length); } while (index === lastTrack);
  lastTrack = index;
  return index;
}
async function playRandomTrack(userInitiated = false) {
  if (!player || !tracks.length) return;
  currentTrack = chooseRandomTrack();
  const track = tracks[currentTrack];
  player.src = track.src;
  player.load();
  if (trackLabel) trackLabel.textContent = track.label + ' — RANDOM';
  setAudioStatus('LOADING…');
  try {
    await player.play();
    if (toggle) { toggle.textContent = 'Ⅱ'; toggle.setAttribute('aria-label', 'Pausar audio'); }
    setAudioStatus('PLAYING ♪');
  } catch (error) {
    if (toggle) { toggle.textContent = '▶'; toggle.setAttribute('aria-label', 'Iniciar audio'); }
    setAudioStatus(userInitiated ? 'CHECK AUDIO FILE' : 'PRESS ▶ TO PLAY');
  }
}
if (player) {
  player.addEventListener('ended', () => playRandomTrack(false));
  player.addEventListener('error', () => {
    setAudioStatus('AUDIO NOT FOUND');
    if (trackLabel) trackLabel.textContent = 'UPLOAD 1.mp3 + 2.mp3';
  });
  player.addEventListener('play', () => {
    if (toggle) toggle.textContent = 'Ⅱ';
  });
  player.addEventListener('pause', () => {
    if (toggle) toggle.textContent = '▶';
  });
}
if (toggle) toggle.addEventListener('click', async () => {
  if (!player) return;
  if (player.paused && player.src) {
    try {
      await player.play();
      setAudioStatus('PLAYING ♪');
    } catch (error) { setAudioStatus('CHECK AUDIO FILE'); }
  } else if (player.paused) {
    await playRandomTrack(true);
  } else {
    player.pause();
    setAudioStatus('PAUSED');
  }
});
if (next) next.addEventListener('click', () => playRandomTrack(true));

// Attempt autoplay once. If the browser blocks it, the compact bar stays unobtrusive
// and its play button is available; no deceptive claim of guaranteed autoplay.
if (player && !triedAutoplay) {
  triedAutoplay = true;
  playRandomTrack(false);
}
