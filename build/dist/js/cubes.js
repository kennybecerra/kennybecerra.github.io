import { removeClass, addClass } from './util.js';

/**
 * CUBE ANIMATIONS
 */

const allCubes = document.querySelectorAll('.cube');
const allControls = document.querySelectorAll('.control_button');

let cubeSides = [
  [
    'show-front',
    'show-left',
    'show-top',
    'show-right',
    'show-bottom',
    'show-back',
  ],
  [
    'show-front',
    'show-top',
    'show-right',
    'show-left',
    'show-bottom',
    'show-back',
  ],
];

allControls.forEach((controlButton, buttonIndex) => {
  controlButton.addEventListener('click', (e) => {
    e.preventDefault();

    //remove active class from all controls buttons then add active class to current button for icon animation
    allControls.forEach((control) => {
      removeClass(control, 'active');
    });
    addClass(e.currentTarget, 'active');

    //iterate through all cubes, and update which side needs to be shown for each cube
    allCubes.forEach((cube, cubeIndex) => {
      let removeArray = cubeSides[cubeIndex].filter(
        (cubeside, index) => index !== buttonIndex,
      );

      removeArray.forEach((removeString) => {
        removeClass(cube, removeString);
      });
      addClass(cube, cubeSides[cubeIndex][buttonIndex]);
    });
  });
});
