module.exports = {
    appId: process.env.CORVISA_APPID,
    api: {
        endpoint: process.env.CORVISA_APIENDPOINT,
        key: process.env.CORVISA_APIKEY,
        secret: process.env.CORVISA_APISECRET
    },

    sip: {
        uri: process.env.CORVISA_ENDPOINT_SIP_URI,
        proxy: process.env.CORVISA_ENDPOINT_SIP_PROXY,
        auth: {
            contact: process.env.CORVISA_ENDPOINT_AUTH_CONTACT,
            password: process.env.CORVISA_ENDPOINT_AUTH_PASSWORD
        }
    },

    internalCaller: {
        name: process.env.CORVISA_INTERNALCALLER_NAME,
        number: process.env.CORVISA_INTERNALCALLER_NUMBER
    },

    numbers: {
        endpoint: process.env.CORVISA_NUMBERS_ENDPOINT
    }
};
