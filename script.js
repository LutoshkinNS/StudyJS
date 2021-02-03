'use strict';

let isNumber = function (number) {
	return !isNaN(parseFloat(number)) && isFinite(number);
};

let money; /*Месячный доход*/
let mission; /*Сумма планируемых накоплений*/
let income; /*Дополнительный доход*/
let incomeName; /*Наименование дополнительного дохода*/
let addExpenses; /* Возможные расходы */
let deposit; /*Наличие депозита*/
let period; /*Период в месяцах*/
let budgetDay; /*Бюджет на день*/
let budgetMonth; /*Бюджет на месяц*/
let expenses1, expenses2; /*Обязательная статья расходов*/
let amount1, amount2; /*Стоимость обязательной статьи расзодов*/


// Воод данных пользователем
const start = function (m) {
	m = prompt('Ваш месячный доход?');

	while (!isNumber(m)) {
		m = prompt('Ваш месячный доход? (Введите число)');
	};
	return Number(m);
};

money = start(money);

mission = Number(prompt('Планируемая сумма накоплений?', 200000));
incomeName = prompt('Введите дополнительный доход', 'Фриланс');
income = Number(prompt('Сумма дополнительного дохода:', 5000));
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кафе, Такси, Театр');
deposit = confirm('Есть ли у вас депозит в банке?');


// Функция вывода типов переменных в консоль
let showTypeOf = function(data) {
	console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(incomeName);
showTypeOf(deposit);


// Сумма всех обязательных расходов за месяц
let expensesArr = [];
let sumExpenses = 0;

const getExpensesMonth = function (expenses, sum) {

	for (let i = 0; i < 2; i++) {
		expenses[i] = prompt('Введите обязательную статью расходов');
		sum = prompt('Во сколько это обойдётся?');

		while (!isNumber(sum)) {
			sum = prompt('Во сколько это обойдётся? (Введите число)');
		};
		sum = Number(sum);
		sum += sum;
	};

	console.log('Обязательные расходы: ', expenses);
	return sum;
};

const sumExpensesMonth = getExpensesMonth(expensesArr, sumExpenses);


// Накопления за месяц
const getAccumulatedMonth = function (salary, additionalIncome, sumExpensesMonth) {
	return salary + additionalIncome - sumExpensesMonth;
};

const accumulatedMonth = getAccumulatedMonth(money, income, sumExpensesMonth);


// Срок достижения цели
const getTargetMonth = function (goal, accumulated) {
	if (Number(goal) / accumulated >= 0) {
		return 'Цель будет достигнута за ' + Math.ceil(Number(goal) / accumulated) + ' месяцев(а)'
	} else {
		return 'Цель не будет достигнута';
	};
};


// Бюджет на день
budgetDay = Math.floor(accumulatedMonth / 30); 


// Функция вычисления уровня дохода
let getStatusIncome = function(budgetDay) {
	if (budgetDay >= 1200) {
		return ('У вас высокий уровень дохода');
	} else if (budgetDay > 600 && budgetDay < 1200) {
		return ('У вас средний уровень дохода');
	} else if (budgetDay >= 0 && budgetDay <= 600) {
		return ('К сожалению у вас уровень дохода ниже среднего');
	} else {
		return ('Что то пошло не так');
	}
};


// console.log('Планируемая сумма накоплений: ', mission);
// console.log('Ваш месячный доход: ', money);
// console.log('Дополнительный заработок: ', income);
// console.log('Наличие депозита: ', deposit);
console.log('Сумма всех обязательных расходов за месяц: ', sumExpensesMonth);
console.log('Возможные расходы: ', addExpenses.toLowerCase().split(', '));
console.log('Накопления за месяц: ', accumulatedMonth);
console.log('Бюджет на день: ', budgetDay);
console.log(getTargetMonth(mission, accumulatedMonth));
console.log(getStatusIncome(budgetDay));