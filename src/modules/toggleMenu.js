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

export default toggleMenu;
