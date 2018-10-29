require('../css/app.css');
import { MorphSVGPlugin } from './MorphSVGPlugin';

const videoPlay = (stop = false) => {
  const video = document.getElementById('video');
  if (video.paused) {
    const width = window.innerWidth > 800 ? 800 : window.innerWidth - 20;
    TweenMax.to(video, .5, { width: width, borderRadius: 10 });
    TweenMax.to('#play', .25, { morphSVG: "#stop", onComplete: () => {
      TweenMax.to('#playButton', .25, { y: -(width / 4.75), x: (width / 2.5) });
    }});

    video.play();
  } else {
    TweenMax.to('#play', .5, { morphSVG: "#staticPlay" });
    TweenMax.to(video, .5, { width: 100, borderRadius: 100 });
    TweenMax.to('#playButton', .25, { y: -18, x: -12 });
    video.pause();
  }
}

const navClick = (nav) => {
  if (nav.classList.value.indexOf('expanded') > -1) {
    nav.classList.remove('expanded');
  } else {
    nav.classList.add('expanded');
  }
}


(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const stopBUtton = document.getElementById('stopButton');
    const mobileNav = document.getElementById('mobileNav');
    const nav = document.getElementById('mobile-nav');
    window.addEventListener('click', e => {
      if(e.target.classList.value === 'nav-link') {
        e.preventDefault();
        const section = document.querySelector(e.target.hash);
        const rect = section.getBoundingClientRect();
        let topPos = (rect.top + window.scrollY);
        if (window.innerWidth > 600) {
          topPos = topPos - ((window.innerHeight / 2) - (rect.height / 2));
        } else {
          const rect = mobileNav.getBoundingClientRect();
          topPos = topPos - rect.height;
          nav.classList.remove('expanded');
        }
        window.scroll({
          top: topPos,
          left: 0,
          behavior: 'smooth'
        });
      }
    });



    mobileNav.onclick = () => navClick(nav);
    playButton.onclick = () => videoPlay(playButton);
  }, false);
})();
