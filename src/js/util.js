  // Utility function used by animation function callback
  export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls;
  }

  export function hasClass(ele, cls) {
    if (ele instanceof SVGAElement) {
      console.log('this is an SVG');
      console.log(ele.getAttribute('class'));
    }
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }

  export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, '');
    }
  }


