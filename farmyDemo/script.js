var image;
var Token;

function init() {
    let url = new URL(location.href);
    let searchParams = new URLSearchParams(url.search);
    Token = searchParams.get('token');
}

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

function fillData(data) {
    for (let index = 0; index < 4; index++) {

        data.predictions[index].disease;
        document.body.getElementsByClassName('d' + (index + 1))[0].innerText = (data.predictions[index].confidence * 100 | 0) + '%';
        document.body.getElementsByClassName('d' + (index + 1))[0].style.width = (data.predictions[index].confidence * 100 | 0) + '%';
        document.getElementById((index + 1)).innerText = data.predictions[index].disease;
    }

    document.getElementById('tryAgain').innerText = 'Try again (' + data.tries + ')';
    if (data.tries < 1) {
        document.getElementById('tryAgain').innerText = 'no more tries available :( ';
        document.getElementById('tryAgain').setAttribute('disabled', 'true');
        document.getElementById('tryAgain').classList.add('w-75');
    }

}

function openUpload() {
    document.getElementById('upload-image').click();
};

function changeToken(token) {
    token = event.target.value;
}

function changeImage(event) {
    var output = document.getElementById('display-image');
    output.src = URL.createObjectURL(event.target.files[0]);
    image = event.target.files[0];
}

function setToken() {

    Token = document.getElementById('token-input').value;
}

function upload() {


    if (!image) {
        $("#imageModel").modal();
        return;
    }

    if (Token && Token.length !== 0) {

        const file = new Blob([image], { type: 'image/png' });
        const formData = new FormData();
        formData.append('image', file, file.filename + '.png');
        formData.append('token', Token);

        const url = 'https://farmy-backend.herokuapp.com/api/v1/test-model';

        axios.post(url, formData)
            .then(function(res) {
                console.log(res);
                fillData(res.data);
                flipIt(true);
            })
            .catch(function(error) {

                $("#TokenModel").modal();
            });

    } else {
        $("#TokenModel").modal();
    }
}


init();