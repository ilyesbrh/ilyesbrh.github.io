var image;
var Token;

const cardContainer = document.getElementById('card-container');
const span = document.getElementById('span');
const icon = document.getElementById('icon');
const img = document.getElementById('display-image');
const btn = document.getElementById('buttons');
const spinner = document.getElementById('spinner');
const results = document.getElementById('results');

function init() {
    let url = new URL(location.href);
    let searchParams = new URLSearchParams(url.search);
    Token = searchParams.get('token');

    /* Drag and drop */

    cardContainer.ondragover = cardContainer.ondragenter = function(evt) {
        evt.preventDefault();
    };

    cardContainer.ondrop = function(evt) {
        const fileInput = document.getElementById('upload-image');
        fileInput.files = evt.dataTransfer.files;
        evt.preventDefault();

        img.src = URL.createObjectURL(evt.dataTransfer.files[0]);
        image = evt.dataTransfer.files[0];

        cardContainer.classList.remove('select');
        span.classList.add('d-none');
        icon.classList.add('d-none');
        img.classList.remove('d-none');
        btn.classList.remove('d-none');
        btn.classList.add('d-flex');
    };
}


function fillData(data) {

    for (let index = 0; index < 2; index++) {

        document.body.getElementsByClassName('percent')[index].innerText = (data.predictions[index].probability * 100 | 0) + '%';
        document.body.getElementsByClassName('percentage')[index].style.width = (data.predictions[index].probability * 100 | 0) + '%';
        document.body.getElementsByClassName('Dname')[index].innerText = data.predictions[index].label;
    }

    document.getElementById('tryAgain').innerText = 'Try again';
    document.getElementById('tryAgain').onclick = () => {
        /* remove result show */
        results.classList.remove('d-flex');
        results.classList.add('d-none');
        /* add upload layout */
        cardContainer.classList.add('select');
        span.classList.remove('d-none');
        icon.classList.remove('d-none');
        img.classList.add('d-none');
        /* center card again */
        cardContainer.classList.add('my-auto');
        cardContainer.classList.remove('my-5');

    };
}

function openUpload() {
    document.getElementById('upload-image').click();

};

function changeToken(token) {
    token = event.target.value;
}

function changeImage(event) {

    img.src = URL.createObjectURL(event.target.files[0]);
    image = event.target.files[0];

    console.log('gere');

    cardContainer.classList.remove('select');
    span.classList.add('d-none');
    icon.classList.add('d-none');
    img.classList.remove('d-none');
    btn.classList.remove('d-none');
    btn.classList.add('d-flex');

}

function setToken() {

    Token = document.getElementById('token-input').value;
}

function cancel() {

    cardContainer.classList.add('select');
    span.classList.remove('d-none');
    icon.classList.remove('d-none');
    img.classList.add('d-none');
    btn.classList.add('d-none');
    btn.classList.remove('d-flex');
}

function upload() {


    if (!image) {
        $("#imageModel").modal();
        return;
    }

    Token = 'azer';
    if (Token && Token.length !== 0) {


        img.classList.add('d-none');
        btn.classList.add('d-none');
        btn.classList.remove('d-flex');
        spinner.classList.remove('d-none');
        cardContainer.classList.add('select');

        const file = new Blob([image], { type: 'image/png' });
        const formData = new FormData();
        formData.append('image', file, file.filename + '.png');
        formData.append('token', Token);

        const url = 'http://localhost:8080';

        axios.post(url, formData)
            .then(function(res) {
                console.log(res);
                fillData(res.data);

                /* show result pane */
                img.classList.remove('d-none');
                spinner.classList.add('d-none');
                cardContainer.classList.remove('select');
                /* prepare for result show */
                cardContainer.classList.remove('my-auto');
                cardContainer.classList.add('my-5');
                /* prepare for result show */
                results.classList.remove('d-none');
                results.classList.add('d-flex');

            })
            .catch(function(error) {

                console.log(error);

                /* show error pane */
                img.classList.remove('d-none');
                spinner.classList.add('d-none');
                cardContainer.classList.remove('select');
                btn.classList.remove('d-none');
                btn.classList.add('d-flex');

                $("#TokenModel").modal();
            });

    } else {
        $("#TokenModel").modal();
    }
};

init();