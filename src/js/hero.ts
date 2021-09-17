import Typewriter from 'typewriter-effect/dist/core';
import anime from 'animejs/lib/anime.es.js';

const typingCommonOptions = {
  loop: false,
  delay: 75,
  autoStart: false,
};

const heroSectionTyping = new Typewriter('#typingAnimation', typingCommonOptions);

heroSectionTyping
  .pauseFor(1000)
  .typeString('Hello')
  .pauseFor(500)
  .deleteAll()
  .typeString("I'm a Frontend Engineer")
  .pauseFor(500)
  .typeString('<br/>Welcome to my site.')
  .callFunction(() => {
    const navigationTyping = [
      new Typewriter('.header__nav--item.option-1', typingCommonOptions),
      new Typewriter('.header__nav--item.option-2', typingCommonOptions),
      new Typewriter('.header__nav--item.option-3', typingCommonOptions),
    ];

    navigationTyping[0].typeString('Skills').start();
    navigationTyping[1].typeString('Resume').start();
    navigationTyping[2]
      .typeString('Projects')
      .callFunction(() => {
        anime({
          targets: '.chevron_container',
          opacity: [0, 1],
          duration: 1000,
          direction: 'normal',
          easing: 'easeInOutSine',
          delay: 500,
          autoplay: true,
        });
      })
      .start();
  })
  .start();
