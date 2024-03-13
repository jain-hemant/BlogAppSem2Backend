import dotenv from 'dotenv'
// using IIFE (Immediately invoked function expression) Function
export default (function () {
    dotenv.config()
    const serverPort = process.env.PORT;
    const mongoDbUrl = process.env.DBURL;
    const frontendDomain = process.env.FRONTEND_DOMAIN;
    const cryptoAlgorithm = process.env.CRYPTO_ALGO;
    const cryptoPassword = process.env.CRYPTO_KEY;
    const cryptoSalt = process.env.CRYPTO_SALT;

    return { port: serverPort, dbUrl: mongoDbUrl, frontendUrl: frontendDomain, cryptoPassword, cryptoSalt,  cryptoAlgorithm }
})()
