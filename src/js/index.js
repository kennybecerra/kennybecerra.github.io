import normalize from '../scss/vendor/normalize.css';
// import skeleton from "../scss/vendor/skeleton.css";
import style from '../scss/main.scss';
import pdf from '../assets/documents/Kenny_Becerra_Resume.pdf';
import icon from '../assets/images/favicon.ico';
import SmoothScroll from 'smooth-scroll';
import TweenMax from 'TweenMax';
import TimelineMax from 'TimelineMax';
import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import 'debug.addIndicators';

// THIS DEFINES A NATIVE DOM IS READY FUNCTION TO USE SIMILAR TO $(document).ready FROM JQUERY
var domIsReady = (function(domIsReady) {
  var isBrowserIeOrNot = function() {
    return !document.attachEvent || typeof document.attachEvent === 'undefined' ? 'not-ie' : 'ie';
  };

  domIsReady = function(callback) {
    if (callback && typeof callback === 'function') {
      if (isBrowserIeOrNot() !== 'ie') {
        document.addEventListener('DOMContentLoaded', function() {
          return callback();
        });
      } else {
        document.attachEvent('onreadystatechange', function() {
          if (document.readyState === 'complete') {
            return callback();
          }
        });
      }
    } else {
      console.error('The callback is not a function!');
    }
  };

  return domIsReady;
})(domIsReady || {});

// CLASSIE HELPER FUNCTIONS FOR ADDING AND REMOVING CLASSES
(function(window) {
  'use strict';

  // class helper functions from bonzo https://github.com/ded/bonzo

  function classReg(className) {
    return new RegExp('(^|\\s+)' + className + '(\\s+|$)');
  }

  // classList support for class management
  // altho to be fair, the api sucks because it won't accept multiple classes at once
  var hasClass, addClass, removeClass;

  if ('classList' in document.documentElement) {
    hasClass = function(elem, c) {
      return elem.classList.contains(c);
    };
    addClass = function(elem, c) {
      elem.classList.add(c);
    };
    removeClass = function(elem, c) {
      elem.classList.remove(c);
    };
  } else {
    hasClass = function(elem, c) {
      return classReg(c).test(elem.className);
    };
    addClass = function(elem, c) {
      if (!hasClass(elem, c)) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function(elem, c) {
      elem.className = elem.className.replace(classReg(c), ' ');
    };
  }

  function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
  }

  var classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(classie);
  } else {
    // browser global
    window.classie = classie;
  }
})(window);

