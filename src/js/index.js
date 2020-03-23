import normalize from '../scss/vendor/normalize.css';
import style from '../scss/main.scss';
import pdf from '../assets/documents/Kenny_Becerra_Resume.pdf';
import icon from '../assets/images/favicon.ico';
import anime from 'animejs/lib/anime.es.js';
import Typewriter from 'typewriter-effect/dist/core';

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
	.pauseFor(2500)
	.typeString("Hello")
	.pauseFor(300)
	.typeString(", I'm Kenny")
	.pauseFor(1000)
	.deleteAll()
	.typeString("I'm a Computer Engineer")
	.pauseFor(1000)
	.deleteChars(17)
	.typeString("Frontend Developer")
	.pauseFor(1000)
	.typeString("<br/>Welcome to my site.")
	.callFunction(() => {
		
		const navigationTyping = [
			new Typewriter(".header__nav--item.option-1", typingCommonOptions),
			new Typewriter(".header__nav--item.option-2", typingCommonOptions),
			new Typewriter(".header__nav--item.option-3", typingCommonOptions)
		]

		// Call back hell
		navigationTyping[0]
			.typeString("Skills")
			.callFunction(() => {
				navigationTyping[1]
					.typeString("Resume")
					.callFunction(() => {
						navigationTyping[2]
							.typeString("Projects")
							.start()
					})
					.start()
			}) 
			.start()
	})
	.start();



// Setting navigation click buttons
const navBarDestop = document.querySelector("nav");
const secondSection = document.querySelector("#skills");
const thirdSection = document.querySelector("#resume");
const fourthSection = document.querySelector("#projects");

document.querySelectorAll(".option-0").forEach( (item) => {
	item.addEventListener("click", (e) => {
		e.preventDefault()
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
	})
})

document.querySelectorAll(".option-1").forEach( (item) => {
	item.addEventListener("click", (e) => {
		e.preventDefault()
		const navBarDestopHeight = navBarDestop.getBoundingClientRect().height;
		window.scrollTo({
			top: secondSection.getBoundingClientRect().top - navBarDestopHeight + window.scrollY ,
			behavior: "smooth"
		})
	})
})

document.querySelectorAll(".option-2").forEach( (item) => {
	item.addEventListener("click", (e) => {
		e.preventDefault()
		const navBarDestopHeight = navBarDestop.getBoundingClientRect().height;
		window.scrollTo({
			top: thirdSection.getBoundingClientRect().top - navBarDestopHeight + window.scrollY,
			behavior: "smooth"
		})
	})
})

document.querySelectorAll(".option-3").forEach( (item) => {
	item.addEventListener("click", (e) => {
		e.preventDefault()
		const navBarDestopHeight = navBarDestop.getBoundingClientRect().height;
		window.scrollTo({
			top: fourthSection.getBoundingClientRect().top - navBarDestopHeight + window.scrollY,
			behavior: "smooth"
		})
	})
})

// Setting NavBar fading animation
const fadeStartEndCorrection = 300;

// Nav bar fading animation on scroll
const navBarAnimation = anime({
	targets: navBarDestop,
	opacity: { 
		value: [0, 1]
	},
	zIndex: {
		value: [-2,2],
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
	const { top } = secondSection.getBoundingClientRect();
	const animStart = height*2
	const animEnd = height
	const mobileAnimStart = window.innerHeight * .95;
	const mobileAnimEnd = window.innerHeight * .70;

	// Logic desktop nav fading animation on scroll threshold
	if ( top <= animStart && top >= animEnd) {
		navBarAnimation.seek(((animStart - top)/height) * navBarAnimation.duration)
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

	// logic for mobile nav fading on scroll threshold
	if (top <= mobileAnimStart && top >= mobileAnimEnd) {
		mobileNavFade.seek(  ((mobileAnimStart - top)/(mobileAnimStart - mobileAnimEnd))  * mobileNavFade.duration);
	}
	else if (top > mobileAnimStart && mobileNavFade.progress !== 0) {
		mobileNavFade.seek(0);
	}
	else if (top < mobileAnimEnd && mobileNavFade.progress !== 100) {
		mobileNavFade.seek(mobileNavFade.duration);
	}
	else {
		//Nothing
	}


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
	console.log("mobile was clicked")
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
