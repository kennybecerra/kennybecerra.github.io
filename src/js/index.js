import normalize from '../scss/vendor/normalize.css';
import style from '../scss/main.scss';
import pdf from '../assets/documents/Kenny_Becerra_Resume.pdf';
import icon from '../assets/images/favicon.ico';
import anime from 'animejs/lib/anime.es.js';
import Typewriter from 'typewriter-effect/dist/core';
import * as util from "./util";

// Functions meant to include the assets files if they can not be included via the css or html
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('../assets/SVG/', true, /\.svg$/));
requireAll(require.context('../assets/images/', true,  /\.(png|jpeg|jpg)$/));
requireAll(require.context('../assets/videos/', true,  /\.(mp4|webm|mov)$/));


const typingCommonOptions = {
	loop: false,
	delay: 75,
	autoStart: false
}

const heroSectionTyping = new Typewriter('#typingAnimation', typingCommonOptions);

heroSectionTyping
	.pauseFor(1500)
	.typeString("Hello")
	.pauseFor(300)
	.typeString(", I'm Kenny")
	.pauseFor(1000)
	.deleteAll()
	.typeString("I'm a Frontend Developer")
	.pauseFor(1000)
	.typeString("<br/>Welcome to my site.")
	.callFunction(() => {
		
		const navigationTyping = [
			new Typewriter(".header__nav--item.option-1", typingCommonOptions),
			new Typewriter(".header__nav--item.option-2", typingCommonOptions),
			new Typewriter(".header__nav--item.option-3", typingCommonOptions)
		]

		
		navigationTyping[0].typeString("Skills").start()
		navigationTyping[1].typeString("Resume").start()
		navigationTyping[2].typeString("Projects")
		.callFunction(() => {
			anime({
				targets: ".chevron_container",
				opacity: [0, 1],
				duration: 1000,
				direction: "normal",
				easing: "easeInOutSine",
				delay: 1000,
				autoplay: true
			})
		})		
		.start()
	})
	.start();



// Setting navigation click buttons
const navBarDestop = document.querySelector("nav");
const aboutSection = document.querySelector("#about");
const secondSection = document.querySelector("#skills");
const thirdSection = document.querySelector("#resume");
const fourthSection = document.querySelector("#projects");
const scrollElement =  window.document.scrollingElement || window.document.body || window.document.documentElement;

document.querySelector(".chevron_container").addEventListener("click", (e) => {
	e.preventDefault()
	anime({
		targets: scrollElement,
		scrollTop: (aboutSection.getBoundingClientRect().top - navBarDestop.getBoundingClientRect().height + window.scrollY),
		duration: 700,
		easing: "easeOutQuad"
	})
})


document.querySelectorAll(".option-0").forEach( (item) => {
	item.addEventListener("click", (e) => {
		e.preventDefault()
		anime({
			targets: scrollElement,
			scrollTop: 0,
			duration: 700,
			easing: "easeOutQuad"
		})
	})
})

document.querySelectorAll(".option-1").forEach( (item) => {
	item.addEventListener("click", (e) => {
		e.preventDefault()
		anime({
			targets: scrollElement,
			scrollTop: (secondSection.getBoundingClientRect().top - navBarDestop.getBoundingClientRect().height + window.scrollY),
			duration: 700,
			easing: "easeOutQuad"
		})

	})
})

document.querySelectorAll(".option-2").forEach( (item) => {
	item.addEventListener("click", (e) => {
		e.preventDefault()
		anime({
			targets: scrollElement,
			scrollTop: (thirdSection.getBoundingClientRect().top - navBarDestop.getBoundingClientRect().height + window.scrollY),
			duration: 700,
			easing: "easeOutQuad"
		})
	})
})

document.querySelectorAll(".option-3").forEach( (item) => {
	item.addEventListener("click", (e) => {
		e.preventDefault()
		anime({
			targets: scrollElement,
			scrollTop: (fourthSection.getBoundingClientRect().top - navBarDestop.getBoundingClientRect().height + window.scrollY),
			duration: 700,
			easing: "easeOutQuad"
		})
	})
})


// Nav bar fading animation on scroll
const navBarAnimation = anime({
	targets: navBarDestop,
	opacity: { 
		value: [0, 1]
	},
	zIndex: {
		value: [-2,2],
		easing: "easeOutSine",
		round: true
	},
	easing: "easeInOutSine",
	direction: "normal",
	autoplay: false,
	duration: 3000
})

