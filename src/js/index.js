import normalize from "../scss/vendor/normalize.css";
import skeleton from "../scss/vendor/skeleton.css";
import style from "../scss/main.scss";
//import img from "../images/wow.jpg";
import {myFunc} from "./test.js";


// Functions meant to include the assets files if they can not be included via the css or html
function requireAll(r) { r.keys().forEach(r); } 
requireAll(require.context('../assets/SVG/', true, /\.svg$/));
//requireAll(require.context('../assets/images/', true,  /\.(png|jpeg|jpg)$/));
//requireAll(require.context('../assets/videos/', true,  /\.(mp4|webm|mov)$/));


myFunc();

var domIsReady = (function(domIsReady) {
    var isBrowserIeOrNot = function() {
       return (!document.attachEvent || typeof document.attachEvent === "undefined" ? 'not-ie' : 'ie');
    }
 
    domIsReady = function(callback) {
       if(callback && typeof callback === 'function'){
          if(isBrowserIeOrNot() !== 'ie') {
             document.addEventListener("DOMContentLoaded", function() {
                return callback();
             });
          } else {
             document.attachEvent("onreadystatechange", function() {
                if(document.readyState === "complete") {
                   return callback();
                }
             });
          }
       } else {
          console.error('The callback is not a function!');
       }
    }
 
    return domIsReady;
 })(domIsReady || {});


 (function(domIsReady) {

    $('.test-1').typeAnimation("hellothere", 20);


 })(domIsReady);


 function $(qualifier) {

    function MinUtil(selector) {
        var element = document.querySelector(selector);
        var requestID = null;

        // Utility function used by animation function callback
        function addClass(ele,cls) {
            if (!hasClass(ele,cls)) ele.className += " "+cls;
        }

        function hasClass(ele, cls) {

            if (ele instanceof SVGAElement) {
                console.log('this is an SVG');
                console.log( ele.getAttribute('class'));
            }
            return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
        }

        function removeClass(ele,cls) {
            if (hasClass(ele,cls)) {
                var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
                ele.className=ele.className.replace(reg,' ');
            }
        };

        this.addClass = function(param) {
            if (!hasClass(element, param)) element.className += " "+param;
        };
        this.removeClass = function(param) {
            if (hasClass(element,param)) {
                var reg = new RegExp('(\\s|^)'+param+'(\\s|$)');
                element.className=element.className.replace(reg,' ');
            }
        };
        this.typeAnimation = function(text, speed) {

            var itr = 0;
            var max = text.length;
            var letters = text.split("");
            var fps = speed;
            
            function addLetter() {
                setTimeout(function() { 
                    element.innerHTML += letters.shift();
                    itr++;

                    if (itr < max) {
                        requestID  = requestAnimationFrame(addLetter);
                    }
                }, 1000/fps);
            }
            requestID = requestAnimationFrame(addLetter);
        };
    }


    if (typeof qualifier === "string" && (qualifier.charAt(0) === "." || qualifier.charAt(0) === "#") ) {
        return new MinUtil(qualifier);
    } 
    else {
        console.log("Error Occured");
    }
 }

