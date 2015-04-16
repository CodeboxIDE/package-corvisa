module.exports = {
    appId: process.env.CORVISA_APPID,
    api: {
    	key: process.env.CORVISA_APIKEY,
    	secret: process.env.CORVISA_APISECRET
    },
    endpoint: process.env.CORVISA_ENDPOINT,
    internalCaller: {
        name: process.env.CORVISA_INTERNALCALLER_NAME,
        number: process.env.CORVISA_INTERNALCALLER_NUMBER
    }
};
