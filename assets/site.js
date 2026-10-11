document.documentElement.classList.add('js-enabled');
// La página y los enlaces de documentación siguen funcionando sin JavaScript.
const footer = document.querySelector('footer span');
if (footer) footer.setAttribute('title', 'Sitio del proyecto HP HackBook');