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

let startNumber = 0
let endNumber = 2

startNewUpload(startNumber)

function startNewUpload(currentCounter) {
    consoleDivider();
    let nextCounter = currentCounter + 1
    let imageNumber = fillNumberTo(nextCounter, fixedNumberLenght)

    if (nextCounter <= endNumber) {
        let filePath = createFilePath(imageNumber)
        console.log(`New Image Path: ${filePath}`)
        let image = fs.readFileSync(filePath)
        sendImage(image, imageNumber, nextCounter)
    } else {
        console.log('End of Counter: ' + nextCounter)
        consoleDivider();
    }
}

function consoleDivider() {
    console.log('')
    console.log('------------')
}


function fillNumberTo(counter, lenght) {
    return ("0000000" + counter).slice(-lenght);
}


function createFilePath(fileNumber) {
    let filePath = `bilder/${fileNumber}.jpg`
    return filePath
}





function sendImage(imagePath, imageNumber, currentCounter) {
    client.analyzeImage({
        parameters,
        headers,
        body
    }).then(response => {
        // console.log(response);
        console.log(`response Caption from ${imageNumber}: ${response.description.captions[0].text}`);
        fs.appendFileSync('data.json', JSON.stringify(response));
        startNewUpload(currentCounter)
    }).catch((err) => {
        console.log(err);
    })
}