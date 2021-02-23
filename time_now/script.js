const timesDayPar = document.createElement('p'),
	todayPar = document.createElement('p'),
	today = document.createElement('span'),
	currentTimePar  = document.createElement('p'),
	currentTime = document.createElement('span'),
	newYearPar = document.createElement('p'),
	newYear = document.createElement('span');
let format = '';

const getTitle = date => {
	if (date.getHours() >= 0 && date.getHours() < 6) {
		timesDayPar.textContent = 'Доброй ночи';
		format = ' AM';
	} else if (date.getHours() >= 6 && date.getHours() < 12) {
		timesDayPar.textContent = 'Доброе утро';
		format = ' AM';
	} else if (date.getHours() >= 12 && date.getHours() < 18) {
		timesDayPar.textContent = 'Добрый день';
		format = ' PM';
	} else {
		timesDayPar.textContent = 'Добрый вечер';
		format = ' PM';
	}

	document.body.append(timesDayPar);
};

const getToday = date => {
	todayPar.textContent = 'Сегодня: ';
	document.body.append(todayPar);
	today.textContent = date.toUpperCase().slice(0, 1) + date.slice(1);
	todayPar.append(today);
};

const getCurrentTime = date => {
	currentTimePar.textContent = 'Текущее время: ';
	document.body.append(currentTimePar);
	currentTime.textContent = date + format;
	currentTimePar.append(currentTime);
};

const getTimeBeforeNewYear = (date, newYearDate) => {
	newYearPar.textContent = 'До нового года осталось ';
	document.body.append(newYearPar);
	newYear.textContent = Math.floor((newYearDate.getTime() - date.getTime()) 	/ (1000 * 3600 * 24)) + ' дней';
	newYearPar.append(newYear);
};

const getDate = () => {
	const date = new Date(),
		dateRu = new Date().toLocaleString('ru', {
			weekday: 'long',
		}),
		time = new Date().toLocaleTimeString(),
		newYearDate = new Date('1.01.2022');

	getTitle(date);
	getToday(dateRu);
	getCurrentTime(time);
	getTimeBeforeNewYear(date, newYearDate);
};

setInterval(getDate, 1000);


