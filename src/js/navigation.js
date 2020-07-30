import anime from 'animejs/lib/anime.es.js';

// Setting navigation click buttons
const navBarDestop = document.querySelector('nav');
const aboutSection = document.querySelector('#about');
const secondSection = document.querySelector('#skills');
const thirdSection = document.querySelector('#resume');
const fourthSection = document.querySelector('#projects');
const scrollElement =
  window.document.scrollingElement ||
  window.document.body ||
  window.document.documentElement;

document.querySelector('.chevron_container').addEventListener('click', (e) => {
  e.preventDefault();
  anime({
    targets: scrollElement,
    scrollTop:
      aboutSection.getBoundingClientRect().top -
      navBarDestop.getBoundingClientRect().height +
      window.scrollY,
    duration: 700,
    easing: 'easeOutQuad',
  });
});

document.querySelectorAll('.option-0').forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    anime({
      targets: scrollElement,
      scrollTop: 0,
      duration: 700,
      easing: 'easeOutQuad',
    });
  });
});

document.querySelectorAll('.option-1').forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    anime({
      targets: scrollElement,
      scrollTop:
        secondSection.getBoundingClientRect().top -
        navBarDestop.getBoundingClientRect().height +
        window.scrollY,
      duration: 700,
      easing: 'easeOutQuad',
    });
  });
});

document.querySelectorAll('.option-2').forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    anime({
      targets: scrollElement,
      scrollTop:
        thirdSection.getBoundingClientRect().top -
        navBarDestop.getBoundingClientRect().height +
        window.scrollY,
      duration: 700,
      easing: 'easeOutQuad',
    });
  });
});

document.querySelectorAll('.option-3').forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    anime({
      targets: scrollElement,
      scrollTop:
        fourthSection.getBoundingClientRect().top -
        navBarDestop.getBoundingClientRect().height +
        window.scrollY,
      duration: 700,
      easing: 'easeOutQuad',
    });
  });
});

// Nav bar fading animation on scroll
const navBarAnimation = anime({
  targets: navBarDestop,
  opacity: {
    value: [0, 1],
  },
  zIndex: {
    value: [-2, 2],
    easing: 'easeOutSine',
    round: true,
  },
  easing: 'easeInOutSine',
  direction: 'normal',
  autoplay: false,
  duration: 3000,
});

const mobileNavFade = anime({
  targets: '.mobileNav',
  top: ['110%', '85%'],
  opacity: [0, 1],
  direction: 'normal',
  duration: 300,
  easing: 'easeInOutSine',
  autoplay: false,
});

// On Scroll event
window.addEventListener('scroll', () => {
  const { height } = navBarDestop.getBoundingClientRect();
  const { top } = aboutSection.getBoundingClientRect();
  const { top: top2 } = secondSection.getBoundingClientRect();
  const animStart = height * 3;
  const animEnd = height;
  const mobileAnimStart = window.innerHeight * 0.95;
  const mobileAnimEnd = window.innerHeight * 0.7;

  // Logic desktop nav fading animation on scroll threshold
  if (top <= animStart && top >= animEnd) {
    navBarAnimation.seek(
      ((animStart - top) / (animStart - animEnd)) * navBarAnimation.duration
    );
  } else if (top > animStart && navBarAnimation.progress !== 0) {
    navBarAnimation.seek(0);
  } else if (top < animEnd && navBarAnimation.progress !== 100) {
    navBarAnimation.seek(navBarAnimation.duration);
  } else {
    //Nothing
  }

  // // logic for mobile nav fading on scroll threshold
  // if (top2 <= mobileAnimStart && top2 >= mobileAnimEnd) {
  // 	mobileNavFade.seek(  ((mobileAnimStart - top2)/(mobileAnimStart - mobileAnimEnd))  * mobileNavFade.duration);
  // }
  // else if (top2 > mobileAnimStart && mobileNavFade.progress !== 0) {
  // 	mobileNavFade.seek(0);
  // }
  // else if (top2 < mobileAnimEnd && mobileNavFade.progress !== 100) {
  // 	mobileNavFade.seek(mobileNavFade.duration);
  // }
  // else {
  // 	//Nothing
  // }
});

const mobileNav = anime.timeline({
  targets: '.mobileNav__item',
  easing: 'easeInOutSine',
  direction: 'normal',
  autoplay: false,
});

mobileNav.add({
  top: anime.stagger(['-100%', '80%'], { easing: 'easeInSine' }),
  left: anime.stagger(['50%', '-120%'], { easing: 'easeOutSine' }),
  opacity: [0, 1],
  duration: 500,
});

mobileNav.add(
  {
    targets: '.mobileNav__burger',
    rotate: (el, i, len) => {
      return [45, 0, -45][i];
    },
    top: '50%',
    opacity: (el, i, len) => {
      if (i % 2 === 0) return 1;
      return 0;
    },
    duration: 200,
  },
  0
);

mobileNav.add(
  {
    targets: '.mobileNav',
    width: '70px',
    height: '70px',
    duration: 200,
  },
  0
);

document.querySelector('.mobileNav').addEventListener('click', (e) => {
  e.preventDefault();
  if (mobileNav.progress === 0) {
    if (mobileNav.reversed) {
      mobileNav.reverse();
    }
    mobileNav.play();
  } else if (mobileNav.progress === 100) {
    if (!mobileNav.reversed) {
      mobileNav.reverse();
      mobileNav.completed = false; // Work around to stop flickering
    }
    mobileNav.play();
  } else {
    mobileNav.reverse();
  }
});
