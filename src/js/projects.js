import anime from 'animejs/lib/anime.es.js';

const projectContainers = document.querySelectorAll('.project');
const isMobile = window.matchMedia('(max-width: 900px)');

const createAnimationTimeline = (project) => {
  const projectAnimation = anime.timeline({
    easing: 'spring(1, 100, 10, 0)',
    duration: 1500,
    direction: 'forward',
    loop: false,
    autoplay: false,
    delay: 200,
  });

  projectAnimation.add({
    targets: project.querySelector('.project__img'),
    easing: 'easeOutSine',
    scale: [isMobile.matches ? 1.2 : 1.5, 0.8],
    rotateX: [70, 70],
    rotateZ: [-60, -60],
    translateX: (el, i) => {
      let width = parseInt(
        window.getComputedStyle(el).getPropertyValue('width'),
      );

      let output = [-0.4, -0.4].map((item) => Math.round(item * width));

      return output;
    },
    translateY: (el, i) => {
      let height = parseInt(
        window.getComputedStyle(el).getPropertyValue('height'),
      );
      return [isMobile.matches ? 0.44 : 1.1, 0].map((item) =>
        Math.round(item * height),
      );
    },
    translateZ: (el, i) => {
      return [isMobile.matches ? 70 : 130, isMobile.matches ? 70 : 130];
    },
    duration: 600,
    boxShadow: [
      '-80px 60px 15px 5px rgba(0, 0, 0, 0.4)',
      '-40px 40px 15px 5px rgba(0, 0, 0, 0.4)',
    ],
  });

  projectAnimation.add(
    {
      targets: project.querySelector('.project__description'),
      opacity: [0, 1],
      translateY: [100, 0],
      duration: 1000,
    },
    400,
  );

  projectAnimation.add(
    {
      targets: project.querySelector('.project__img'),
      easing: 'easeInOutSine',
      scale: [0.8, 1],
      rotateX: [70, 0],
      rotateZ: [-60, 0],
      translateX: (el, i) => {
        let width = parseInt(
          window.getComputedStyle(el).getPropertyValue('width'),
        );

        return [-0.4, 0].map((item) => Math.round(item * width));
      },
      translateY: (el, i) => {
        let height = parseInt(
          window.getComputedStyle(el).getPropertyValue('height'),
        );
        return [0, 0].map((item) => Math.round(item * height));
      },
      translateZ: (el, i) => {
        return [isMobile.matches ? 70 : 130, 0];
      },
      duration: 1000,
      boxShadow: [
        '-40px 30px 15px 5px rgba(0, 0, 0, 0.4)',
        '0px 2px 10px 3px rgba(0, 0, 0, 0.5)',
      ],
    },
    600,
  );

  projectAnimation.add(
    {
      targets: project.querySelectorAll('.listItem_checkOuter'),
      strokeDashoffset: [anime.setDashoffset, 0],
      delay: function (el, i) {
        return i * 250;
      },
    },
    1500,
  );

  projectAnimation.add(
    {
      targets: project.querySelectorAll('.listItem_checkInner'),
      strokeDashoffset: [anime.setDashoffset, 0],
      strokeWidth: {
        value: [0, 124],
        duration: 1500,
      },
      delay: function (el, i) {
        return i * 250;
      },
    },
    1800,
  );

  projectAnimation.add(
    {
      targets: project.querySelectorAll('.listItem_text'),
      translateX: [200, 0],
      opacity: [0, 1],
      delay: anime.stagger(250),
    },
    1100,
  );

  projectAnimation.add(
    {
      targets: project.querySelectorAll('a.btn'),
      scale: [0.2, 1],
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(250),
    },
    2500,
  );

  return projectAnimation;
};

projectContainers.forEach((project) => {
  let onetimeFlag = false;
  let prevScrollPos = window.scrollY;
  let directionY = 'down';
  const animationTimeline = createAnimationTimeline(project);
  window.addEventListener('scroll', (event) => {
    const { height, top } = project.getBoundingClientRect();
    const ratioOfProjectShown = (window.innerHeight - top) / height;
    directionY = window.scrollY > prevScrollPos ? 'down' : 'up';
    prevScrollPos = window.scrollY;

    if (ratioOfProjectShown > (isMobile.matches ? 0.7 : 1)) {
      if (directionY === 'down' && !onetimeFlag) {
        if (!animationTimeline.completed && animationTimeline.progress === 0)
          animationTimeline.play();

        onetimeFlag = true;
      }

      if (directionY === 'up' && onetimeFlag) {
        onetimeFlag = false;
      }
    }
  });
});
