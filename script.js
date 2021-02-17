'use strict';

function DomElement(selector, height, width, bg, fontSize) {
	this.selector = selector;
	this.height = height;
	this.width = width;
	this.bg = bg;
	this.fontSize = fontSize;
};

DomElement.prototype.checkString = function () {
	if (this.selector[0] === '.') {
		let div = document.createElement('div');
		div.className = (this.selector.slice(1));
		div.style.height = this.height;
		div.style.width = this.width;
		div.style.backgroundColor = this.bg;
		div.style.fontSize = this.fontSize;
		div.innerHTML = 'div с классом ' + '"' + this.selector.slice(1) + '"';
		document.body.append(div);
	};
	if (this.selector[0] === '#') {
		let p = document.createElement('p');
		p.id = this.selector.slice(1);
		p.style.height = this.height;
		p.style.width = this.width;
		p.style.backgroundColor = this.bg;
		p.style.fontSize = this.fontSize;
		p.innerHTML = 'p с id ' + '"' + this.selector.slice(1) + '"';
		document.body.append(p);
	};
};

let newDomElement = new DomElement('#title', '50px', '400px', 'green', '36px');

newDomElement.checkString();