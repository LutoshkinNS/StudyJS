'use strict';

let isNumber = function (number) {
	return !isNaN(parseFloat(number)) && isFinite(number);
};

let money; /*Месячный доход*/

// Воод данных пользователем
const start = function (m) {
	m = prompt('Ваш месячный доход?', 30000);

	while (!isNumber(m)) {
		m = prompt('Ваш месячный доход? (Введите число)');
	};
	return Number(m);
};

money = start(money);

let appData = {
	mission: 0,
	incomeName: 0,
	income: 0,
	addExpenses: [],
	deposit: false,
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	expenses: {},
};

// Воод данных пользователем
appData.asking = function () {

	appData.mission = Number(prompt('Планируемая сумма накоплений?', 200000));
	appData.incomeName = prompt('Введите дополнительный доход', 'Фриланс');
	appData.income = Number(prompt('Сумма дополнительного дохода:', 5000));

	let addExpenses = prompt('Перечислите возможные расходы за 	рассчитываемый период через запятую', 'Кафе, Такси, Театр');
	appData.addExpenses = addExpenses.toLowerCase().split(', ');
	appData.deposit = confirm('Есть ли у вас депозит в банке?');

	for (let i = 0; i < 2; i++) {
		
		let e = prompt('Введите обязательную статью расходов')

		let sum = prompt('Во сколько это обойдётся?', 3000);
		while (!isNumber(sum)) {
				sum = prompt('Во сколько это обойдётся? (Введите число)');
			};
			sum = Number(sum);
			appData.expenses[e] = sum;
	};
};

const expensesM = appData.asking();

// Функция вычисления суммы всех обязательных расходов
appData.getExpensesMonth = function () {
	for (let key in appData.expenses) {
		appData.expensesMonth += appData.expenses[key];
	};
};

const sumExpensesMonth = appData.getExpensesMonth();


// Бюджет
appData.getBudget = function () {
	// Бюджет на месяц
	appData.budgetMonth = appData.budget + appData.income - appData.expensesMonth;

	// Бюджет на день
	appData.budgetDay = Math.floor(appData.budgetMonth / 30);
};

const budgetM = appData.getBudget();


// Срок достижения цели
appData.getTargetMonth = function () {
	if (Number(appData.mission) / appData.budgetMonth >= 0) {
		return 'Цель будет достигнута за ' + Math.ceil(Number(appData.mission) / appData.budgetMonth) + ' месяцев(а)'
	} else {
		return 'Цель не будет достигнута';
	};
};


// Функция вычисления уровня дохода
appData.getStatusIncome = function() {
	if (appData.budgetDay >= 1200) {
		return ('У вас высокий уровень дохода');
	} else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
		return ('У вас средний уровень дохода');
	} else if (appData.budgetDay >= 0 && appData.budgetDay <= 600) {
		return ('К сожалению у вас уровень дохода ниже среднего');
	} else {
		return ('Что то пошло не так');
	}
};

// Вывод данных в консоль
console.log('Расходы за месяц: ', appData.expenses);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
	console.log(key + ': ' + appData[key]);
}