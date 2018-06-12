const cognitiveServices = require('cognitive-services');
require('dotenv').config();
const fs = require('fs');




const client = new cognitiveServices.computerVision({
    endpoint: process.env.ENDPOINT,
    apiKey: process.env.API_KEY
});
const parameters = {
    "visualFeatures": 'Categories,Color,Description'
}
const headers = {
    'Content-type': 'application/octet-stream'
};

// const TEST_IMAGE_URL = fs.readFileSync('bilder/0000001.jpg')


// const body = {"url":FRIENDS_IMAGE_URL}


/*for (let num = 1; num <= 1; num++) {
    let imageNumber = ("0000000" + num).slice(-7);
    let imagePath = `bilder/${imageNumber}.jpg`
    console.log(`Reading: ${imagePath}`)
    let image = fs.readFileSync(imagePath)
    sendImage(image, imageNumber)
}*/

let fixedNumberLenght = 7

let startNumber = 3000
let endNumber = 4000

if (process.argv.slice(2)){
    startNumber = process.argv.slice(2, 3) - 1
    endNumber = process.argv.slice(3, 4)
    consoleDivider()
    console.log('start from: ' + startNumber + ' to: ' + endNumber)
}

startNewUpload(startNumber)

function startNewUpload(currentCounter) {
    consoleDivider();
    let nextCounter = currentCounter + 1
    let imageNumber = fillNumberTo(nextCounter, fixedNumberLenght)

    if (nextCounter <= endNumber) {
        let filePath = createFilePath(imageNumber)
        console.log(`New Image Path: ${filePath}`)
        let imageData = fs.readFileSync(filePath)
        sendImage(imageData, imageNumber, nextCounter)
        console.log(imageData)
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
    return filePath = `bilder/${fileNumber}.jpg`
}





function sendImage(body, imageNumber, currentCounter) {
    client.analyzeImage({
        parameters,
        headers,
        body
    }).then(response => {
        // console.log(response);
        console.log(`response Caption from ${imageNumber}:`);
        if (response.description.captions) {
            console.log(response.description.captions)
        }
        writeData(response, imageNumber)
        startNewUpload(currentCounter)
    }).catch((err) => {
        console.log(err);
    })
}


function writeData(responseData, imageNumber){
    // fs.appendFileSync('data.json', JSON.stringify(responseData))
    fs.readFile('data/data.json',function(err,content){
        if(err) throw err;
        let parseJson = JSON.parse(content)

        // console.log(parseJson)
        parseJson.images.push({
            imageNumber: imageNumber,
            data: responseData
        })
        fs.writeFile('data/data.json',JSON.stringify(parseJson),function(err){
            if(err) throw err;
        })
    })
}