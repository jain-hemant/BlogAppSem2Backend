import express from 'express'
import cors from 'cors'
import config from '../utility/env/config.js'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import routes from '../routes/all.routes.js'
import session from 'express-session'

// initialization  of all the required middleware
function initializeMiddleWare(app) {
    // to parse json data from request body
    // set limit to 5mb for incoming payload size 
    app.use(express.json({ limit: "5mb" }))
    //Express.urlencoded() simplifies the handling of form data in Express.js 
    //applications by automatically parsing URL-encoded request bodies and making the data
    // available in the req.body object.
    app.use(express.urlencoded({ extended: true }))
    //Configures the Access-Control-Allow-Credentials CORS header. 
    //Set to true to pass the header, otherwise it is omitted.
    app.use(cors({ origin: config.frontendUrl, credentials: true }))
    /* Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 
    Optionally you may enable signed cookie support by passing a secret string, 
    which assigns req.secret so it may be used by other middleware.*/
    app.use(cookieParser())

    // Use session middleware
    app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: false, } // 30 days
    }));
}
function initializeSecurityHeader(app) {
    app.disable("x-powered-by");
    app.use(helmet({ xPoweredBy: false, }))

}
async function init() {
    const app = express()
    initializeSecurityHeader(app)
    initializeMiddleWare(app)
    await routes(app)

    return app
}
export { init }