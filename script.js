'use strict';

let isNumber = function (number) {
	return !isNaN(parseFloat(number)) && isFinite(number);
};

let isStartString = function (string) {
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
	depositAmount = document.querySelector('.deposit-amount'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select'),
	periodAmount = document.querySelector('.period-amount'),
	inputs = document.querySelectorAll('input'),
	inputsTypeText = document.querySelectorAll('.data input[type=text]');


let expensesItems = document.querySelectorAll('.expenses-items'),
	incomesItems = document.querySelectorAll('.income-items');


let appData = {
	budget: 0,
	expenses: {},
	expensesMonth: 0,
	income: {},
	incomeMonth: 0,
	addIncome: [],
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	budgetDay: 0,
	budgetMonth: 0,
	start: function () {

		this.budget = +salaryAmount.value;
		this.getIncome();
		this.getExpenses();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		
		this.showResult();
	},

	showResult: function () {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ')
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcPeriod();
		periodSelect.addEventListener('input', this.calcPeriod.bind(appData));
	},
	
	addExpensesBlock: function () {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

		removePlaceholder(cloneExpensesItem);

		expensesItems = document.querySelectorAll('.expenses-items');

			if (expensesItems.length === 3) {
				expensesPlus.style.display = 'none';
			};

		checkValid();
	},

	getExpenses: function () {
		expensesItems.forEach(function (item) {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			this.expenses[itemExpenses] = +cashExpenses;
		}, this);
	},

	addIncomesBlock: function () {
		let cloneIncomesItem = incomesItems[0].cloneNode(true);
		incomesItems[0].parentNode.insertBefore(cloneIncomesItem, incomesPlus);

		removePlaceholder(cloneIncomesItem);

		incomesItems = document.querySelectorAll('.income-items');
			if (incomesItems.length === 3) {
				incomesPlus.style.display = 'none';
			};
		checkValid();
	},

	getIncome: function () {
		incomesItems.forEach(function (item) {
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			this.income[itemIncome] = +cashIncome;
		}, this);

		for (let key in this.income) {
			this.incomeMonth += appData.income[key];
		};
	},

	getAddExpenses: function () {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(function (item) {
			item = item.trim();
			if (item !== ''){
				this.addExpenses.push(item);
			};
		}, this);
	},

	getAddIncome: function () {
		additionalIncomeItem.forEach(function (item) {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				this.addIncome.push(itemValue);
			};
		}, this);
	},

	asking: function () {

			addExpenses = addExpenses.split(', ');
				for (let itemAddExpenses = 0; itemAddExpenses < addExpenses.length; itemAddExpenses++) {
					addExpenses[itemAddExpenses] = convertFirstLetterToUpperCase(addExpenses[itemAddExpenses]);
				};
			this.addExpenses = addExpenses.join(', ');

		this.deposit = confirm('Есть ли у вас депозит в банке?');
	},

	getExpensesMonth: function () {
		for (let key in this.expenses) {
			this.expensesMonth += Number(this.expenses[key]);
		};
	},

	getBudget: function () {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	},

	getTargetMonth: function () {
		let targetMonth = targetAmount.value;
		if (Number(targetMonth) / this.budgetMonth >= 0) {
			return Math.ceil(Number(targetMonth) / this.budgetMonth);
		} else {
			return 'Цель не будет достигнута';
		};
	},

	// getStatusIncome: function() {
	// 	if (this.budgetDay >= 1200) {
	// 		return ('У вас высокий уровень дохода');
	// 	} 
	// 		else if (this.budgetDay > 600 && this.budgetDay < 1200) {
	// 			return ('У вас средний уровень дохода');
	// 		} 
	// 			else if (this.budgetDay >= 0 && this.budgetDay <= 600) {
	// 				return ('К сожалению у вас уровень дохода ниже среднего');
	// 			} 
	// 				else {
	// 					return ('Что то пошло не так');
	// 				};
	// },

	// getInfoDeposit: function () {
	// 	if (appData.deposit) {
	// 		appData.percentDeposit = prompt('Какой годовой процент?', 10);
	// 			while (!isNumber(appData.percentDeposit)) {
	// 					appData.percentDeposit = prompt('Какой годовой процент? (Введите число)');
	// 			};

	// 		appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
	// 			while (!isNumber(appData.moneyDeposit)) {
	// 					appData.moneyDeposit = prompt('Какая сумма заложена? (Введите число)');
	// 			};
	// 	};
	// },

	calcPeriod: function () {
		console.log(this);
		incomePeriodValue.value = this.budgetMonth * periodSelect.value;
		return incomePeriodValue.value;
	},

	resetCalc: function () {

		this.removesContentInputs();
		this.removesDisapletInputsTypeText();
		this.removesExpensesBlock();
		this.removesIncomesBlock();
		this.removesContentSelect();
		this.getStartBtn();
	},

	removesContentInputs: function () {
		inputs.forEach(function(item){
		item.value = '';
	});
	},
	
	removesDisapletInputsTypeText: function () {
		inputsTypeText.forEach(function(item){
			item.disabled = false;
		});
	},

	removesExpensesBlock: function () {
		expensesItems.forEach(function (item) {
			if (item !== expensesItems[0]) {
				item.remove();
			};
		});
		expensesPlus.style.display = 'block';
	},

	removesIncomesBlock: function () {
		incomesItems.forEach(function (item) {
			if (item !== incomesItems[0]) {
				item.remove();
			};
		});
		incomesPlus.style.display = 'block';
	},

	removesContentSelect: function () {
		periodSelect.value = 1;
		periodAmount.value = 1;
		getValuePeriodSelected();
	},

	getStartBtn: function () {
		start.style.display = 'block';
		cancel.style.display = 'none';
	}
};

console.log(appData);

const removePlaceholder = function (cloneElement) {
	for (let node of cloneElement.children) {
		node.value = '';
		node.placeholder = '';
	};
};

const getValuePeriodSelected = function () {
	periodAmount.textContent = periodSelect.value;
};

periodSelect.addEventListener('input', getValuePeriodSelected.bind(appData));

const checkValid = function () {
	let inputs = document.querySelectorAll('input');

	inputs.forEach (function (item) {
		if (item.placeholder === 'Сумма' || item.className.includes('amount')) {
			item.addEventListener('input', function () {
				item.value = item.value.replace(/^\D+$/, '');
			});
		} else if (item.placeholder === 'Наименование' || item.placeholder === 'название' || item.className.includes('title')) {
			item.addEventListener('input', function () {
				item.value = item.value.replace(/[1-9]$|[^А-Яа-яЁё.,-_?!":;()`\s]+$/, '');
			});
		};
	});
};
checkValid();

const blockingInputs = function () {
		inputsTypeText.forEach(function(item){
			item.disabled = true;
		})
};

const addBtnReset = function () {
	start.style.display = 'none';
	cancel.style.display = 'block';
};

const initialization = function () {

	if (salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value.trim())) {
		start.disabled = true;
		alert('Ошибка, поле "Месячный доход" должно быть заполнено');
	} else {
		this.start();

		blockingInputs();

		addBtnReset();
	};
};

const initializationCansel = function () {
	this.resetCalc();
};


start.addEventListener('click', initialization.bind(appData));
cancel.addEventListener('click', initializationCansel.bind(appData));



incomesPlus.addEventListener('click', appData.addIncomesBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
