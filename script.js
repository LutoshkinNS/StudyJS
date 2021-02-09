'use strict';

const startCalc = document.getElementById(start)
// let isNumber = function (number) {
// 	return !isNaN(parseFloat(number)) && isFinite(number);
// };

// let isStartString = function (string) {
// 	return /^\D+$/.test(string);
// };

// const convertFirstLetterToUpperCase = function (string) {
// 	return string[0].toUpperCase() + string.slice(1);
// };


// // Месячный доход
// const start = function () {
// 	let money = prompt('Ваш месячный доход?', 30000);

// 	while (!isNumber(money)) {
// 		money = prompt('Ваш месячный доход? (Введите число)');
// 	};
// 	return +money;
// };


// let appData = {
// 	mission: 0,
// 	income: {},
// 	addExpenses: '',
// 	deposit: false,
// 	percentDeposit: 0,
// 	moneyDeposit: 0,
// 	budget: start(),
// 	budgetDay: 0,
// 	budgetMonth: 0,
// 	expensesMonth: 0,
// 	period: 12,
// 	expenses: {},
// };
// console.log('appData: ', appData);


// // Воод данных пользователем
// appData.asking = function () {

// 	if (confirm('Есть ли у вас дополнительный заработок?')) {

// 		let itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Фриланс');
// 			while (!isStartString(itemIncome)) {
// 					itemIncome = prompt('Какой у вас есть дополнительный заработок? (Текст не должен начинаться с цифры!)');
// 			};

// 		let cashIncome = prompt('Сумма дополнительного дохода:', 5000);
// 			while (!isNumber(cashIncome)) {
// 					cashIncome = prompt('Сумма дополнительного дохода: (Введите число)');
// 			};

// 		appData.income[itemIncome] = Number(cashIncome);

// 	};


// 	appData.mission = Number(prompt('Планируемая сумма накоплений?', 200000));
// 		while (!isNumber(appData.mission)) {
// 			appData.mission = prompt('Планируемая сумма накоплений? (Введите число)', 200000);
// 		};


// 	let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кафе, такси, театр');
// 		while (!isStartString(addExpenses)) {
// 			addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: (Текст не должен начинаться с цифры!)', 'кафе, такси, театр');
// 		};

// 		addExpenses = addExpenses.split(', ');

// 			for (let itemAddExpenses = 0; itemAddExpenses < addExpenses.length; 	itemAddExpenses++) {
			
// 				addExpenses[itemAddExpenses] = convertFirstLetterToUpperCase(addExpenses	[itemAddExpenses]);
				
// 			};
		
// 		appData.addExpenses = addExpenses.join(', ');


// 	appData.deposit = confirm('Есть ли у вас депозит в банке?');


// 	for (let i = 0; i < 2; i++) {
		
// 		let itemExpenses = prompt('Введите обязательную статью расходов:');
// 			while (!isStartString(itemExpenses)) {
// 					itemExpenses = prompt('Введите обязательную статью расходов: (Текст не должен начинаться с цифры!)');
// 			};


// 		let sumExpenses = prompt('Во сколько это обойдётся?', 3000);
// 			while (!isNumber(sumExpenses)) {
// 					sumExpenses = prompt('Во сколько это обойдётся? (Введите число)');
// 				};

// 			sumExpenses = Number(sumExpenses);
// 		appData.expenses[itemExpenses] = sumExpenses;

// 	};

// };

// const data = appData.asking();

// // Функция вычисления суммы всех обязательных расходов
// appData.getExpensesMonth = function () {

// 	for (let key in appData.expenses) {
// 		appData.expensesMonth += appData.expenses[key];
// 	};

// };

// const sumExpensesMonth = appData.getExpensesMonth();


// // Бюджет
// appData.getBudget = function () {
// 	// Бюджет на месяц
// 	appData.budgetMonth = appData.budget - appData.expensesMonth;

// 	// Бюджет на день
// 	appData.budgetDay = Math.floor(appData.budgetMonth / 30);

// };

// const budgetMonth = appData.getBudget();


// // Срок достижения цели
// appData.getTargetMonth = function () {

// 	if (Number(appData.mission) / appData.budgetMonth >= 0) {
// 		return 'Цель будет достигнута за ' + Math.ceil(Number(appData.mission) / appData.budgetMonth) + ' месяцев(а)'
// 	} 
// 		else {
// 			return 'Цель не будет достигнута';
// 		};

// };


// // Функция вычисления уровня дохода
// appData.getStatusIncome = function() {
// 	if (appData.budgetDay >= 1200) {
// 		return ('У вас высокий уровень дохода');
// 	} 
// 		else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
// 			return ('У вас средний уровень дохода');
// 		} 
// 			else if (appData.budgetDay >= 0 && appData.budgetDay <= 600) {
// 				return ('К сожалению у вас уровень дохода ниже среднего');
// 			} 
// 				else {
// 					return ('Что то пошло не так');
// 				};

// };


// appData.getInfoDeposit = function () {

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

// };

// const infoDeposit = appData.getInfoDeposit();


// appData.calcSavedMoney = function () {

// 	return appData.budgetMonth * appData.period;

// };



// // Вывод данных в консоль
// console.log('Расходы за месяц: ', appData.expenses);
// console.log(appData.getTargetMonth());
// console.log(appData.getStatusIncome());
// console.log('appData.addExpenses: ', appData.addExpenses);

// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
// 	console.log(key + ': ' + appData[key]);
// };