const intent = (function intent() {
	let timer;
	return function (callback, duration) {
		clearTimeout(timer);
		timer = setTimeout(callback, duration || 500);
	};

}());

export default intent;
