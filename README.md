# antwerpen-vision

Takes a (local) list of images and procces them with Azure Cloudvision

in the form of:
```
bilder/0000001.jpg
bilder/0000002.jpg
etc...
````

Set API key in .env file:
```
ENDPOINT=[ your API location ].api.cognitive.microsoft.com
API_KEY=[ your API key]
```

start with:
````
node index.js [first Index] [last Index]
````

for example:
````
node index.js 2030 2050
`````
will Process: 0002030.jpg until 0002050.jpg

