var cors = require('cors');

// Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');

// Your Google Cloud Platform project ID
const projectId = '<GOOGLE_CLOUD_PROJECT_ID>';

// Instantiates a client
const vision = Vision({
  projectId: projectId
});

const types = ['text'];

function baseTranslateImage(req, res) {
if (req.body === undefined) {
        // This is an error case, as "message" is required
        res
            .status(400)
            .send('No message defined!');
    } else {
        // Everything is ok
        let data = req
            .body
            .toString().replace('data:image/png;base64,', '');

        let base64 = new Buffer(data, 'base64');
        vision.detect(base64, types, function (err, detections, apiResponse) {
            if (err) {
                res.send('ERROR: ' + err);
            } else {
                res.send(detections[0]);
            }
        })
    }
}

exports.translateImage = function translateImage(req, res) {
    var corsFn = cors();
    corsFn(req, res, function() {
        baseTranslateImage(req, res);
    });

}