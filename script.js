'use strict'

class First {

	hello () {
		return console.log('Привет я метод родителя!');
	};
};


class Second extends First {
	constructor() {
		super();
		super.hello();
	};

	hello () {
		return console.log('A я наследуемый метод!');
	};
};

const second = new Second();

second.hello();
