### Some Important Links 
```
Routing:
https://expressjs.com/en/guide/routing.html
Express Example:
https://expressjs.com/en/starter/examples.html
Helmet : 
https://helmetjs.github.io/
```



### open Express js portal 
[Express Installtion Link](https://expressjs.com/en/starter/installing.html)
### go to backend dir from vscode terminal 
Use the npm init command to create a package.json file for your application. For more information on how package.json works, see Specifics of npm’s package.json handling.

```
npm init
```
This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:
```
entry point: (index.js)
```
Enter app.js, or whatever you want the name of the main file to be. If you want it to be index.js, hit RETURN to accept the suggested default file name.

Now install Express in the myapp directory and save it in the dependencies list. For example:
```
$ npm install express
```
### First Project setup
[Node Setup using Hello World](https://expressjs.com/en/starter/hello-world.html)

### copy sample code and paste it on App.js or entry file.
```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
### Run the app with the following command:

```
$ node app.js
```
Then, load http://localhost:3000/ in a browser to see the output.

### Note - To use Modern js like import export module Add "Type": "module" on packge.json file(backend directory) not to be confuse with the frontend package.json
```
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.3"
  }
}
```
after adding "Type": "module" on packge.json file. we can use import and export module.
```
import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```
### Install Cors

```
npm install cors
```
```
https://www.npmjs.com/package/cors
```