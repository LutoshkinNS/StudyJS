document.addEventListener('DOMContentLoaded', () => {

	// Timer
	const countTimer = deadline => {
		const timerHours = document.getElementById('timer-hours'),
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


		const updateClock = () => {
			const timer = getTimeRemaining();

			timerHours.textContent = ('0' + timer.hours).slice(-2);
			timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
			timerSeconds.textContent = ('0' + timer.seconds).slice(-2);

			if (timer.timeRemaining <= 0) {
				// eslint-disable-next-line no-use-before-define
				clearInterval(startTimer);
			}
		};

		const startTimer = setInterval(updateClock, 1000);

	};

	countTimer('24 feb 2021');

	// Menu
	const toggleMenu = () => {

		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);
		menuItems.forEach(li => li.addEventListener('click', handlerMenu));
	};
	toggleMenu();

	// Popup
	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close');

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

		popupClose.addEventListener('click', () => {
			popup.style.display = 'none';
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

});
