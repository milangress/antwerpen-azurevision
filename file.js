const cognitiveServices = require('cognitive-services');
require('dotenv').config();
const fs = require('fs');


writeData("test")

function writeData(responseData){
    // fs.appendFileSync('data.json', JSON.stringify(responseData))
    fs.readFile('data.json',function(err,content){
        if(err) throw err;
        let parseJson = JSON.parse(content)

        console.log(parseJson)
        parseJson.images.push({
            name: responseData,
            age: 24
        })
        fs.writeFile('data.json',JSON.stringify(parseJson),function(err){
            if(err) throw err;
        })
    })
}