const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    week = hour * 24 * 7;

let countDown = new Date('nov 30, 2019 00:00:00').getTime();

x = setInterval(function () {

    let now = new Date().getTime();
    distance = countDown - now;

    const d = Math.floor(distance / (day));
    const h = Math.floor((distance % (day)) / (hour));
    const m = Math.floor((distance % (hour)) / (minute));
    const s = Math.floor((distance % (minute)) / second);

    document.getElementById('days').innerText = (d < 10) ? '0' + d : d,
        document.getElementById('hours').innerText = (h < 10) ? '0' + h : h,
        document.getElementById('minutes').innerText = (m < 10) ? '0' + m : m,
        document.getElementById('seconds').innerText = (s < 10) ? '0' + s : s;

    //do something later when date is reached
    if (distance <= 0) {
        clearInterval(x);
    }
}, second)
