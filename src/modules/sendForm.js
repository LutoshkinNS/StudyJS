const sendForm = () => {
	const errorMessage = 'Что то пошло не так...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
		popup = document.querySelector('.popup'),
		loader = `
			<div id="floatingCirclesG">
				<div class="f_circleG" id="frotateG_01"></div>
				<div class="f_circleG" id="frotateG_02"></div>
				<div class="f_circleG" id="frotateG_03"></div>
				<div class="f_circleG" id="frotateG_04"></div>
				<div class="f_circleG" id="frotateG_05"></div>
				<div class="f_circleG" id="frotateG_06"></div>
				<div class="f_circleG" id="frotateG_07"></div>
				<div class="f_circleG" id="frotateG_08"></div>
			</div>
		`;

	const forms = document.querySelectorAll('form');

	// Создаём элемент статуса запроса
	const statusMessage = document.createElement('div');
	statusMessage.style.cssText = `
			font-size: 2rem;
			color: white;
			`;
	statusMessage.innerHTML = loader;

	// Отправка данных на сервер
	const postData = body =>
		fetch('./server.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body),
		});

	// подготавливаем данные для отправки из формы
	forms.forEach(form => {
		form.addEventListener('submit', event => {
			event.preventDefault();
			// добавляем статус отправки
			form.appendChild(statusMessage);

			const formData = new FormData(form);
			const body = {};

			// заполняем объект с данными
			formData.forEach((val, key) => {
				body[key] = val;
			});

			postData(body)
				.then(response => {
					if (response.status !== 200) {
						throw new Error('status network not 200');
					}
					// выводим сообщение об успешной отправке
					statusMessage.textContent = successMessage;
					setTimeout(() => {
						statusMessage.innerHTML = loader;
						statusMessage.remove();
						popup.style.display = 'none';
					}, 5000);
					const inputs = document.querySelectorAll('form input');
					// Очищаем поля
					inputs.forEach(input => {
						input.value = '';
					});
				})
			// error возврящается из reject
				.catch(error => {
					// выводим сообщение об ошибке
					statusMessage.textContent = errorMessage;
					setTimeout(() => {
						statusMessage.innerHTML = loader;
						statusMessage.remove();
						popup.style.display = 'none';
					}, 5000);
					const inputs = document.querySelectorAll('form input');
					// Очищаем поля
					inputs.forEach(input => {
						input.value = '';
					});
					// выводит статус ошибки в консоль
					console.error(error);
				});
		});
	});
};

export default sendForm;
