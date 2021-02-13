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
	periodAmount = document.querySelector('.period-amount');

let expensesItems = document.querySelectorAll('.expenses-items'),
	incomesItems = document.querySelectorAll('.income-items');



let appData = {
	budget: 0,
	income: {},
	incomeMonth: 0,
	addIncome: [],
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	expenses: {},
	start: function () {

		appData.budget = +salaryAmount.value;
		appData.getIncome();
		appData.getExpenses();
		appData.getExpensesMonth();
		appData.getAddExpenses();
		appData.getAddIncome();
		appData.getBudget();
		
		appData.showResult();
	},
	showResult: function () {
		budgetMonthValue.value = appData.budgetMonth;
		budgetDayValue.value = appData.budgetDay;
		expensesMonthValue.value = appData.expensesMonth;
		additionalExpensesValue.value = appData.addExpenses.join(', ');
		additionalIncomeValue.value = appData.addIncome.join(', ')
		targetMonthValue.value = appData.getTargetMonth();
		incomePeriodValue.value = appData.calcPeriod();
		periodSelect.addEventListener('input', appData.calcPeriod);
	},
	addExpensesBlock: function () {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

		removePlaceholder(cloneExpensesItem);

		expensesItems = document.querySelectorAll('.expenses-items');
			if (expensesItems.length === 3) {
				expensesPlus.style.display = 'none';
			};
	},
	getExpenses: function () {
		expensesItems.forEach(function (item) {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			appData.expenses[itemExpenses] = cashExpenses;
		});
	},
	addIncomesBlock: function () {
		let cloneIncomesItem = incomesItems[0].cloneNode(true);
		incomesItems[0].parentNode.insertBefore(cloneIncomesItem, incomesPlus);

		removePlaceholder(cloneIncomesItem);

		incomesItems = document.querySelectorAll('.income-items');
			if (incomesItems.length === 3) {
				incomesPlus.style.display = 'none';
			};
	},

	getIncome: function () {
		incomesItems.forEach(function (item) {
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			appData.income[itemIncome] = +cashIncome;
		});

		for (let key in appData.income) {
			appData.incomeMonth += appData.income[key];
		};
	},
	getAddExpenses: function () {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(function (item) {
			item = item.trim();
			if (item !== ''){
				appData.addExpenses.push(item);
			};
		});
	},
	getAddIncome: function () {
		additionalIncomeItem.forEach(function (item) {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				appData.addIncome.push(itemValue);
			};
		});
	},
	asking: function () {

			addExpenses = addExpenses.split(', ');
				for (let itemAddExpenses = 0; itemAddExpenses < addExpenses.length; itemAddExpenses++) {
					addExpenses[itemAddExpenses] = convertFirstLetterToUpperCase(addExpenses[itemAddExpenses]);
				};
			appData.addExpenses = addExpenses.join(', ');

		appData.deposit = confirm('Есть ли у вас депозит в банке?');
	},

	getExpensesMonth: function () {
		for (let key in appData.expenses) {
			appData.expensesMonth += Number(appData.expenses[key]);
		};
	},

	getBudget: function () {
		appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},

	getTargetMonth: function () {
		let targetMonth = targetAmount.value;
		if (Number(targetMonth) / appData.budgetMonth >= 0) {
			return Math.ceil(Number(targetMonth) / appData.budgetMonth);
		} else {
			return 'Цель не будет достигнута';
		};
	},

	getStatusIncome: function() {
		if (appData.budgetDay >= 1200) {
			return ('У вас высокий уровень дохода');
		} 
			else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
				return ('У вас средний уровень дохода');
			} 
				else if (appData.budgetDay >= 0 && appData.budgetDay <= 600) {
					return ('К сожалению у вас уровень дохода ниже среднего');
				} 
					else {
						return ('Что то пошло не так');
					};
	},

	getInfoDeposit: function () {
		if (appData.deposit) {
			appData.percentDeposit = prompt('Какой годовой процент?', 10);
				while (!isNumber(appData.percentDeposit)) {
						appData.percentDeposit = prompt('Какой годовой процент? (Введите число)');
				};

			appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
				while (!isNumber(appData.moneyDeposit)) {
						appData.moneyDeposit = prompt('Какая сумма заложена? (Введите число)');
				};
		};
	},
	calcPeriod: function () {
		incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
		return incomePeriodValue.value;
	},
};

const removePlaceholder = function (cloneElement) {
	for (let node of cloneElement.children) {
		node.value = '';
		node.placeholder = '';
	};
};

const getValuePeriodSelected = function () {
	periodAmount.textContent = periodSelect.value;
};

periodSelect.addEventListener('input', getValuePeriodSelected);

const checkValid = function () {
	let inputs = document.querySelectorAll('input');

	inputs.forEach (function (item) {
		if (item.placeholder === 'Сумма') {
			item.addEventListener('change', function () {
				if (isNumber(item.value) || item.value === '') {
					return true;
				} else {
					return alert('Ошибка, поле "Сумма" должно содержать цифры');
				};
			});
		} else if (item.placeholder === 'Наименование') {
			item.addEventListener('change', function () {
				if (/^[А-Яа-яЁё.,-_?!":;()`\s]+$/.test(item.value) || item.value=== 	'') {
					return true;
				} else {
					return alert('Ошибка, поле "Обязательные расходы" должносодержать 	только русские буквы и знаки препинания');
				};
			});
		};
	});
};
checkValid();


start.addEventListener('click', function () {
	if (salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value.trim())) {
	start.disablet = true;
	alert('Ошибка, поле "Месячный доход" должно быть заполнено');
	} else {
		appData.start();
	};
});


incomesPlus.addEventListener('click', appData.addIncomesBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);



// // Вывод данных в консоль
// console.log('Расходы за месяц: ', appData.expenses);
// console.log(appData.getTargetMonth());
// console.log(appData.getStatusIncome());
// console.log('appData.addExpenses: ', appData.addExpenses);

// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
// 	console.log(key + ': ' + appData[key]);
// };