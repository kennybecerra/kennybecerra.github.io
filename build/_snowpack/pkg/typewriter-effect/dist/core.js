/* SNOWPACK PROCESS POLYFILL (based on https://github.com/calvinmetcalf/node-process-es6) */
function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
var globalContext;
if (typeof window !== 'undefined') {
    globalContext = window;
} else if (typeof self !== 'undefined') {
    globalContext = self;
} else {
    globalContext = {};
}
if (typeof globalContext.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof globalContext.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance$1 = globalContext.performance || {};
var performanceNow =
  performance$1.now        ||
  performance$1.mozNow     ||
  performance$1.msNow      ||
  performance$1.oNow       ||
  performance$1.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance$1)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: {"NODE_ENV":"production"},
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var core = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}("undefined"!=typeof self?self:commonjsGlobal,(function(){return (()=>{var e={75:function(e){(function(){var t,n,r,o,a,s;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(e.exports=function(){return (t()-a)/1e6},n=process.hrtime,o=(t=function(){var e;return 1e9*(e=n())[0]+e[1]})(),s=1e9*process.uptime(),a=o-s):Date.now?(e.exports=function(){return Date.now()-r},r=Date.now()):(e.exports=function(){return (new Date).getTime()-r},r=(new Date).getTime());}).call(this);},4087:(e,t,n)=>{for(var r=n(75),o="undefined"==typeof window?n.g:window,a=["moz","webkit"],s="AnimationFrame",i=o["request"+s],u=o["cancel"+s]||o["cancelRequest"+s],l=0;!i&&l<a.length;l++)i=o[a[l]+"Request"+s],u=o[a[l]+"Cancel"+s]||o[a[l]+"CancelRequest"+s];if(!i||!u){var c=0,p=0,d=[];i=function(e){if(0===d.length){var t=r(),n=Math.max(0,16.666666666666668-(t-c));c=n+t,setTimeout((function(){var e=d.slice(0);d.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(c);}catch(e){setTimeout((function(){throw e}),0);}}),Math.round(n));}return d.push({handle:++p,callback:e,cancelled:!1}),p},u=function(e){for(var t=0;t<d.length;t++)d[t].handle===e&&(d[t].cancelled=!0);};}e.exports=function(e){return i.call(o,e)},e.exports.cancel=function(){u.apply(o,arguments);},e.exports.polyfill=function(e){e||(e=o),e.requestAnimationFrame=i,e.cancelAnimationFrame=u;};}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]});},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return (()=>{n.d(r,{default:()=>S});var e=n(4087),t=n.n(e);const o=function(e){return new RegExp(/<[a-z][\s\S]*>/i).test(e)},a=function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes},s=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};var i="TYPE_CHARACTER",u="REMOVE_CHARACTER",l="REMOVE_ALL",c="REMOVE_LAST_VISIBLE_NODE",p="PAUSE_FOR",d="CALL_FUNCTION",f="ADD_HTML_TAG_ELEMENT",v="CHANGE_DELETE_SPEED",h="CHANGE_DELAY",m="CHANGE_CURSOR",y="PASTE_STRING",g="HTML_TAG";function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r);}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){N(e,t,n[t]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t));}));}return e}function T(e){return function(e){if(Array.isArray(e))return b(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return "Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}function N(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const S=function(){function n(r,E){var b=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),N(this,"state",{cursorAnimation:null,lastFrameTime:null,pauseUntil:null,eventQueue:[],eventLoop:null,eventLoopPaused:!1,reverseCalledEvents:[],calledEvents:[],visibleNodes:[],initialOptions:null,elements:{container:null,wrapper:document.createElement("span"),cursor:document.createElement("span")}}),N(this,"options",{strings:null,cursor:"|",delay:"natural",pauseFor:1500,deleteSpeed:"natural",loop:!1,autoStart:!1,devMode:!1,skipAddStyles:!1,wrapperClassName:"Typewriter__wrapper",cursorClassName:"Typewriter__cursor",stringSplitter:null,onCreateTextNode:null,onRemoveNode:null}),N(this,"setupWrapperElement",(function(){b.state.elements.container&&(b.state.elements.wrapper.className=b.options.wrapperClassName,b.state.elements.cursor.className=b.options.cursorClassName,b.state.elements.cursor.innerHTML=b.options.cursor,b.state.elements.container.innerHTML="",b.state.elements.container.appendChild(b.state.elements.wrapper),b.state.elements.container.appendChild(b.state.elements.cursor));})),N(this,"start",(function(){return b.state.eventLoopPaused=!1,b.runEventLoop(),b})),N(this,"pause",(function(){return b.state.eventLoopPaused=!0,b})),N(this,"stop",(function(){return b.state.eventLoop&&((0, e.cancel)(b.state.eventLoop),b.state.eventLoop=null),b})),N(this,"pauseFor",(function(e){return b.addEventToQueue(p,{ms:e}),b})),N(this,"typeOutAllStrings",(function(){return "string"==typeof b.options.strings?(b.typeString(b.options.strings).pauseFor(b.options.pauseFor),b):(b.options.strings.forEach((function(e){b.typeString(e).pauseFor(b.options.pauseFor).deleteAll(b.options.deleteSpeed);})),b)})),N(this,"typeString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(o(e))return b.typeOutHTMLString(e,t);if(e){var n=b.options||{},r=n.stringSplitter,a="function"==typeof r?r(e):e.split("");b.typeCharacters(a,t);}return b})),N(this,"pasteString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return o(e)?b.typeOutHTMLString(e,t,!0):(e&&b.addEventToQueue(y,{character:e,node:t}),b)})),N(this,"typeOutHTMLString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2?arguments[2]:void 0,r=a(e);if(r.length>0)for(var o=0;o<r.length;o++){var s=r[o],i=s.innerHTML;s&&3!==s.nodeType?(s.innerHTML="",b.addEventToQueue(f,{node:s,parentNode:t}),n?b.pasteString(i,s):b.typeString(i,s)):s.textContent&&(n?b.pasteString(s.textContent,t):b.typeString(s.textContent,t));}return b})),N(this,"deleteAll",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"natural";return b.addEventToQueue(l,{speed:e}),b})),N(this,"changeDeleteSpeed",(function(e){if(!e)throw new Error("Must provide new delete speed");return b.addEventToQueue(v,{speed:e}),b})),N(this,"changeDelay",(function(e){if(!e)throw new Error("Must provide new delay");return b.addEventToQueue(h,{delay:e}),b})),N(this,"changeCursor",(function(e){if(!e)throw new Error("Must provide new cursor");return b.addEventToQueue(m,{cursor:e}),b})),N(this,"deleteChars",(function(e){if(!e)throw new Error("Must provide amount of characters to delete");for(var t=0;t<e;t++)b.addEventToQueue(u);return b})),N(this,"callFunction",(function(e,t){if(!e||"function"!=typeof e)throw new Error("Callbak must be a function");return b.addEventToQueue(d,{cb:e,thisArg:t}),b})),N(this,"typeCharacters",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(e){b.addEventToQueue(i,{character:e,node:t});})),b})),N(this,"removeCharacters",(function(e){if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(){b.addEventToQueue(u);})),b})),N(this,"addEventToQueue",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return b.addEventToStateProperty(e,t,n,"eventQueue")})),N(this,"addReverseCalledEvent",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=b.options.loop;return r?b.addEventToStateProperty(e,t,n,"reverseCalledEvents"):b})),N(this,"addEventToStateProperty",(function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3?arguments[3]:void 0,o={eventName:e,eventArgs:t||{}};return b.state[r]=n?[o].concat(T(b.state[r])):[].concat(T(b.state[r]),[o]),b})),N(this,"runEventLoop",(function(){b.state.lastFrameTime||(b.state.lastFrameTime=Date.now());var e=Date.now(),n=e-b.state.lastFrameTime;if(!b.state.eventQueue.length){if(!b.options.loop)return;b.state.eventQueue=T(b.state.calledEvents),b.state.calledEvents=[],b.options=w({},b.state.initialOptions);}if(b.state.eventLoop=t()(b.runEventLoop),!b.state.eventLoopPaused){if(b.state.pauseUntil){if(e<b.state.pauseUntil)return;b.state.pauseUntil=null;}var r,o=T(b.state.eventQueue),a=o.shift();if(!(n<=(r=a.eventName===c||a.eventName===u?"natural"===b.options.deleteSpeed?s(40,80):b.options.deleteSpeed:"natural"===b.options.delay?s(120,160):b.options.delay))){var E=a.eventName,A=a.eventArgs;switch(b.logInDevMode({currentEvent:a,state:b.state,delay:r}),E){case y:case i:var N=A.character,S=A.node,C=document.createTextNode(N),_=C;b.options.onCreateTextNode&&"function"==typeof b.options.onCreateTextNode&&(_=b.options.onCreateTextNode(N,C)),_&&(S?S.appendChild(_):b.state.elements.wrapper.appendChild(_)),b.state.visibleNodes=[].concat(T(b.state.visibleNodes),[{type:"TEXT_NODE",character:N,node:_}]);break;case u:o.unshift({eventName:c,eventArgs:{removingCharacterNode:!0}});break;case p:var O=a.eventArgs.ms;b.state.pauseUntil=Date.now()+parseInt(O);break;case d:var L=a.eventArgs,D=L.cb,M=L.thisArg;D.call(M,{elements:b.state.elements});break;case f:var x=a.eventArgs,P=x.node,R=x.parentNode;R?R.appendChild(P):b.state.elements.wrapper.appendChild(P),b.state.visibleNodes=[].concat(T(b.state.visibleNodes),[{type:g,node:P,parentNode:R||b.state.elements.wrapper}]);break;case l:var j=b.state.visibleNodes,k=A.speed,Q=[];k&&Q.push({eventName:v,eventArgs:{speed:k,temp:!0}});for(var F=0,H=j.length;F<H;F++)Q.push({eventName:c,eventArgs:{removingCharacterNode:!1}});k&&Q.push({eventName:v,eventArgs:{speed:b.options.deleteSpeed,temp:!0}}),o.unshift.apply(o,Q);break;case c:var I=a.eventArgs.removingCharacterNode;if(b.state.visibleNodes.length){var U=b.state.visibleNodes.pop(),q=U.type,G=U.node,Y=U.character;b.options.onRemoveNode&&"function"==typeof b.options.onRemoveNode&&b.options.onRemoveNode({node:G,character:Y}),G&&G.parentNode.removeChild(G),q===g&&I&&o.unshift({eventName:c,eventArgs:{}});}break;case v:b.options.deleteSpeed=a.eventArgs.speed;break;case h:b.options.delay=a.eventArgs.delay;break;case m:b.options.cursor=a.eventArgs.cursor,b.state.elements.cursor.innerHTML=a.eventArgs.cursor;}b.options.loop&&(a.eventName===c||a.eventArgs&&a.eventArgs.temp||(b.state.calledEvents=[].concat(T(b.state.calledEvents),[a]))),b.state.eventQueue=o,b.state.lastFrameTime=e;}}})),r)if("string"==typeof r){var A=document.querySelector(r);if(!A)throw new Error("Could not find container element");this.state.elements.container=A;}else this.state.elements.container=r;E&&(this.options=w(w({},this.options),E)),this.state.initialOptions=w({},this.options),this.init();}var r,E;return r=n,(E=[{key:"init",value:function(){var e,t;this.setupWrapperElement(),this.addEventToQueue(m,{cursor:this.options.cursor},!0),this.addEventToQueue(l,null,!0),!window||window.___TYPEWRITER_JS_STYLES_ADDED___||this.options.skipAddStyles||(e=".Typewriter__cursor{-webkit-animation:Typewriter-cursor 1s infinite;animation:Typewriter-cursor 1s infinite;margin-left:1px}@-webkit-keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}",(t=document.createElement("style")).appendChild(document.createTextNode(e)),document.head.appendChild(t),window.___TYPEWRITER_JS_STYLES_ADDED___=!0),!0===this.options.autoStart&&this.options.strings&&this.typeOutAllStrings().start();}},{key:"logInDevMode",value:function(e){this.options.devMode&&console.log(e);}}])&&A(r.prototype,E),n}();})(),r.default})()}));
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(core);

export default __pika_web_default_export_for_treeshaking__;