const mobileNavFade = anime({
	targets: ".mobileNav",
	top: ["110%", "85%"],
	opacity: [0, 1],
	direction: "normal",
	duration: 300,
	easing: "easeInOutSine",
	autoplay: false
})


// On Scroll event
window.addEventListener("scroll", () => {
	const { height } = navBarDestop.getBoundingClientRect();
	const { top } = aboutSection.getBoundingClientRect();
	const {top: top2} = secondSection.getBoundingClientRect();
	const animStart = height*3
	const animEnd = height
	const mobileAnimStart = window.innerHeight * .95;
	const mobileAnimEnd = window.innerHeight * .70;

	// Logic desktop nav fading animation on scroll threshold
	if ( top <= animStart && top >= animEnd) {
		navBarAnimation.seek(((animStart - top)/(animStart - animEnd)) * navBarAnimation.duration)
	} 
	else if (top > animStart && navBarAnimation.progress !== 0) {
		navBarAnimation.seek(0);
	}
	else if (top < animEnd && navBarAnimation.progress !== 100) {
		navBarAnimation.seek(navBarAnimation.duration);
	}
	else {
		//Nothing
	}


	// // logic for mobile nav fading on scroll threshold
	// if (top2 <= mobileAnimStart && top2 >= mobileAnimEnd) {
	// 	mobileNavFade.seek(  ((mobileAnimStart - top2)/(mobileAnimStart - mobileAnimEnd))  * mobileNavFade.duration);
	// }
	// else if (top2 > mobileAnimStart && mobileNavFade.progress !== 0) {
	// 	mobileNavFade.seek(0);
	// }
	// else if (top2 < mobileAnimEnd && mobileNavFade.progress !== 100) {
	// 	mobileNavFade.seek(mobileNavFade.duration);
	// }
	// else {
	// 	//Nothing
	// }


})


const mobileNav  = anime.timeline({
	targets: ".mobileNav__item",
	easing: "easeInOutSine",
	direction: "normal",
	autoplay: false
})


mobileNav.add({
	top:  anime.stagger( ["-100%", "80%" ], { easing: 'easeInSine'}),
	left: anime.stagger(["50%", "-120%"], { easing: 'easeOutSine'}),
	opacity: [0,1],
	duration: 500
})

mobileNav.add({
	targets: ".mobileNav__burger",
	rotate: (el, i, len) => {
		return [45,0, -45][i]; 
	},
	top: "50%",
	opacity: (el, i, len) => {
		if (i % 2 === 0) return 1
		return 0;
	},
	duration: 200
}, 0)

mobileNav.add({
	targets: ".mobileNav",
	width: "70px",
	height: "70px",
	duration: 200
}, 0)


document.querySelector(".mobileNav").addEventListener("click", (e) => {
	e.preventDefault();
	if (mobileNav.progress === 0) {
		if(mobileNav.reversed) {
			mobileNav.reverse()
		}
		mobileNav.play()
	} else if (mobileNav.progress === 100) {
		if(!mobileNav.reversed) {
			mobileNav.reverse()
			mobileNav.completed = false; // Work around to stop flickering
		}
		mobileNav.play()
	} else {
		mobileNav.reverse();
	}
})



/**
 * CUBE ANIMATIONS
 */

const allCubes = document.querySelectorAll(".cube");
const allControls = document.querySelectorAll(".control_button");

let cubeSides = [
	["show-front","show-left","show-top", "show-right", "show-bottom", "show-back"], 
	["show-front","show-top","show-right", "show-left", "show-bottom", "show-back"] 
]

allControls.forEach( (controlButton, buttonIndex) => {
	
	controlButton.addEventListener("click", (e) => {
		e.preventDefault()

		//remove active class from all controls buttons then add active class to current button for icon animation
		allControls.forEach((control) => {util.removeClass(control, "active")	})
		util.addClass(e.currentTarget, "active");

		//iterate through all cubes, and update which side needs to be shown for each cube
		allCubes.forEach((cube, cubeIndex) => {

			let removeArray = cubeSides[cubeIndex].filter( (cubeside, index) => index !== buttonIndex )

			removeArray.forEach( (removeString) => {
				util.removeClass(cube , removeString)
			})
			util.addClass(cube,cubeSides[cubeIndex][buttonIndex]);
		})
	})
})



