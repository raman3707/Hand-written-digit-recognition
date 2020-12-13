// Loading Pretrained Model in JSON
let model;
(async function () {
    model = await tf.loadLayersModel(String(window.location.href) + '/json_model/model.json');
    // console.log(String(window.location.href) + '/json_model/model.json');
    // console.log('current url', window.location.href);
    console.log('Model Loaded', model);
})();
// Starting Prediction Procedure
document.getElementById('predict').addEventListener('click', function () {

    var prediction_text = document.getElementById('prediction_text');
        
    if (typeof imgData === 'undefined') {
        console.log('Empty Canvas Image');
        alert('Empty Canvas!');
    }
    else {
        var tf_img, resized_img, normalized_img, final_img, output, label;

        tf_img = tf.browser.fromPixels(imgData, 1);
        resized_img = tf.image.resizeBilinear(tf_img, [28, 28]);

        // Reversing Pixel Values
        // In Model Black - 255, White - 0
        // In canvas Black - 0, White - 255
        // resized_img = tf.abs(resized_img.sub(tf.scalar(255)));

        // Normalizing Data
        resized_img = resized_img.toFloat();
        normalized_img = resized_img.div(tf.scalar(255));

        // Adding a fourth dimension || Batch of 1 image
        final_img = normalized_img.expandDims(0);

        // Feeding Image to Model
        output = model.predict(final_img);
        output = output.reshape([10]);
        output.print();

        // Getting Label from Categorical Output
        label = output.argMax(0);
        label.print();
        prediction_text.innerHTML = 'Prediction: ' + label.dataSync();
    }
});
// Clearing Changes
document.getElementById('clear').addEventListener('click', function () {
    // clearing image data
    imgData = undefined;

    // clearing canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    prediction_text.innerHTML = 'Prediction: None';
    // reverting changes
    //prediction_text.innerHTML = 'Prediction Box';
    //prediction_text.style.color = '#ffffff';
    //prediction_text.style.fontWeight = '';
    //document.getElementsByClassName('card-header')[0].style.backgroundColor = '#411f1f';
    // location.reload();
});
