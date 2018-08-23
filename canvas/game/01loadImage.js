window.onload = function () {
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    canvas.width = 500;
    canvas.height = 400;

    image = new Image()
    image.onload = function () {
        context.drawImage(image, 0, 0, 192 * 2, 108 * 2)
    }
    image.src = './image.jpg'
}