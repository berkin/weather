const intent = (function intent() {
	let timer;
	return function (callback, duration, ...args) {
		clearTimeout(timer);
		timer = setTimeout(callback.bind(this, args), duration || 500);
	};

}());

export default intent;