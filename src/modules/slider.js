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

export default slider;
