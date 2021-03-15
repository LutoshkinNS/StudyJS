const validation = () => {
	// calcValidation
	const calcInputs = document.querySelectorAll('.calc input');

	calcInputs.forEach(input => {
		input.addEventListener('input', () => {
			const text = input.value;
			input.value = text.replace(/\D/g, '');
		});
	});

	// inputsValidation
	document.addEventListener('input', event => {
		const target = event.target;
		let text = target.value;

		if (target.matches('.form-name')) {
			target.value = text.replace(/[^А-Яа-яЁё\\ ]/g, '');
		} else if (target.matches('.form-email')) {
			target.value = text.replace(/[^A-z\\@\\-\\_\\.\\!\\~\\*\\']/g, '');
		} else if (target.matches('.form-phone')) {
			target.value = text.replace(/[^\d\\()\\-\\+]/g, '');
		} else if (target.matches('.mess')) {
			target.value = text.replace(/[^А-Яа-яЁё,\\.\\?\\!\\ -]/g, '');
		}

		target.addEventListener('blur', () => {
			text = target.value;
			text = text.replace(/\s+/g, ' ');
			text = text.replace(/-+/g, '-');
			text = text.replace(/\++/g, '+');
			text = text.replace(/@+/g, '@');
			text = text.replace(/^ |^-| $|-$/g, '');

			if (target.matches('.form-name') && !(/[А-Яа-яЁё]{2,}/g).test(text)) {
				text = '';
			} else if (target.matches('.form-phone') && !(/^.?([0-9]{7,13})$/g).test(text)) {
				text = '';
			}
			if (target.matches('.form-name')) {
				text = text.replace(/.+/g, match => match.toLowerCase());
				text = text.replace(/(^|\s|-)\S/g, match => match.toUpperCase());
			}

			target.value = text.trim();
		});
	});
};

export default validation;
