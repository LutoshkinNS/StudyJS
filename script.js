'use strict';

const isNumber = function (number) {
	return !isNaN(parseFloat(number)) && isFinite(number);
};

const isStartString = function (string) {
	return /^\D+$/.test(string);
};

const convertFirstLetterToUpperCase = function (string) {
	return string[0].toUpperCase() + string.slice(1);
};


const start = document.getElementById('start'),
	cancel = document.getElementById('cancel'),
	btnPlus = document.getElementsByTagName('button'),
	incomesPlus = btnPlus[0],
	expensesPlus = btnPlus[1],
	depositCheck = document.querySelector('#deposit-check'),
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
	budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
	expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
	additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
	additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
	incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
	targetMonthValue = document.getElementsByClassName('target_month-value')[0],
	salaryAmount = document.querySelector('.salary-amount'),
	incomeTitle = document.querySelector('.income-title'),
	expensesTitle = document.querySelector('.expenses-title'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select'),
	periodAmount = document.querySelector('.period-amount'),
	inputs = document.querySelectorAll('input'),
	depositBank = document.querySelector('.deposit-bank'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositPercent = document.querySelector('.deposit-percent');



let expensesItems = document.querySelectorAll('.expenses-items'),
	incomesItems = document.querySelectorAll('.income-items');


class AppData {

	constructor () {
		this.budget = 0;
		this.expenses = {};
		this.expensesMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
	};

	checkValid () {
		let inputs = document.querySelectorAll('input');
		
		inputs.forEach ((item) => {
			if (item.placeholder === 'Сумма' || item.className.includes('amount')) {
				item.addEventListener('input', function () {
					item.value = item.value.replace(/[^0-9]/,'');
				});
			} else if (item.placeholder === 'Наименование' || item.placeholder === 'название' || item.className.includes('title')) {
				item.addEventListener('input', function () {
					item.value = item.value.replace(/[^А-Яа-я,. ]/,'');
				});
			};
		});
	};

	getValuePeriodSelected () {
		periodAmount.textContent = periodSelect.value;
	};

};


class StartCalc extends AppData {
	constructor () {
		super();
		this.checkValid();
		this.getValuePeriodSelected();
		salaryAmount.addEventListener('change', () => {start.disabled = false});
		start.addEventListener('click', this.startCalc.bind(this));
		incomesPlus.addEventListener('click', this.addIncomesBlock.bind(this));
		expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
		periodSelect.addEventListener('input', this.getValuePeriodSelected.bind(this));
		cancel.addEventListener('click', this.resetCalc.bind(this));
		depositCheck.addEventListener('change', this.depositHandler.bind(this));
		depositPercent.addEventListener('input', this.depositPercentValid.bind(this));

	};

	startCalc () {
		if (salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value.trim())) {
			start.disabled = true;
			return alert('Ошибка, поле "Месячный доход" должно быть заполнено');
		} else {
			this.getData();
			this.blockingInputs();
			this.addBtnReset();
		};
	};

	getData () {
		this.budget = +salaryAmount.value;
		this.getIncome();
		this.getAddIncome();
		this.getExpenses();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getInfoDeposit();
		this.getBudget();

		this.showResult();
	};

	blockingInputs () {
		let inputsTypeText = document.querySelectorAll('.data input[type=text]');
			inputsTypeText.forEach((item) => {
				item.disabled = true;
			});
		incomesPlus.disabled = true;
		expensesPlus.disabled = true;
	};

	addBtnReset () {
		start.style.display = 'none';
		cancel.style.display = 'block';
	};

	showResult () {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		additionalIncomeValue.value = this.addIncome.join(', ');
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcPeriod();
		periodSelect.addEventListener('input', this.calcPeriod.bind(this));
	};

	removePlaceholder (cloneElement) {
		for (let node of cloneElement.children) {
			node.value = '';
			node.placeholder = '';
		};
	};

	addIncomesBlock () {
		let cloneIncomesItem = incomesItems[0].cloneNode(true);
		incomesItems[0].parentNode.insertBefore(cloneIncomesItem, incomesPlus);

		this.removePlaceholder(cloneIncomesItem);

		incomesItems = document.querySelectorAll('.income-items');

			if (incomesItems.length === 3) {
				incomesPlus.style.display = 'none';
			};
		this.checkValid();
	};

	getIncome () {
		incomesItems.forEach((item) => {
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				this.income[itemIncome] = +cashIncome;
			};
		}, this);

		for (let key in this.income) {
			this.incomeMonth += this.income[key];
		};
	};

	getAddIncome () {
		additionalIncomeItem.forEach((item) => {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			};
		}, this);
	};

	addExpensesBlock () {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

		this.removePlaceholder(cloneExpensesItem);

		expensesItems = document.querySelectorAll('.expenses-items');

			if (expensesItems.length === 3) {
				expensesPlus.style.display = 'none';
			};
		this.checkValid();
	};

	getExpenses () {
		expensesItems.forEach((item) => {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				this.expenses[itemExpenses] = +cashExpenses;
			};
		}, this);
	};

	getAddExpenses () {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach((item) => {
			item = item.trim();
			if (item !== ''){
				this.addExpenses.push(item);
			};
		}, this);
	};

	getExpensesMonth () {
		for (let key in this.expenses) {
			this.expensesMonth += Number(this.expenses[key]);
		};
	};

	getBudget () {
		const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	};

	getTargetMonth () {
		let targetMonth = targetAmount.value;
		if (Number(targetMonth) / this.budgetMonth >= 0) {
			return Math.ceil(Number(targetMonth) / this.budgetMonth);
		} else {
			return 'Цель не будет достигнута';
		};
	};

	calcPeriod () {
		incomePeriodValue.value = this.budgetMonth * periodSelect.value;
		return incomePeriodValue.value;
	};

	getInfoDeposit () {
		if (this.deposit) {
			this.percentDeposit = depositPercent.value;
			this.moneyDeposit = depositAmount.value;
		}
	};

	depositPercentValid () {
		if (isNumber(depositPercent.value) && depositPercent.value >= 0 && depositPercent.value <= 100) {
			start.disabled = false;
			depositPercent.value = depositPercent.value;
		} else {
			depositPercent.value = '';
			start.disabled = true;
		};
	};

	changePercent () {
		const valueSelect = this.value;
		if (valueSelect === 'other') {
			depositPercent.value = '';
			depositPercent.style.display = 'inline-block';
		} else {
			depositPercent.style.display = 'none';
			depositPercent.value = valueSelect;
		};

	}

	depositHandler () {
		if (depositCheck.checked) {
			depositBank.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';
			this.deposit = true;
			depositBank.addEventListener('change', this.changePercent);
		} else {
			depositBank.style.display = 'none';
			depositAmount.style.display = 'none';
			depositPercent.style.display = 'none';
			depositBank.value = '';
			depositAmount.value = '';
			depositPercent.value = '';
			this.deposit = false;
			depositBank.removeEventListener('change', this.changePercent);
		};
	};

	resetCalc () {
		this.removesContentInputs();
		this.removesDisabletInputs();
		this.removesExpensesBlock();
		this.removesIncomesBlock();
		this.removesContentSelect();
		this.getStartBtn();
		this.removeContentIncome();
		this.removeContentExpenses();
		this.removeContentAppData();

	};

	// Удаляет содержимое всех input
	removesContentInputs () {
		inputs.forEach((item) => {
			item.value = '';
		}, this);
	};

	// Снимает блокирвку полей ввода и кнопок плюс
	removesDisabletInputs () {
		let inputsTypeText = document.querySelectorAll('.data input[type=text]');

		inputsTypeText.forEach((item) =>{
			item.disabled = false;
		}, this);
		expensesPlus.disabled = false;
		incomesPlus.disabled = false;
	};
	
	// Удаляет дополнительные поля "дополнительные доходы", возвращает кнопку плюс
	removesIncomesBlock () {
		incomesItems.forEach((item) => {
			if (item !== incomesItems[0]) {
				item.remove();
			};
		},this);
	
		incomesItems = document.querySelectorAll('.income-items');
		incomesPlus.style.display = 'block';
	};

	// Удаляет дополнительные поля "обязательные расходы", возвращает кнопку плюс
	removesExpensesBlock () {
		expensesItems.forEach((item) => {
			if (item !== expensesItems[0]) {
				item.remove();
			};
		},this);
		expensesItems = document.querySelectorAll('.expenses-items');
		expensesPlus.style.display = 'block';
	};

	// Возаращает в инсходное состояние селектор периода расчета
	removesContentSelect () {
		periodSelect.value = 1;
		periodAmount.value = 1;
		this.getValuePeriodSelected();
	};

	// Возвращает кнопку расчитать
	getStartBtn () {
		start.style.display = 'block';
		cancel.style.display = 'none';
	};

	// Удаляет содержимое из объекта с ключом income
	removeContentIncome () {
		for (let key in this.income) {
			delete this.income[key];
		};
	};

	// Удаляет содержимое из объекта с ключом expenses
	removeContentExpenses () {
		for (let key in this.expenses) {
			delete this.expenses[key];
		};
	};

	removeContentAppData () {
		this.budget = 0,
		this.expenses = {},
		this.expensesMonth = 0,
		this.income = {},
		this.incomeMonth = 0,
		this.addIncome = [],
		this.addExpenses = [],
		this.deposit = false,
		this.percentDeposit = 0,
		this.moneyDeposit = 0,
		this.budgetDay = 0,
		this.budgetMonth = 0;
	};
};

const calculate = new StartCalc();




