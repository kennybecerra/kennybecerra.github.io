var ResumeController = (function() {


    window.addEventListener('scroll', function (){
        /*
        var myscrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset :(document.documentElement || document.body.parentNode || document.body).scrollTop;

        console.log('This is the window height');
        console.log(window.innerHeight);
        console.log('THis is the window top');
        console.log(myscrollTop);
        console.log(window.scrollY);
        console.log('THis is the window top + height');
        console.log(myscrollTop + window.innerHeight);
        console.log('this the topof the item')
        */
        //Get elements in an array like collection

        function hasClass(ele, cls) {

            if (ele instanceof SVGAElement) {
                console.log('this is an SVG');
                console.log( ele.getAttribute('class'));

            }

            //console.log(ele + " : is the element");
            //console.log(ele.className );
            return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
            //console.log( new RegExp(cls, 'g').test(ele.className));
            //return new RegExp(cls, 'g').test(ele.className);
        }
        
        function addClass(ele,cls) {
            if (!hasClass(ele,cls)) ele.className += " "+cls;
        }
        
        function removeClass(ele,cls) {
            console.log(ele);
            if (hasClass(ele,cls)) {
                var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
                ele.className=ele.className.replace(reg,' ');
            }
        }

        var Animations = ['animate-footer-text', 'animate-fade-entrance', 'animate-footer-icon'];
        var AnimateElements =['myonscroll1', 'myonscroll2', 'onmyscroll3'];
        var thresholds = [.95, .01, .30];

        for( var itr = 0; itr < AnimateElements.length; itr++) {

            //var elements = document.getElementsByClassName('myonscroll1');
            var elements = document.getElementsByClassName(AnimateElements[itr]);
            //iterate throughout the collection
            for (var i = 0; i < elements.length; i++){
    
                //find if the item is inside the viewport and what percetage is inside
                var rect = elements[i].getBoundingClientRect();
                var percentageShown;
    
                if (rect.bottom  <= 0 || rect.top >= window.innerHeight) {
                    percentageShown = 0;
                } 
                else if ( rect.top < 0 && rect.bottom > 0 && rect.bottom <= window.innerHeight) {
                        percentageShown = rect.bottom / rect.height;
                }
                else if (rect.top < 0 && rect.bottom > 0 && rect.bottom > window.innerHeight) {
                    percentageShown = window.innerHeight / rect.height;
                }
                else if (rect.top >= 0 && rect.bottom > 0  && rect.bottom <= window.innerHeight) {
                    percentageShown = 100;
                }
                else if ( rect.top >= 0 && rect.bottom > 0  && rect.bottom > window.innerHeight) {
                    percentageShown = (window.innerHeight - rect.top)/rect.height;
                }
                else {
                    console.log('the item didnt register - start');
                    console.log("top: " + rect.top + ',  bottom: ' + rect.bottom);
                    console.log('the item didnt register - end');
                }
    
                console.log('the percentage shown is ' + percentageShown.toFixed(2) + ' %');
                //console.log(elements[i]);
    
                if (percentageShown >= thresholds[itr]) {
                    //console.log(hasClass(elements[i], 'myonscroll1'));
                    //addClass(elements[i], 'animate-footer-text')
                    //removeClass(elements[i], 'myonscroll1');
                    addClass(elements[i], Animations[itr]);
                    //removeClass(elements[i], AnimateElements[itr]); 
                } 
            }

        }

    /*
    console.log('this is the bottom of the item')
    for(var i = 0; i < elements.length; i++){
        var rect = elements[i].getBoundingClientRect();
        console.log(rect.bottom);
        
    }
    */
    //console.log( );

    });
})();

