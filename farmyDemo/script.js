function flipIt(flip) {
    console.log('clicked');


    document.querySelectorAll('.card__side').forEach(
        (v) => {
            if (flip) {
                v.classList.add('flip');
            } else {
                v.classList.remove('flip');
            }
        }
    )
}

function fillData() {
    document.getElementById('1').innerText = 'this for id 1';
    document.getElementById('1').style.width = 90 + '%';
    document.getElementById('2').innerText = 'this for id 2';
    document.getElementById('2').style.width = 60 + '%';
    document.getElementById('3').innerText = 'this for id 3';
    document.getElementById('3').style.width = 50 + '%';
    document.getElementById('4').innerText = 'this for id 4';
    document.getElementById('4').style.width = 10 + '%';
}

fillData();