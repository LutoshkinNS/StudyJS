document.addEventListener('DOMContentLoaded', () => {

	// Timer
	const countTimer = deadline => {
		const timerWrap = document.getElementById('timer'),
			timerHours = document.getElementById('timer-hours'),
			timerMinutes = document.getElementById('timer-minutes'),
			timerSeconds = document.getElementById('timer-seconds');

		const getTimeRemaining = () => {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor((timeRemaining / 60) / 60);
			return { timeRemaining, hours, minutes, seconds };
		};

		const addsZero = data => {
			if (data < 10) return '0' + data;
			else return data;
		};

		const updateClock = () => {
			const timer = getTimeRemaining();

			timerHours.textContent = addsZero(timer.hours);
			timerMinutes.textContent = addsZero(timer.minutes);
			timerSeconds.textContent = addsZero(timer.seconds);

			if (timer.timeRemaining <= 0) {
				// eslint-disable-next-line no-use-before-define
				clearInterval(startTimer);
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
				timerWrap.style.color = 'red';
			}
		};

		const startTimer = setInterval(updateClock, 1000);

	};

	countTimer('25 feb 2021');

	// Menu
	const toggleMenu = () => {

		const menu = document.querySelector('menu');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		document.addEventListener('click', event => {
			let target = event.target;

			target = target.closest('.menu');
			if (target) {
				handlerMenu();
			} else {
				target = event.target;
				if (target.classList.contains('close-btn')) {
					handlerMenu();
				} else {
					target = target.closest('ul>li');
					if (menu.contains(target)) {
						handlerMenu();
					} else {
						target = event.target;
						target = target.closest('menu');
						if (!target) {
							menu.classList.remove('active-menu');
						}
					}
				}
			}
		});
	};
	toggleMenu();

	// Popup
	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn');

		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				if (window.innerWidth >= 768) {
					animate({
						duration: 500,
						timing(timeFraction) {
							return Math.pow(timeFraction, 3);
						},
						draw(progress) {
							popup.style.opacity = progress;
						}
					});
				}
			});
		});

		popup.addEventListener('click', event => {
			let target = event.target;
			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					popup.style.display = 'none';
				}
			}
		});
	};
	togglePopup();

	// Animation
	function animate({ duration, draw, timing }) {

		const start = performance.now();

		requestAnimationFrame(function animate(time) {
			let timeFraction = (time - start) / duration;
			if (timeFraction > 1) timeFraction = 1;

			const progress = timing(timeFraction);

			draw(progress);

			if (timeFraction < 1) {
				requestAnimationFrame(animate);
			}

		});
	}

	// Scroll
	const anchors = document.querySelectorAll('a[href*="#"]');

	for (const anchor of anchors) {
		anchor.addEventListener('click', event => {
			event.preventDefault();

			const blockID = anchor.getAttribute('href').substring(1);

			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	}

	// Tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};
		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};
	tabs();

	// Slider
	const slider = () => {
		const slides = document.querySelectorAll('.portfolio-item'),
			slider = document.querySelector('.portfolio-content'),
			dotsUl = document.querySelector('.portfolio-dots');
		let dots = document.querySelectorAll('.dot');

		const addsDot = () => {
			for (let index = 0; index < slides.length; index++) {
				const dot = document.createElement('li');
				dot.classList.add('dot');
				dotsUl.appendChild(dot);
			}

			dots = document.querySelectorAll('.dot');
			dots[0].classList.add('dot-active');
		};
		addsDot();

		let currentSlide = 0,
			interval;

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slides, currentSlide, 'portfolio-item-active');
			prevSlide(dots, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slides.length) {
				currentSlide = 0;
			}
			nextSlide(slides, currentSlide, 'portfolio-item-active');
			nextSlide(dots, currentSlide, 'dot-active');
		};

		const startSlide = (time = 2000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();

			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slides, currentSlide, 'portfolio-item-active');
			prevSlide(dots, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dots.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slides.length) {
				currentSlide = 0;
			}

			if (currentSlide < 0) {
				currentSlide = slides.length - 1;
			}

			nextSlide(slides, currentSlide, 'portfolio-item-active');
			nextSlide(dots, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				startSlide();
			}
		});

		startSlide(2000);
	};
	slider();
});
