

var canvas = null;

document.getElementById('fileInput').addEventListener('input', function (e) {

    handleImage(e);

});



function set_image(canvas) {

    let ctx = canvas.getContext('2d');
    var imgData = ctx.getImageData(x, y, width, height).data;

    for (var i = 0; i < imgData.length; i += 4) {

        let lightness = parseInt((imgData[i] + imgData[i + 1] + imgData[i + 2]) / 3);

        imgData[i] = lightness;
        imgData[i + 1] = lightness;
        imgData[i + 2] = lightness;
    }

    return imagedata_to_image(imgData);

}

function imagedata_to_image(imagedata) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    return canvas.toDataURL();
}

function handleImage(e) {
    let reader = new FileReader();
    reader.onload = function (event) {
        let img = document.getElementById('image-org');
        img.style.display = "block";
        img.onload = function () {
            canvas = document.createElement("canvas");
            let ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            document.getElementById('image-threshold').src = set_image_grey();
            document.getElementById('image-red').src = set_image(0);
            document.getElementById('image-green').src = set_image(1);
            document.getElementById('image-blue').src = set_image(2);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);

}

function set_image_grey() {
    let ctx = canvas.getContext('2d');
    let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    let pixels = imgData.data;

    for (var i = 0; i < pixels.length; i += 4) {

        let medium = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);

        lightness = medium < 128 ? 0 : 255;

        pixels[i] = lightness;
        pixels[i + 1] = lightness;
        pixels[i + 2] = lightness;

    }

    return imagedata_to_image(imgData);
}

function set_image(index) {

    let ctx = canvas.getContext('2d');
    let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    let pixels = imgData.data;

    for (var i = 0; i < pixels.length; i += 4) {


        (i % 4) === index ? null : (pixels[i] = 0);
        ((i % 4) + 1) === index ? null : (pixels[i + 1] = 0);
        ((i % 4) + 2) === index ? null : (pixels[i + 2] = 0);

        pixels[i + 3] = 255;

    }

    return imagedata_to_image(imgData);
}
