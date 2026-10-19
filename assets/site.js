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

// Christy FM: discover every supported audio file published in assets/audio.
// GitHub Pages is static, so the public GitHub Contents API supplies the folder listing.
const player = document.querySelector('.retro-audio');
const toggle = document.getElementById('radioToggle');
const next = document.getElementById('radioNext');
const trackLabel = document.getElementById('compactTrack');
const audioStatus = document.getElementById('audioStatus');
const AUDIO_FOLDER_API = 'https://api.github.com/repos/christiandroid20/HP-Hackbook-pro-15-ay010la/contents/assets/audio';
let tracks = [];
let lastTrack = -1;
let currentTrack = -1;
let playlistReady = false;

function setAudioStatus(message) {
  if (audioStatus) audioStatus.textContent = message;
}
function chooseRandomTrack() {
  if (!tracks.length) return -1;
  if (tracks.length === 1) { lastTrack = 0; return 0; }
  let index;
  do { index = Math.floor(Math.random() * tracks.length); } while (index === lastTrack);
  lastTrack = index;
  return index;
}
async function loadAudioFolder() {
  if (!player) return;
  setAudioStatus('SCANNING AUDIO…');
  try {
    const response = await fetch(AUDIO_FOLDER_API, {
      headers: { Accept: 'application/vnd.github+json' },
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Audio folder unavailable');
    const files = await response.json();
    const supported = /\\.(mp3|ogg|oga|wav|m4a|aac|opus|flac|webm)$/i;
    tracks = files
      .filter(file => file.type === 'file' && supported.test(file.name) && file.download_url)
      .map(file => ({ src: file.download_url, label: file.name }));
    playlistReady = true;
    if (!tracks.length) {
      if (trackLabel) trackLabel.textContent = 'NO AUDIO FILES';
      setAudioStatus('ADD FILES TO assets/audio');
      if (toggle) toggle.disabled = true;
      if (next) next.disabled = true;
      return;
    }
    if (toggle) toggle.disabled = false;
    if (next) next.disabled = false;
    if (trackLabel) trackLabel.textContent = tracks.length + ' AUDIO FILE' + (tracks.length === 1 ? '' : 'S') + ' · RANDOM';
    setAudioStatus('PLAYLIST READY');
    // Attempt autoplay; browsers may require a user gesture before audible playback.
    await playRandomTrack(false);
  } catch (error) {
    if (trackLabel) trackLabel.textContent = 'AUDIO FOLDER UNAVAILABLE';
    setAudioStatus('CHECK CONNECTION / FOLDER');
    if (toggle) toggle.disabled = true;
    if (next) next.disabled = true;
  }
}
async function playRandomTrack(userInitiated = false) {
  if (!player || !tracks.length) return;
  currentTrack = chooseRandomTrack();
  const track = tracks[currentTrack];
  player.src = track.src;
  player.load();
  if (trackLabel) trackLabel.textContent = track.label;
  setAudioStatus('LOADING…');
  try {
    await player.play();
    if (toggle) { toggle.textContent = 'Ⅱ'; toggle.setAttribute('aria-label', 'Pausar audio'); }
    setAudioStatus('PLAYING ♪');
  } catch (error) {
    if (toggle) { toggle.textContent = '▶'; toggle.setAttribute('aria-label', 'Iniciar audio'); }
    setAudioStatus(userInitiated ? 'CANNOT PLAY FILE' : 'PRESS ▶ TO PLAY');
  }
}
if (player) {
  player.addEventListener('ended', () => playRandomTrack(false));
  player.addEventListener('error', () => {
    setAudioStatus('CANNOT READ AUDIO');
  });
  player.addEventListener('play', () => {
    if (toggle) { toggle.textContent = 'Ⅱ'; toggle.setAttribute('aria-label', 'Pausar audio'); }
  });
  player.addEventListener('pause', () => {
    if (toggle) { toggle.textContent = '▶'; toggle.setAttribute('aria-label', 'Reproducir audio'); }
  });
}
if (toggle) toggle.addEventListener('click', async () => {
  if (!player) return;
  if (player.paused && player.src) {
    try {
      await player.play();
      setAudioStatus('PLAYING ♪');
    } catch (error) { setAudioStatus('CANNOT PLAY FILE'); }
  } else if (player.paused && playlistReady && tracks.length) {
    await playRandomTrack(true);
  } else if (!player.paused) {
    player.pause();
    setAudioStatus('PAUSED');
  }
});
if (next) next.addEventListener('click', () => playRandomTrack(true));
loadAudioFolder();
