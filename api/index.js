// import { start } from "./lib/app.js";
import express from 'express'
const app = express()

app.get('/', (req, res) => {
    res.send('home page')
})
app.listen(5000, () => {
    console.log('listening');
})
// start()