(function(domIsReady) {
  domIsReady(function() {
    let tl = new TimelineMax(); // animation for desktop Nav
    let tl2 = new TimelineMax(); // Animation for movbile Nav

    const controller = new ScrollMagic.Controller();

    tl.to('.nav', 0.2, { opacity: 1, display: 'block' }, 'Navi');

    tl2.from('.cn-button', 0.5, { opacity: 0, display: 'none', y: '200' }, 'Navi');

    const scene = new ScrollMagic.Scene({
      triggerElement: '#headerfigure',
      triggerHook: 'onLeave'
    })
      .setTween(tl)
      .addTo(controller);

    const scene2 = new ScrollMagic.Scene({
      triggerElement: '#skills',
      triggerHook: 0.5
    })
      .setTween(tl2)
      .addTo(controller);

    // Typing animation functionality with Promises

    $('.option-main')
      .typingAnimation4('write', 'Hello', 18, 1000, 2000, false)
      .then(function() {
        return $('.option-main').typingAnimation4('write', ", I'm Kenny", 18, 0, 2000, false);
      })
      .then(function() {
        return $('.option-main').typingAnimation4('delete', 16, 18, 0, 500, false);
      })
      .then(function() {
        return $('.option-main').typingAnimation4(
          'write',
          'I am a Computer Engineer.',
          18,
          0,
          1000,
          false
        );
      })
      .then(function() {
        return $('.option-main').typingAnimation4('delete', 18, 20, 0, 500, false);
      })
      .then(function() {
        return $('.option-main').typingAnimation4('write', 'Programmer.', 18, 0, 1000, false);
      })
      .then(function() {
        return $('.option-main').typingAnimation4('delete', 11, 20, 500, 0, false);
      })
      .then(function() {
        return $('.option-main').typingAnimation4(
          'write',
          'Frontend Developer.',
          18,
          500,
          2000,
          true
        );
      })
      .then(function() {
        return $('.option-main2').typingAnimation4(
          'write',
          'Welcome to my Website',
          18,
          0,
          3000,
          false
        );
      })
      .then(function() {
        document.getElementById('headerfigure').classList.add('anim-movein');
      });

    // navigation Scrolling

    var scroll = new SmoothScroll();

    document.getElementById('headerfigure').addEventListener('click', function(e) {
      e.preventDefault();

      scroll.animateScroll(
        document.getElementById('skills'),
        document.getElementById('headerfigure'),
        {
          speed: 1200,
          speedAsDuration: false,
          offset: function(a, b) {
            const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

            //console.log(Math.ceil(windowHeight * 0.1));

            if (w >= 900) {
              return Math.ceil(h * 0.1);
            }
            return 0;
          }
        }
      );
    });

    document.getElementById('scrollSkills2').addEventListener('click', function(e) {
      e.preventDefault();

      scroll.animateScroll(
        document.getElementById('skills'),
        document.getElementById('scrollSkills2'),
        {
          speed: 1200,
          speedAsDuration: true,
          offset: function(a, b) {
            const windowHeight =
              window.innerHeight ||
              document.documentElement.clientHeight ||
              document.getElementsByTagName('body')[0].clientHeight;

            return Math.ceil(windowHeight * 0.1);
          }
        }
      );
    });

    document.getElementById('scrollResume2').addEventListener('click', function(e) {
      e.preventDefault();

      scroll.animateScroll(
        document.getElementById('resume'),
        document.getElementById('scrollResume2'),
        {
          speed: 1200,
          speedAsDuration: true,
          offset: function(a, b) {
            const windowHeight =
              window.innerHeight ||
              document.documentElement.clientHeight ||
              document.getElementsByTagName('body')[0].clientHeight;

            return Math.ceil(windowHeight * 0.1);
          }
        }
      );
    });

    document.getElementById('scrollProjects2').addEventListener('click', function(e) {
      e.preventDefault();

      scroll.animateScroll(
        document.getElementById('projects'),
        document.getElementById('scrollProjects2'),
        {
          speed: 1200,
          speedAsDuration: true,
          offset: function(a, b) {
            const windowHeight =
              window.innerHeight ||
              document.documentElement.clientHeight ||
              document.getElementsByTagName('body')[0].clientHeight;

            return Math.ceil(windowHeight * 0.1);
          }
        }
      );
    });

    //Mobile Navigation

    var button = document.getElementById('cn-button'),
      wrapper = document.getElementById('cn-wrapper');

    //open and close menu when the button is clicked
    var open = false;
    button.addEventListener('click', handler, false);

    function handler() {
      if (!open) {
        button.innerHTML = 'X';
        classie.add(wrapper, 'opened-nav');
      } else {
        button.innerHTML = 'Nav';
        classie.remove(wrapper, 'opened-nav');
      }
      open = !open;
    }

    function closeWrapper() {
      classie.remove(wrapper, 'opened-nav');
    }

    document.getElementById('scrollTop').addEventListener('click', function(e) {
      e.preventDefault();

      scroll.animateScroll(0);
      handler();
    });

    document.getElementById('scrollSkills').addEventListener('click', function(e) {
      e.preventDefault();

      scroll.animateScroll(
        document.getElementById('skills'),
        document.getElementById('scrollSkills2'),
        {
          speed: 1200,
          speedAsDuration: true,
          offset: 0
        }
      );
    });

    document.getElementById('scrollResume').addEventListener('click', function(e) {
      e.preventDefault();

      scroll.animateScroll(
        document.getElementById('resume'),
        document.getElementById('scrollResume2'),
        {
          speed: 1200,
          speedAsDuration: true,
          offset: 0
        }
      );
    });

    document.getElementById('scrollProjects').addEventListener('click', function(e) {
      e.preventDefault();

      scroll.animateScroll(
        document.getElementById('projects'),
        document.getElementById('scrollProjects2'),
        {
          speed: 1200,
          speedAsDuration: true,
          offset: 0
        }
      );
    });
  });
})(domIsReady);

/***
 * Jquery like function that takes a single ID or class
 * selector and return a class of MinUtil.  MinUtil is
 * function contrusctor that add functionality to an
 * element.
 *  */

