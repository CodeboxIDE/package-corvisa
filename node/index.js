var path = require("path");

var Corvisa = require("corvisa");
var configs = require("./config");

var SCRIPTS_ROOT = path.resolve(__dirname, "../scripts");

module.exports = function(codebox) {
    var workspace = codebox.workspace;
    var events = codebox.events;

    // RPC services
    var terminal = codebox.rpc.get("terminal");

    // Client for corvisa api
    var corvisa = Corvisa(configs.apiKey, {
        endpoint: configs.endpoint
    });
    var corvisaApp = corvisa.application(configs.appId);

    codebox.rpc.service("corvisa", {

        // Schedule a call to a specified number
        callme: function(args) {
            if (!args.number) throw "Need a number";

            return corvisaApp.schedule({
                "destination": number,
                "internal_caller_id_number": configs.internalCaller.number,
                "internal_caller_id_name": configs.internalCaller.name,
                "destination_type": DESTINATION_TYPE
            });
        },

        // Start the simulator and return the shell id
        simulator: function() {
            return terminal.create({
                    shellId: "corvisa-simulator",
                    command: [
                        '/bin/bash',

                        // Script itself
                        path.resolve(SCRIPTS_ROOT, "simulator.sh")
                    ]
                });
        }

    });
};
