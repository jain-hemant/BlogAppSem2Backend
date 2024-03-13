import config from '../utility/env/config.js'
import * as express from './express.js'
import connectToDatabase from './mongoose.js'
async function start() {
    await connectToDatabase();
    const app = await express.init()
    app.listen(config.port, () => { 
        console.info(`
        Server started successfully: 
        Server Address: http://localhost:${config.port}
        DB URL: ${config.dbUrl}`); 
    })

}
export { start }