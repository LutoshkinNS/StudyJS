  
let money = 30000;
let income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = Boolean(0);
let mission = 100000;
let period = 12;
let budgetDay = money / 30;

console.log('money: ', typeof(money));
console.log('income: ', typeof(income));
console.log('deposit: ', typeof(deposit));
console.log('addExpenses: ', addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log(addExpenses.toLowerCase().split(', '));
console.log('budgetDay: ', budgetDay);