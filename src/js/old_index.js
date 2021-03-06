import normalize from "../scss/vendor/normalize.css";
import skeleton from "../scss/vendor/skeleton.css";
import style from "../scss/main.scss";
import pdf from "../assets/documents/Kenny_Becerra_Resume.pdf";
import icon from "../assets/images/favicon.ico";
import SmoothScroll from "smooth-scroll";
import ScrollReveal from "scrollreveal";
//import img from "../images/wow.jpg";
//import {myFunc} from "./test.js";

// Functions meant to include the assets files if they can not be included via the css or html
//function requireAll(r) { r.keys().forEach(r); }
//requireAll(require.context('../assets/SVG/', true, /\.svg$/));
//requireAll(require.context('../assets/images/', true,  /\.(png|jpeg|jpg)$/));
//requireAll(require.context('../assets/videos/', true,  /\.(mp4|webm|mov)$/));

// THIS DEFINES A NATIVE DOM IS READY FUNCTION TO USE SIMILAR TO $(document).ready FROM JQUERY
var domIsReady = (function(domIsReady) {
  var isBrowserIeOrNot = function() {
    return !document.attachEvent || typeof document.attachEvent === "undefined"
      ? "not-ie"
      : "ie";
  };

  domIsReady = function(callback) {
    if (callback && typeof callback === "function") {
      if (isBrowserIeOrNot() !== "ie") {
        document.addEventListener("DOMContentLoaded", function() {
          return callback();
        });
      } else {
        document.attachEvent("onreadystatechange", function() {
          if (document.readyState === "complete") {
            return callback();
          }
        });
      }
    } else {
      console.error("The callback is not a function!");
    }
  };

  return domIsReady;
})(domIsReady || {});

// CLASSIE HELPER FUNCTIONS FOR ADDING AND REMOVING CLASSES
(function(window) {
  "use strict";

  // class helper functions from bonzo https://github.com/ded/bonzo

  function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  // classList support for class management
  // altho to be fair, the api sucks because it won't accept multiple classes at once
  var hasClass, addClass, removeClass;

  if ("classList" in document.documentElement) {
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
        elem.className = elem.className + " " + c;
      }
    };
    removeClass = function(elem, c) {
      elem.className = elem.className.replace(classReg(c), " ");
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
  if (typeof define === "function" && define.amd) {
    // AMD
    define(classie);
  } else {
    // browser global
    window.classie = classie;
  }
})(window);

//  ADDED FOR POLYFILL FOR EVENT LISTENERS EventListener | @jon_neal | //github.com/jonathantneal/EventListener
!window.addEventListener &&
  window.Element &&
  (function() {
    function addToPrototype(name, method) {
      Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[
        name
      ] = method;
    }

    var registry = [];

    addToPrototype("addEventListener", function(type, listener) {
      var target = this;

      registry.unshift({
        __listener: function(event) {
          event.currentTarget = target;
          event.pageX = event.clientX + document.documentElement.scrollLeft;
          event.pageY = event.clientY + document.documentElement.scrollTop;
          event.preventDefault = function() {
            event.returnValue = false;
          };
          event.relatedTarget = event.fromElement || null;
          event.stopPropagation = function() {
            event.cancelBubble = true;
          };
          event.relatedTarget = event.fromElement || null;
          event.target = event.srcElement || target;
          event.timeStamp = +new Date();

          listener.call(target, event);
        },
        listener: listener,
        target: target,
        type: type
      });

      this.attachEvent("on" + type, registry[0].__listener);
    });

    addToPrototype("removeEventListener", function(type, listener) {
      for (var index = 0, length = registry.length; index < length; ++index) {
        if (
          registry[index].target == this &&
          registry[index].type == type &&
          registry[index].listener == listener
        ) {
          return this.detachEvent(
            "on" + type,
            registry.splice(index, 1)[0].__listener
          );
        }
      }
    });

    addToPrototype("dispatchEvent", function(eventObject) {
      try {
        return this.fireEvent("on" + eventObject.type, eventObject);
      } catch (error) {
        for (var index = 0, length = registry.length; index < length; ++index) {
          if (
            registry[index].target == this &&
            registry[index].type == eventObject.type
          ) {
            registry[index].call(this, eventObject);
          }
        }
      }
    });
  })();

