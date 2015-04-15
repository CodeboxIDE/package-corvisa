module.exports = {
    appId: process.env.CORVISA_APPID,
    apiKey: process.env.CORVISA_APIKEY,
    endpoint: process.env.CORVISA_ENDPOINT,
    internalCaller: {
        name: process.env.CORVISA_INTERNALCALLER_NAME,
        number: process.env.CORVISA_INTERNALCALLER_NUMBER
    }
};
