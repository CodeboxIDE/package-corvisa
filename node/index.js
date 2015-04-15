var Corvisa = require("corvisa");
var configs = require("./configs");

module.exports = function(codebox) {
    var workspace = codebox.workspace;
    var events = codebox.events;

    var corvisa = Corvisa(configs.apiKey, {
        endpoint: configs.endpoint
    });

    codebox.rpc.service("corvisa", {
        callme: function() {

        },


    });
};
