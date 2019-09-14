var Timer = (function() {
	var id;
	var intervalId = null;
	var timer = 0;
	var el;

	function initTimer(el_id) {
		id = el_id;
		if(id === undefined) {
			throw "Provide a valid Id!";
		}
		el = document.getElementById(id);

		if(el === null) {
			throw "Element does not exists!";
		}
		render();
	}
	function render() {
		var sec = parseInt(timer%60);
		sec = sec <= 9 ? '0' + sec: sec;
		var min = parseInt(timer/60);
		min = min <= 9 ? '0' + min : min;
		el.innerHTML = min + " : " + sec;
	}
	function update() {
		//console.log(timer);
		timer += 1;
		render();
	}
	function startTimer() {
		if(intervalId !== null) {
			throw "Timer is already running!";
		}
		intervalId = setInterval(update, 1000);
	}
	function stopTimer() {
		if(intervalId === null) {
			throw "Timer is not running!";
		}
		clearInterval(intervalId);
		intervalId = null;
	}
	function resumeTimer() {
		if (intervalId !== null) {
			throw "Timer is already running";
		}
		intervalId = setInterval(update, 1000);
	}
	function resetTimer() {
		if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
		timer = 0;
		render();
	}
	return {
		'init': initTimer,
		'start': startTimer,
		'stop': stopTimer,
		'reset': resetTimer,
		'resume': resumeTimer
	};
})();
