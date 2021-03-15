const scrollWindow = () => {
	const anchors = document.querySelectorAll('a[href*="#"]');

	for (const anchor of anchors) {

		// Исключая все якори с классами
		if (anchor.className) return;

		anchor.addEventListener('click', event => {
			event.preventDefault();

			const blockID = anchor.getAttribute('href').substring(1);

			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	}
};

export default scrollWindow;
