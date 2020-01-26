var image;
var Token;
var response;

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
    }

    if (Token && Token.length !== 0) {

        const file = new Blob([image], { type: 'image/png' });
        const formData = new FormData();
        formData.append('image', file, file.filename + '.png');
        formData.append('token', Token);

        const url = 'http://farmy-backend.herokuapp.com/api/v1/test-model';

        axios.post(url, formData)
            .then(function(res) {
                console.log(res);
                response = res;
                flipIt(true);
            })
            .catch(function(error) {
                console.log(error);
            });

    } else {
        $("#TokenModel").modal();
    }
}


init();