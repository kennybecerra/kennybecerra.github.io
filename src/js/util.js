
// THIS DEFINES A NATIVE DOM IS READY FUNCTION TO USE SIMILAR TO $(document).ready FROM JQUERY
const domIsReady = (function(domIsReady) {
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

 

