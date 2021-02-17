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
	inputs = document.querySelectorAll('input');


let expensesItems = document.querySelectorAll('.expenses-items'),
	incomesItems = document.querySelectorAll('.income-items');


const AppData = function () {

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

AppData.prototype.start = function () {

	this.budget = +salaryAmount.value;
	this.getIncome();
	this.getExpenses();
	this.getExpensesMonth();
	this.getAddExpenses();
	this.getAddIncome();
	this.getBudget();
	
	this.showResult();
};

AppData.prototype.showResult = function () {
	budgetMonthValue.value = this.budgetMonth;
	budgetDayValue.value = this.budgetDay;
	expensesMonthValue.value = this.expensesMonth;
	additionalExpensesValue.value = this.addExpenses.join(', ');
	additionalIncomeValue.value = this.addIncome.join(', ')
	targetMonthValue.value = this.getTargetMonth();
	incomePeriodValue.value = this.calcPeriod();
	periodSelect.addEventListener('input', this.calcPeriod.bind(this));
};

AppData.prototype.removePlaceholder = function (cloneElement) {
	for (let node of cloneElement.children) {
		node.value = '';
		node.placeholder = '';
	};
};

AppData.prototype.addExpensesBlock = function () {

	let cloneExpensesItem = expensesItems[0].cloneNode(true);
	expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

	this.removePlaceholder(cloneExpensesItem);

	expensesItems = document.querySelectorAll('.expenses-items');

		if (expensesItems.length === 3) {
			expensesPlus.style.display = 'none';
		};

	this.checkValid();
};

AppData.prototype.getExpenses = function () {
	expensesItems.forEach(function (item) {
		let itemExpenses = item.querySelector('.expenses-title').value;
		let cashExpenses = item.querySelector('.expenses-amount').value;
		if (itemExpenses !== '' && cashExpenses !== '') {
			this.expenses[itemExpenses] = +cashExpenses;
		};
	}, this);
};

AppData.prototype.addIncomesBlock = function () {

	let cloneIncomesItem = incomesItems[0].cloneNode(true);
	incomesItems[0].parentNode.insertBefore(cloneIncomesItem, incomesPlus);

	this.removePlaceholder(cloneIncomesItem);

	incomesItems = document.querySelectorAll('.income-items');

		if (incomesItems.length === 3) {
			incomesPlus.style.display = 'none';
		};

	this.checkValid();
};

AppData.prototype.getIncome = function () {
	incomesItems.forEach(function (item) {
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

AppData.prototype.getAddExpenses = function () {
	let addExpenses = additionalExpensesItem.value.split(',');
	addExpenses.forEach(function (item) {
		item = item.trim();
		if (item !== ''){
			this.addExpenses.push(item);
		};
	}, this);
};

AppData.prototype.getAddIncome = function () {
	additionalIncomeItem.forEach(function (item) {
		let itemValue = item.value.trim();
		if (itemValue !== '') {
			this.addIncome.push(itemValue);
		};
	}, this);
};

AppData.prototype.asking = function () {
	addExpenses = addExpenses.split(', ');
		for (let itemAddExpenses = 0; itemAddExpenses < addExpenses.length; itemAddExpenses++) {
			addExpenses[itemAddExpenses] = convertFirstLetterToUpperCase(addExpenses[itemAddExpenses]);
			};
		this.addExpenses = addExpenses.join(', ');

	this.deposit = confirm('Есть ли у вас депозит в банке?');
	};

AppData.prototype.getExpensesMonth = function () {
	for (let key in this.expenses) {
		this.expensesMonth += Number(this.expenses[key]);
	};
};

AppData.prototype.getBudget = function () {
	this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
	this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
	let targetMonth = targetAmount.value;
	if (Number(targetMonth) / this.budgetMonth >= 0) {
		return Math.ceil(Number(targetMonth) / this.budgetMonth);
	} else {
		return 'Цель не будет достигнута';
	};
};

AppData.prototype.calcPeriod = function () {
	incomePeriodValue.value = this.budgetMonth * periodSelect.value;
	return incomePeriodValue.value;
};

AppData.prototype.resetCalc = function () {
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

AppData.prototype.removesContentInputs = function () {
	inputs.forEach(function(item){
	item.value = '';
});
};

AppData.prototype.removesDisabletInputs = function (){
	let inputsTypeText = document.querySelectorAll('.data input[type=text]');

	inputsTypeText.forEach(function(item){
		item.disabled = false;
	});
	expensesPlus.disabled = false;
	incomesPlus.disabled = false;
};

AppData.prototype.removesExpensesBlock = function () {
	expensesItems.forEach(function (item) {
		if (item !== expensesItems[0]) {
			item.remove();
		};
	},this);
	expensesItems = document.querySelectorAll('.expenses-items');
	expensesPlus.style.display = 'block';
};

AppData.prototype.removesIncomesBlock = function () {
	incomesItems.forEach(function (item) {
		if (item !== incomesItems[0]) {
			item.remove();
		};
	},this);

	incomesItems = document.querySelectorAll('.income-items');
	incomesPlus.style.display = 'block';
};

AppData.prototype.removesContentSelect = function () {
	periodSelect.value = 1;
	periodAmount.value = 1;
	this.getValuePeriodSelected();
};

AppData.prototype.getStartBtn = function () {
	start.style.display = 'block';
	cancel.style.display = 'none';
};

AppData.prototype.removeContentIncome = function () {
	for (let key in this.income) {
	delete this.income[key];
};
};

AppData.prototype.removeContentExpenses = function () {
	for (let key in this.expenses) {
	delete this.expenses[key];
};
};

AppData.prototype.removeContentAppData = function () {
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

AppData.prototype.getValuePeriodSelected = function () {
	periodAmount.textContent = periodSelect.value;
};


AppData.prototype.blockingInputs = function () {
		let inputsTypeText = document.querySelectorAll('.data input[type=text]');

		inputsTypeText.forEach(function(item){
			item.disabled = true;
		});
		incomesPlus.disabled = true;
		expensesPlus.disabled = true;
};

AppData.prototype.addBtnReset = function () {
	start.style.display = 'none';
	cancel.style.display = 'block';
};

AppData.prototype.initialization = function () {

	if (salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value.trim())) {
		start.disabled = true;
		alert('Ошибка, поле "Месячный доход" должно быть заполнено');
		return;
	} else {
		this.start();

		this.blockingInputs();

		this.addBtnReset();
	};
};

AppData.prototype.initializationCansel = function () {
	this.resetCalc();
};

AppData.prototype.checkValid = function () {
	let inputs = document.querySelectorAll('input');
	
	inputs.forEach (function (item) {
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

AppData.prototype.eventlistener = function () {
	this.checkValid();
	periodSelect.addEventListener('input', this.getValuePeriodSelected.bind(this));
	start.addEventListener('click', this.initialization.bind(this));
	cancel.addEventListener('click', this.initializationCansel.bind(this));
	incomesPlus.addEventListener('click', this.addIncomesBlock.bind(this));
	expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
};

const appData = new AppData();

appData.eventlistener();

