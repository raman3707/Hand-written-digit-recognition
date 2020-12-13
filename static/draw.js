var image, imgData;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const LINE_WIDTH = 15;
const LINE_COLOR = '#ffffff';
const FILL_COLOR = '#000000';

ctx.lineWidth = LINE_WIDTH;
ctx.lineCap = 'round';
ctx.strokeStyle = LINE_COLOR;
ctx.fillStyle = FILL_COLOR;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.stroke();

let painting = false;

function startPosition(e) {
    painting = true;
    draw(e);
}

function finishPosition() {
    painting = false;
    ctx.beginPath();

    // Getting Image Data
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(imgData);
}

function draw(e) {
    if (!painting) return;

    var currX = e.clientX - canvas.offsetParent.offsetLeft - canvas.offsetLeft + window.pageXOffset;
    var currY = e.clientY - canvas.offsetParent.offsetTop - canvas.offsetTop + window.pageYOffset;

    console.log(canvas.offsetLeft);

    ctx.lineTo(currX, currY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(currX, currY);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishPosition);
canvas.addEventListener('mousemove', draw);
// Set up mouse events for drawing
var mousePos = { x: 0, y: 0 };


// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);


canvas.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);


canvas.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);


// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}