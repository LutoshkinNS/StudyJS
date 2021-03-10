const replaceImg = () => {
	const command = document.getElementById('command');

	command.addEventListener('mouseover', event => {
		const target = event.target;
		if (target.matches('.command__photo')) {
			target.dataset.firstImg = target.getAttribute('src');
			target.src = target.dataset.img;
		}
	});

	command.addEventListener('mouseout', event => {
		const target = event.target;
		if (target.matches('.command__photo')) target.src = target.dataset.firstImg;
	});
};

export default replaceImg;
