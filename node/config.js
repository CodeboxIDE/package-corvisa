module.exports = {
    sip: {
        uri: process.env.CORVISA_ENDPOINT_SIP_URI,
        proxy: process.env.CORVISA_ENDPOINT_SIP_PROXY,
        auth: {
            contact: process.env.CORVISA_ENDPOINT_AUTH_CONTACT,
            password: process.env.CORVISA_ENDPOINT_AUTH_PASSWORD
        }
    },

    numbers: {
        endpoint: process.env.CORVISA_NUMBERS_ENDPOINT
    }
};
