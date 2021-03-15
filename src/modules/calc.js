import animate from './animate';

const calc = (price = 1000) => {

	const calckBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		calcCount = document.querySelector('.calc-count'),
		totalValue = document.getElementById('total');

	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1;
		const typeValue = calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSquare.value;

		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}

		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}

		if (typeValue && squareValue) {
			total = price * typeValue * squareValue * countValue * dayValue;
			animate({
				duration: 800,
				timing(timeFraction) {
					return Math.pow(timeFraction, 3);
				},
				draw(progress) {
					totalValue.textContent = Math.floor(total * progress);
				}
			});
		} else if (typeValue === '' || squareValue === 0) {
			console.log('typeValue: ', typeValue);
			animate({
				duration: 800,
				timing(timeFraction) {
					return (1 - Math.pow(timeFraction, 3));
				},
				draw(progress) {
					totalValue.textContent = Math.floor(progress * totalValue.textContent);
				}
			});
		}

	};

	calckBlock.addEventListener('change', event => {
		const target = event.target;

		if (target.matches('select') || target.matches('input')) {
			countSum();
		}
	});
};


export default calc;
