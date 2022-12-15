
const fourthOfJuly = new Date(2022, 11, 16).getTime();

// countdown
var timer = setInterval(function () {

    // get today's date
    const today = new Date().getTime();

    // get the difference
    let diff = fourthOfJuly - today;

    // math
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // display
    document.getElementById("timer").innerHTML =
        "<div class=\"days\"> \
        <div class=\"numbers\">" + days + "</div>days</div> \
        <div class=\"hours\"> \
        <div class=\"numbers\">" + hours + "</div>hours</div> \
        <div class=\"minutes\"> \
        <div class=\"numbers\">" + minutes + "</div>minutes</div> \
        <div class=\"seconds\"> \
        <div class=\"numbers\">" + seconds + "</div>seconds</div> \
        </div>";
    // If the count down is finished, write some text 
    if (diff < 0) {
        clearInterval(timer);
        document.body.innerHTML = 
            '<div class="container - fluid"> ' +
                '<a href="https://ilyesbrh.github.io/fadiaBirthday/index.html"  role="button"><button class="button center">Ouvrir</button></a> ' +
            '</div> ';
    }

}, 1000);