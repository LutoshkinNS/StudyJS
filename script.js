'use strict';
/* */
let money = 1000; /*Месячный доход*/
let income = 'фриланс'; /*Дополнительный доход*/
let addExpenses = 'Интернет, Такси, Коммуналка'; /*Обязательные расходы*/
let deposit = Boolean(1); /*Наличие депозита*/
let mission = 100000; /*Сумма планируемых накоплений*/
let period = 12; /*Период в месяцах*/
let budgetDay; /*Бюджет на день*/
let budgetMonth; /*Бюджет на месяц*/
let expenses1, expenses2; /*Обязательная статья расходов*/
let amount1, amount2; /*Стоимость обязательной статьи расзодов*/

mission = Number(prompt('Планируемая сумма накоплений?'));
money = Number(prompt('Ваш месячный доход?'));
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов');
amount1 = Number(prompt('Во сколько это обойдётся?'));
expenses2 = prompt('Введите обязательную статью расходов');
amount2 = Number(prompt('Во сколько это обойдётся?'));

budgetMonth = money - (amount1 + amount2); /*Бюджет на месяц*/
budgetDay = Math.floor(budgetMonth / 30); /*Бюджет на день*/

console.log('money: ', typeof(money));
console.log('income: ', typeof(income));
console.log('deposit: ', typeof(deposit));
console.log('addExpenses: ', addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Планируемая сумма накоплений: ', mission);
console.log('Ваш месячный доход: ', money);
console.log('Наличие депозита: ', deposit);
console.log('Обязательные расходы: ', addExpenses.toLowerCase().split(', '));
console.log('Бюджет на день: ', budgetDay);
console.log('Бюджет на месяц: ', budgetMonth);
console.log('Цель будет достигнута за ' + Math.ceil(Number(mission) / budgetMonth) + ' месяцев(-а)');

if (budgetDay >= 1200) {
	console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay < 1200) {
	console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay <= 600) {
	console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
	console.log('Что то пошло не так');
}