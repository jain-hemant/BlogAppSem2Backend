import mongoose from 'mongoose'
import config from '../utility/env/config.js'

export default async function connectToDatabase() {
    try {
        // https://mongoosejs.com/docs/5.x/docs/connections.html
        return await mongoose.connect(config.dbUrl, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
    } catch (error) {
        console.error(`Failed to connect with database: ${error.mesage}`);
    }
}
