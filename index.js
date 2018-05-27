const cognitiveServices = require('cognitive-services');
require('dotenv').config();
const fs = require('fs');




const client = new cognitiveServices.computerVision({
    endpoint: process.env.ENDPOINT,
    apiKey: process.env.API_KEY
});
const parameters = {
    "visualFeatures": "Description",
}
const headers = {
    'Content-type': 'application/octet-stream'
};

const TEST_IMAGE_URL = fs.readFileSync('bilder/0000001.jpg')


// const body = {"url":FRIENDS_IMAGE_URL}
const body = TEST_IMAGE_URL

let fixedNumberLenght = 7


/*for (let num = 1; num <= 1; num++) {
    let imageNumber = ("0000000" + num).slice(-7);
    let imagePath = `bilder/${imageNumber}.jpg`
    console.log(`Reading: ${imagePath}`)
    let image = fs.readFileSync(imagePath)
    sendImage(image, imageNumber)
}*/

startNewUpload(0)

function startNewUpload(currentCounter) {
    let imageNumber = fillNumberTo(currentCounter + 1, fixedNumberLenght)
    let filePath = createFilePath(imageNumber)
    console.log(`New Image Path: ${filePath}`)
    let image = fs.readFileSync(filePath)
    sendImage(image, imageNumber)
}


function fillNumberTo(counter, lenght) {
    return ("0000000" + counter).slice(-lenght);
}


function createFilePath(fileNumber) {
    let filePath = `bilder/${fileNumber}.jpg`
    return filePath
}





function sendImage(imagePath, imageNumber) {
    client.analyzeImage({
        parameters,
        headers,
        body
    }).then(response => {
        // console.log(response);
        console.log(response.description.captions);
        fs.appendFileSync('data.json', JSON.stringify(response));
        console.log(imageNumber)
    }).catch((err) => {
        console.log(err);
    })
}

