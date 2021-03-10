import animate from './animate';

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

export default togglePopup;