//MOBILE NAVIGATION FUNCTION
(function() {
  var button = document.getElementById("cn-button"),
    wrapper = document.getElementById("cn-wrapper");

  //open and close menu when the button is clicked
  var open = false;
  button.addEventListener("click", handler, false);

  function handler() {
    if (!open) {
      this.innerHTML = "X";
      classie.add(wrapper, "opened-nav");
    } else {
      this.innerHTML = "Nav";
      classie.remove(wrapper, "opened-nav");
    }
    open = !open;
  }
  function closeWrapper() {
    classie.remove(wrapper, "opened-nav");
  }
})();

(function(domIsReady) {
  domIsReady(function() {
    myLib.addAnimation({
      className: "fadeInOnThreshold",
      animation: "appear",
      check: "threshold",
      options: {
        marker: "100vh",
        offset: -110
      }
    });

    // Typing animation functionality with Promises

    $(".option-1")
      .typingAnimation4("write", "Skills", 12, 2000, 100, true)
      .then(function() {
        return $(".option-2").typingAnimation4(
          "write",
          "Resume",
          12,
          0,
          100,
          true
        );
      })
      .then(function() {
        return $(".option-3").typingAnimation4(
          "write",
          "Projects",
          12,
          0,
          1000,
          true
        );
      })
      .then(function() {
        return $(".option-main").typingAnimation4(
          "write",
          "Hello",
          18,
          1000,
          2000,
          false
        );
      })
      .then(function() {
        return $(".option-main").typingAnimation4(
          "write",
          ", I'm Kenny",
          18,
          0,
          2000,
          false
        );
      })
      .then(function() {
        return $(".option-main").typingAnimation4(
          "delete",
          16,
          18,
          0,
          500,
          false
        );
      })
      .then(function() {
        return $(".option-main").typingAnimation4(
          "write",
          "I am a Computer Engineer.",
          18,
          0,
          1000,
          false
        );
      })
      .then(function() {
        return $(".option-main").typingAnimation4(
          "delete",
          18,
          20,
          0,
          500,
          false
        );
      })
      .then(function() {
        return $(".option-main").typingAnimation4(
          "write",
          "Programmer.",
          18,
          0,
          1000,
          false
        );
      })
      .then(function() {
        return $(".option-main").typingAnimation4(
          "delete",
          11,
          20,
          500,
          0,
          false
        );
      })
      .then(function() {
        return $(".option-main").typingAnimation4(
          "write",
          "Frontend Developer.",
          18,
          500,
          2000,
          true
        );
      })
      .then(function() {
        return $(".option-main2").typingAnimation4(
          "write",
          "Welcome to my Website",
          18,
          0,
          3000,
          false
        );
      });

    /*
        document.querySelector(".option-1").addEventListener("click", function() {
          myLib.scrollIt(
            document.getElementById("skills"),
            1200,
            "easeInOutQuint",
            "-10%"
          );
        });
    
        document.querySelector(".option-2").addEventListener("click", function() {
          myLib.scrollIt(
            document.getElementById("resume"),
            1200,
            "easeInOutQuint",
            "-10%"
          );
        });
    
        document.querySelector(".option-3").addEventListener("click", function() {
          myLib.scrollIt(
            document.getElementById("projects"),
            1200,
            "easeInOutQuint",
            "-10%"
          );
        });
    
        document.querySelector(".option-4").addEventListener("click", function() {
          myLib.scrollIt(
            document.getElementById("skills"),
            1200,
            "easeInOutQuint",
            "-10%"
          );
        });
    
        document.querySelector(".option-5").addEventListener("click", function() {
          myLib.scrollIt(
            document.getElementById("resume"),
            1200,
            "easeInOutQuint",
            "-10%"
          );
        });
    
        document.querySelector(".option-6").addEventListener("click", function() {
          myLib.scrollIt(
            document.getElementById("projects"),
            1200,
            "easeInOutQuint",
            "-10%"
          );
        });
    
        */
    window.addEventListener("scroll", myLib.enableAnimations);

    // navigation Scrolling

    var scroll = new SmoothScroll();

    document
      .getElementById("scrollSkills2")
      .addEventListener("click", function(e) {
        e.preventDefault();

        scroll.animateScroll(
          document.getElementById("skills"),
          document.getElementById("scrollSkills2"),
          {
            speed: 1200,
            speedAsDuration: true,
            offset: function(a, b) {
              const windowHeight =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.getElementsByTagName("body")[0].clientHeight;

              console.log(Math.ceil(windowHeight * 0.1));
              return Math.ceil(windowHeight * 0.1);
            }
          }
        );
      });

    document
      .getElementById("scrollResume2")
      .addEventListener("click", function(e) {
        e.preventDefault();

        scroll.animateScroll(
          document.getElementById("resume"),
          document.getElementById("scrollResume2"),
          {
            speed: 1200,
            speedAsDuration: true,
            offset: function(a, b) {
              const windowHeight =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.getElementsByTagName("body")[0].clientHeight;

              console.log(Math.ceil(windowHeight * 0.1));
              return Math.ceil(windowHeight * 0.1);
            }
          }
        );
      });

    document
      .getElementById("scrollProjects2")
      .addEventListener("click", function(e) {
        e.preventDefault();

        scroll.animateScroll(
          document.getElementById("projects"),
          document.getElementById("scrollProjects2"),
          {
            speed: 1200,
            speedAsDuration: true,
            offset: function(a, b) {
              const windowHeight =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.getElementsByTagName("body")[0].clientHeight;

              console.log(Math.ceil(windowHeight * 0.1));
              return Math.ceil(windowHeight * 0.1);
            }
          }
        );
      });

    //Mobile Navigation

    document.getElementById("scrollTop").addEventListener("click", function(e) {
      e.preventDefault();

      scroll.animateScroll(0);
    });

    document
      .getElementById("scrollSkills")
      .addEventListener("click", function(e) {
        e.preventDefault();

        scroll.animateScroll(
          document.getElementById("skills"),
          document.getElementById("scrollSkills2"),
          {
            speed: 1200,
            speedAsDuration: true,
            offset: 0
          }
        );
      });

    document
      .getElementById("scrollResume")
      .addEventListener("click", function(e) {
        e.preventDefault();

        scroll.animateScroll(
          document.getElementById("resume"),
          document.getElementById("scrollResume2"),
          {
            speed: 1200,
            speedAsDuration: true,
            offset: 0
          }
        );
      });

    document
      .getElementById("scrollProjects")
      .addEventListener("click", function(e) {
        e.preventDefault();

        scroll.animateScroll(
          document.getElementById("projects"),
          document.getElementById("scrollProjects2"),
          {
            speed: 1200,
            speedAsDuration: true,
            offset: 0
          }
        );
      });
  });
})(domIsReady);

