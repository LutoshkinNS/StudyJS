const countTimer = deadline => {
	const timerWrap = document.getElementById('timer'),
		timerHours = document.getElementById('timer-hours'),
		timerMinutes = document.getElementById('timer-minutes'),
		timerSeconds = document.getElementById('timer-seconds');

	const getTimeRemaining = () => {
		const dateStop = new Date(deadline).getTime(),
			dateNow = new Date().getTime(),
			timeRemaining = (dateStop - dateNow) / 1000,
			seconds = Math.floor(timeRemaining % 60),
			minutes = Math.floor((timeRemaining / 60) % 60),
			hours = Math.floor((timeRemaining / 60) / 60);
		return { timeRemaining, hours, minutes, seconds };
	};

	const addsZero = data => {
		if (data < 10) return '0' + data;
		else return data;
	};

	const updateClock = () => {
		const timer = getTimeRemaining();

		timerHours.textContent = addsZero(timer.hours);
		timerMinutes.textContent = addsZero(timer.minutes);
		timerSeconds.textContent = addsZero(timer.seconds);

		if (timer.timeRemaining <= 0) {
			// eslint-disable-next-line no-use-before-define
			clearInterval(startTimer);
			timerHours.textContent = '00';
			timerMinutes.textContent = '00';
			timerSeconds.textContent = '00';
			timerWrap.style.color = 'red';
		}
	};

	updateClock();
	const startTimer = setInterval(updateClock, 1000);

};


export default countTimer;
