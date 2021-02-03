'use strict';

let money; /*Месячный доход*/
let mission; /*Сумма планируемых накоплений*/
let income; /*Дополнительный доход*/
let incomeName; /*Наименование дополнительного дохода*/
let addExpenses; 
let deposit; /*Наличие депозита*/
let period; /*Период в месяцах*/
let budgetDay; /*Бюджет на день*/
let budgetMonth; /*Бюджет на месяц*/
let expenses1, expenses2; /*Обязательная статья расходов*/
let amount1, amount2; /*Стоимость обязательной статьи расзодов*/

mission = Number(prompt('Планируемая сумма накоплений?', 200000));
money = Number(prompt('Ваш месячный доход?', 30000));
incomeName = prompt('Введите дополнительный доход', 'Фриланс');
income = Number(prompt('Сумма дополнительного дохода:', 5000));
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Интернет, Такси, Коммуналка');
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов', 'Интернет');
amount1 = Number(prompt('Во сколько это обойдётся?', 800));
expenses2 = prompt('Введите обязательную статью расходов', 'Коммуналка');
amount2 = Number(prompt('Во сколько это обойдётся?', 5000));

// Функция вывода типов переменных в консоль
let showTypeOf = function(data) {
	console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(incomeName);
showTypeOf(deposit);


// Сумма всех обязательных расходов за месяц
function getExpensesMonth(exp1, exp2) {
	return exp1 + exp2;
};


// Накопления за месяц
function getAccumulatedMonth(salary, additionalIncome, exp1, exp2) {
	return salary + additionalIncome - (exp1 + exp2);
};

const accumulatedMonth = getAccumulatedMonth(money, income, amount1, amount2);


// Срок достижения цели
function getTargetMonth(goal, accumulated) {
	return Math.ceil(Number(goal) / accumulated)
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
console.log('Сумма всех обязательных расходов за месяц: ', getExpensesMonth(amount1, amount2));
console.log('Обязательные расходы: ', addExpenses.toLowerCase().split(', '));
// console.log('Накопления за месяц: ', accumulatedMonth);
console.log('Цель будет достигнута за ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев(-а)');
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome(budgetDay));