function $(qualifier) {
  function MinUtil2(selector) {
    var element = document.querySelector(selector);
    var requestID = null;

    // Utility function used by animation function callback
    function addClass(ele, cls) {
      if (!hasClass(ele, cls)) ele.className += ' ' + cls;
    }

    function hasClass(ele, cls) {
      if (ele instanceof SVGAElement) {
        console.log('this is an SVG');
        console.log(ele.getAttribute('class'));
      }
      return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    function removeClass(ele, cls) {
      if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
      }
    }

    this.addClass = function(param) {
      if (!hasClass(element, param)) element.className += ' ' + param;
    };
    this.removeClass = function(param) {
      if (hasClass(element, param)) {
        var reg = new RegExp('(\\s|^)' + param + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
      }
    };
    this.typingAnimation = function(setting, textOrNum, speed, delay) {
      var itr = 0;
      var fps = speed;
      var letters;

      if (setting === 'write') {
        letters = textOrNum.split('');
        var max = textOrNum.length;

        element.style.borderRight = '2px solid rgba(255, 255, 255, 0.75)';
        addClass(element, 'blinking');
        setTimeout(() => {
          function addLetter() {
            setTimeout(function() {
              element.innerHTML += letters.shift();
              itr++;

              if (itr < max) {
                requestID = requestAnimationFrame(addLetter);
              } else {
                setTimeout(() => {
                  removeClass(element, 'blinking');
                  element.style.borderRight = '2px solid transparent';
                }, 1500);
              }
            }, 1000 / fps);
          }
          requestID = requestAnimationFrame(addLetter);
        }, delay);
      } else if (setting === 'delete') {
        element.style.borderRight = '2px solid rgba(255, 255, 255, 0.75)';
        addClass(element, 'blinking');
        setTimeout(() => {
          function eraseLetter() {
            setTimeout(function() {
              letters = element.textContent.split('');
              letters.pop();
              element.textContent = letters.join('');
              itr++;

              if (itr < textOrNum) {
                requestID = requestAnimationFrame(eraseLetter);
              } else {
                setTimeout(() => {
                  removeClass(element, 'blinking');
                  element.style.borderRight = '2px solid transparent';
                }, 1500);
              }
            }, 1000 / fps);
          }
          requestID = requestAnimationFrame(eraseLetter);
        }, delay);
      } else {
        console.log('there was an issue with the settings');
      }
    };
    this.typingAnimation2 = function(setting, textOrNum, speed, delay, postDelay, chain) {
      var itr = 0;
      var fps = speed;
      var letters;
      var blinkClass = 'blinking-2';

      if (setting === 'write') {
        letters = textOrNum.split('');
        var max = textOrNum.length;

        //element.style.borderRight =  "2px solid rgba(255, 255, 255, 0.75)";

        addClass(element, blinkClass);
        setTimeout(() => {
          function addLetter() {
            setTimeout(function() {
              element.innerHTML += letters.shift();
              itr++;

              if (itr < max) {
                requestID = requestAnimationFrame(addLetter);
              } else {
                setTimeout(() => {
                  if (!chain) {
                    removeClass(element, blinkClass);
                  }
                  //element.style.borderRight =  "2px solid transparent";
                }, postDelay);
              }
            }, 1000 / fps);
          }
          requestID = requestAnimationFrame(addLetter);
        }, delay);
      } else if (setting === 'delete') {
        //element.style.borderRight =  "2px solid rgba(255, 255, 255, 0.75)";

        addClass(element, blinkClass);
        setTimeout(() => {
          function eraseLetter() {
            setTimeout(function() {
              letters = element.textContent.split('');
              letters.pop();
              element.textContent = letters.join('');
              itr++;

              if (itr < textOrNum) {
                requestID = requestAnimationFrame(eraseLetter);
              } else {
                setTimeout(() => {
                  if (!chain) {
                    removeClass(element, blinkClass);
                  }
                  //element.style.borderRight =  "2px solid transparent";
                }, postDelay);
              }
            }, 1000 / fps);
          }
          requestID = requestAnimationFrame(eraseLetter);
        }, delay);
      } else {
        console.log('there was an issue with the settings');
      }
    };
    this.typingAnimation3 = function(
      setting,
      textOrNum,
      speed,
      delay,
      postDelay,
      remove,
      callback
    ) {
      var itr = 0;
      var fps = speed;
      var letters;
      var blinkClass = 'blinking-2';

      if (setting === 'write') {
        letters = textOrNum.split('');
        var max = textOrNum.length;

        //element.style.borderRight =  "2px solid rgba(255, 255, 255, 0.75)";

        addClass(element, blinkClass);
        setTimeout(() => {
          function addLetter() {
            setTimeout(function() {
              element.innerHTML += letters.shift();
              itr++;

              if (itr < max) {
                requestID = requestAnimationFrame(addLetter);
              } else {
                setTimeout(() => {
                  if (remove) {
                    removeClass(element, blinkClass);
                  }
                  if (callback) {
                    callback();
                  }
                  //element.style.borderRight =  "2px solid transparent";
                }, postDelay);
              }
            }, 1000 / fps);
          }
          requestID = requestAnimationFrame(addLetter);
        }, delay);
      } else if (setting === 'delete') {
        //element.style.borderRight =  "2px solid rgba(255, 255, 255, 0.75)";

        addClass(element, blinkClass);
        setTimeout(() => {
          function eraseLetter() {
            setTimeout(function() {
              letters = element.textContent.split('');
              letters.pop();
              element.textContent = letters.join('');
              itr++;

              if (itr < textOrNum) {
                requestID = requestAnimationFrame(eraseLetter);
              } else {
                setTimeout(() => {
                  if (remove) {
                    removeClass(element, blinkClass);
                  }
                  if (callback) {
                    callback();
                  }
                  /*
                                    if (!callback) {
                                        removeClass(element, blinkClass);
                                    }
                                    else {
                                        callback();
                                    }
                                    */
                  //element.style.borderRight =  "2px solid transparent";
                }, postDelay);
              }
            }, 1000 / fps);
          }
          requestID = requestAnimationFrame(eraseLetter);
        }, delay);
      } else {
        console.log('there was an issue with the settings');
      }
    };
    this.typingAnimation4 = function(setting, textOrNum, speed, delay, postDelay, remove) {
      var itr = 0;
      var fps = speed;
      var letters;
      var blinkClass = 'blinking-2';

      return new Promise(function(resolve, reject) {
        if (setting === 'write') {
          letters = textOrNum.split('');
          var max = textOrNum.length;

          //element.style.borderRight =  "2px solid rgba(255, 255, 255, 0.75)";

          addClass(element, blinkClass);
          setTimeout(() => {
            function addLetter() {
              setTimeout(function() {
                element.innerHTML += letters.shift();
                itr++;

                if (itr < max) {
                  requestID = requestAnimationFrame(addLetter);
                } else {
                  setTimeout(() => {
                    if (remove) {
                      removeClass(element, blinkClass);
                    }
                    resolve();
                    //element.style.borderRight =  "2px solid transparent";
                  }, postDelay);
                }
              }, 1000 / fps);
            }
            requestID = requestAnimationFrame(addLetter);
          }, delay);
        } else if (setting === 'delete') {
          //element.style.borderRight =  "2px solid rgba(255, 255, 255, 0.75)";

          addClass(element, blinkClass);
          setTimeout(() => {
            function eraseLetter() {
              setTimeout(function() {
                letters = element.textContent.split('');
                letters.pop();
                element.textContent = letters.join('');
                itr++;

                if (itr < textOrNum) {
                  requestID = requestAnimationFrame(eraseLetter);
                } else {
                  setTimeout(() => {
                    if (remove) {
                      removeClass(element, blinkClass);
                    }
                    resolve();
                    /*
                                        if (!callback) {
                                            removeClass(element, blinkClass);
                                        }
                                        else {
                                            callback();
                                        }
                                        */
                    //element.style.borderRight =  "2px solid transparent";
                  }, postDelay);
                }
              }, 1000 / fps);
            }
            requestID = requestAnimationFrame(eraseLetter);
          }, delay);
        } else {
          reject('Error : ' + 'there was an issue with the settings');
          //console.log('there was an issue with the settings');
        }
      });
    };
  }

  if (
    typeof qualifier === 'string' &&
    (qualifier.charAt(0) === '.' || qualifier.charAt(0) === '#')
  ) {
    return new MinUtil2(qualifier);
  } else {
    console.log('Error Occured');
  }
}
