document.addEventListener('DOMContentLoaded', () => {
		'use strict';

		const select = document.getElementById('cars'),
				output = document.getElementById('output'),
				adres = './cars.json';

		const sendRequest = (method, url) => {
			return new Promise ((resolve, reject) => {
				select.addEventListener('change', () => {
					const request = new XMLHttpRequest();
					request.open(method, url);
					request.setRequestHeader('Content-type', 'application/json');
					request.send();
					request.addEventListener('readystatechange', () => {
						if (request.readyState !== 4) {
							return
						}
						if (request.status === 200) {
							const data = JSON.parse(request.responseText);
							resolve(data);
						} else {
							reject(request.status)
						}
					});
				});
			});
		}

		sendRequest('GET', adres)
			.then(data => {
				data.cars.forEach(item => {
						if (item.brand === select.value) {
								const {brand, model, price} = item;
								output.innerHTML = `Тачка ${brand} ${model} <br>
								Цена: ${price}$`;
						}
				});
			})
			.catch(error => {
				output.innerHTML = 'Произошла ошибка';
				console.error(error);
			});
});