var myLib = (function() {
  var animations = [];
  var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var flag = true;
  var originalDisplay = null;
  var requestID = null;
  var fadingAllow = true;

  // Utility function used by animation function callback
  function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
  }

  function hasClass(ele, cls) {
    if (ele instanceof SVGAElement) {
      console.log("this is an SVG");
      console.log(ele.getAttribute("class"));
    }
    return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
  }

  function removeClass(ele, cls) {
    console.log(ele);
    if (hasClass(ele, cls)) {
      var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      ele.className = ele.className.replace(reg, " ");
    }
  }

  function fadeIn(el) {
    if (fadingAllow) {
      el.style.opacity = 0;
      el.style.display = "block";

      (function fade() {
        var val = parseFloat(el.style.opacity) || 0;
        if (!((val += 0.1) > 1)) {
          el.style.opacity = val;
          requestID = requestAnimationFrame(fade);
        } else {
          cancelAnimationFrame(requestID);
        }
      })();
    }
  }

  function fadeOut(el) {
    if (fadingAllow) {
      el.style.opacity = 1;
      //el.style.display = "none";
      (function fade() {
        if ((el.style.opacity -= 0.1) == 0) {
          el.style.display = "none";
          cancelAnimationFrame(requestID);
        } else {
          requestID = requestAnimationFrame(fade);
        }
      })();
    } else {
      console.log("fading not allowed");
    }
  }

  return {
    smoothScroll: function(targetclass, duration) {
      var target = document.querySelector(targetclass);
      var targetPosition = target.getBoundingClientRect().top;
      var startPosition = window.pageYOffset || window.scrollY;
      var distance = targetPosition - startPosition;
      var startTime = null;

      function loop(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(loop);
      }

      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t * t + b;
        t -= 2;
        return (-c / 2) * (t * t * t * t - 2) + b;
      }

      requestAnimationFrame(loop);
    },
    myTest: function() {
      console.log("Hellow there");
    },
    implementFadeOut: function(ele) {
      fadeOut(ele);
    },
    implementFadeIn: function(ele) {
      fadeIn(ele);
    },
    scrollIt: function(
      destination,
      duration = 200,
      easing = "linear",
      offset,
      callback
    ) {
      //fadingAllow = false;

      const easings = {
        linear(t) {
          return t;
        },
        easeInQuad(t) {
          return t * t;
        },
        easeOutQuad(t) {
          return t * (2 - t);
        },
        easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        easeInCubic(t) {
          return t * t * t;
        },
        easeOutCubic(t) {
          return --t * t * t + 1;
        },
        easeInOutCubic(t) {
          return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        easeInQuart(t) {
          return t * t * t * t;
        },
        easeOutQuart(t) {
          return 1 - --t * t * t * t;
        },
        easeInOutQuart(t) {
          return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
        },
        easeInQuint(t) {
          return t * t * t * t * t;
        },
        easeOutQuint(t) {
          return 1 + --t * t * t * t * t;
        },
        easeInOutQuint(t) {
          return t < 0.5
            ? 16 * t * t * t * t * t
            : 1 + 16 * --t * t * t * t * t;
        }
      };

      const start = window.pageYOffset;
      const startTime =
        "now" in window.performance ? performance.now() : new Date().getTime();

      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.getElementsByTagName("body")[0].clientHeight;

      offset =
        typeof offset === "number"
          ? offset
          : (parseInt(offset) / 100) * windowHeight;

      const destinationOffset =
        typeof destination === "number"
          ? destination
          : destination.offsetTop + offset;
      const destinationOffsetToScroll = Math.round(
        documentHeight - destinationOffset < windowHeight
          ? documentHeight - windowHeight
          : destinationOffset
      );

      if ("requestAnimationFrame" in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
          callback();
        }
        return;
      }

      function scroll() {
        const now =
          "now" in window.performance
            ? performance.now()
            : new Date().getTime();
        const time = Math.min(1, (now - startTime) / duration);
        const timeFunction = easings[easing](time);
        window.scroll(
          0,
          Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
        );

        if (window.pageYOffset === destinationOffsetToScroll) {
          //fadingAllow = true;
          if (callback) {
            callback();
          }
          return;
        }
        requestAnimationFrame(scroll);
      }

      scroll();
    },
    addAnimation: function(object) {
      animations.push(object);
    },
    getAnimations: function() {
      return [...animations];
    },
    enableAnimations: function() {
      for (var itr = 0; itr < animations.length; itr++) {
        if (animations[itr].check === "inView") {
          //var elements = document.getElementsByClassName('myonscroll1');
          var elements = document.getElementsByClassName(
            animations[itr].className
          );

          //iterate throughout the collection
          for (var i = 0; i < elements.length; i++) {
            //find if the item is inside the viewport and what percetage is inside
            var rect = elements[i].getBoundingClientRect();
            var percentageShown;

            if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
              percentageShown = 0;
            } else if (
              rect.top < 0 &&
              rect.bottom > 0 &&
              rect.bottom <= window.innerHeight
            ) {
              percentageShown = rect.bottom / rect.height;
            } else if (
              rect.top < 0 &&
              rect.bottom > 0 &&
              rect.bottom > window.innerHeight
            ) {
              percentageShown = window.innerHeight / rect.height;
            } else if (
              rect.top >= 0 &&
              rect.bottom > 0 &&
              rect.bottom <= window.innerHeight
            ) {
              percentageShown = 100;
            } else if (
              rect.top >= 0 &&
              rect.bottom > 0 &&
              rect.bottom > window.innerHeight
            ) {
              percentageShown = (window.innerHeight - rect.top) / rect.height;
            } else {
              console.log("the item didnt register - start");
              console.log("top: " + rect.top + ",  bottom: " + rect.bottom);
              console.log("the item didnt register - end");
            }

            //console.log('the percentage shown is ' + percentageShown.toFixed(2) + ' %');
            //console.log(elements[i]);

            if (percentageShown >= animations[itr].options.percentage) {
              //console.log(hasClass(elements[i], 'myonscroll1'));
              //addClass(elements[i], 'animate-footer-text')
              //removeClass(elements[i], 'myonscroll1');
              addClass(elements[i], animations[itr].animation);
              //removeClass(elements[i], AnimateElements[itr]);
            }
          }
        } else if (animations[itr].check === "threshold") {
          var current =
            window.pageYOffset || document.documentElement.scrollTop;

          var threshold =
            typeof animations[itr].options.marker === "number"
              ? animations[itr].options.marker
              : window.innerHeight;
          var offset = animations[itr].options.offset || 0;

          // Element has gone over the threshold
          if (current > threshold + offset) {
            // element has gone below theshold while scrolling down
            if (current > lastScrollTop) {
              if (flag) {
                var elements = document.getElementsByClassName(
                  animations[itr].className
                );
                //iterate throughout the collection
                for (var i = 0; i < elements.length; i++) {
                  fadeIn(elements[i]);
                }
                flag = !flag;
              }
            }
            // element has gone below theshold while scrolling up
            else {
            }
          }
          // element is below threshold
          else {
            // element has gone below theshold while scrolling up
            if (current < lastScrollTop) {
              if (!flag) {
                var elements = document.getElementsByClassName(
                  animations[itr].className
                );

                //iterate throughout the collection
                for (var i = 0; i < elements.length; i++) {
                  fadeOut(elements[i]);
                }
                flag = !flag;
              }
            }
            // element has gone below theshold while scrolling down
            else {
            }
          }
        }
      }

      lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    }
  };
})();

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
      if (!hasClass(ele, cls)) ele.className += " " + cls;
    }

    function hasClass(ele, cls) {
      if (ele instanceof SVGAElement) {
        console.log("this is an SVG");
        console.log(ele.getAttribute("class"));
      }
      return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    }

    function removeClass(ele, cls) {
      if (hasClass(ele, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, " ");
      }
    }

    this.addClass = function(param) {
      if (!hasClass(element, param)) element.className += " " + param;
    };
    this.removeClass = function(param) {
      if (hasClass(element, param)) {
        var reg = new RegExp("(\\s|^)" + param + "(\\s|$)");
        element.className = element.className.replace(reg, " ");
      }
    };
    this.typingAnimation = function(setting, textOrNum, speed, delay) {
      var itr = 0;
      var fps = speed;
      var letters;

      if (setting === "write") {
        letters = textOrNum.split("");
        var max = textOrNum.length;

        element.style.borderRight = "2px solid rgba(255, 255, 255, 0.75)";
        addClass(element, "blinking");
        setTimeout(() => {
          function addLetter() {
            setTimeout(function() {
              element.innerHTML += letters.shift();
              itr++;

              if (itr < max) {
                requestID = requestAnimationFrame(addLetter);
              } else {
                setTimeout(() => {
                  removeClass(element, "blinking");
                  element.style.borderRight = "2px solid transparent";
                }, 1500);
              }
            }, 1000 / fps);
          }
          requestID = requestAnimationFrame(addLetter);
        }, delay);
      } else if (setting === "delete") {
        element.style.borderRight = "2px solid rgba(255, 255, 255, 0.75)";
        addClass(element, "blinking");
        setTimeout(() => {
          function eraseLetter() {
            setTimeout(function() {
              letters = element.textContent.split("");
              letters.pop();
              element.textContent = letters.join("");
              itr++;

              if (itr < textOrNum) {
                requestID = requestAnimationFrame(eraseLetter);
              } else {
                setTimeout(() => {
                  removeClass(element, "blinking");
                  element.style.borderRight = "2px solid transparent";
                }, 1500);
              }
            }, 1000 / fps);
          }
          requestID = requestAnimationFrame(eraseLetter);
        }, delay);
      } else {
        console.log("there was an issue with the settings");
      }
    };
    this.typingAnimation2 = function(
      setting,
      textOrNum,
      speed,
      delay,
      postDelay,
      chain
    ) {
      var itr = 0;
      var fps = speed;
      var letters;
      var blinkClass = "blinking-2";

      if (setting === "write") {
        letters = textOrNum.split("");
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
      } else if (setting === "delete") {
        //element.style.borderRight =  "2px solid rgba(255, 255, 255, 0.75)";

        addClass(element, blinkClass);
        setTimeout(() => {
          function eraseLetter() {
            setTimeout(function() {
              letters = element.textContent.split("");
              letters.pop();
              element.textContent = letters.join("");
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
        console.log("there was an issue with the settings");
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
      var blinkClass = "blinking-2";

      if (setting === "write") {
        letters = textOrNum.split("");
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
      } else if (setting === "delete") {
        //element.style.borderRight =  "2px solid rgba(255, 255, 255, 0.75)";

        addClass(element, blinkClass);
        setTimeout(() => {
          function eraseLetter() {
            setTimeout(function() {
              letters = element.textContent.split("");
              letters.pop();
              element.textContent = letters.join("");
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
        console.log("there was an issue with the settings");
      }
    };
    this.typingAnimation4 = function(
      setting,
      textOrNum,
      speed,
      delay,
      postDelay,
      remove
    ) {
      var itr = 0;
      var fps = speed;
      var letters;
      var blinkClass = "blinking-2";

      return new Promise(function(resolve, reject) {
        if (setting === "write") {
          letters = textOrNum.split("");
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
        } else if (setting === "delete") {
          //element.style.borderRight =  "2px solid rgba(255, 255, 255, 0.75)";

          addClass(element, blinkClass);
          setTimeout(() => {
            function eraseLetter() {
              setTimeout(function() {
                letters = element.textContent.split("");
                letters.pop();
                element.textContent = letters.join("");
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
          reject("Error : " + "there was an issue with the settings");
          //console.log('there was an issue with the settings');
        }
      });
    };
  }

  if (
    typeof qualifier === "string" &&
    (qualifier.charAt(0) === "." || qualifier.charAt(0) === "#")
  ) {
    return new MinUtil2(qualifier);
  } else {
    console.log("Error Occured");
  }
}

/**
 * My Attempt are a function constructor that will be a utility
 * class with all comon functionality for navigation and classes
 */
