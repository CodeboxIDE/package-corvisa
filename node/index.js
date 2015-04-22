var path = require("path");

var Corvisa = require("corvisa");
var config = require("./config");
var debug = require("./debug");

var SCRIPTS_ROOT = path.resolve(__dirname, "../scripts");

module.exports = function(codebox) {
    var workspace = codebox.workspace;
    var events = codebox.events;

    // RPC services
    var terminal = codebox.rpc.get("terminal");

    // Client for corvisa api
    var corvisa = Corvisa(config.api.key, config.api.secret, {
        endpoint: config.endpoint
    });
    var corvisaApp = corvisa.application(config.appId);

    codebox.rpc.service("corvisa", {

        // Schedule a call to a specified number
        callme: function(args) {
            if (!args.number) throw "Need a number";

            return corvisaApp.schedule({
                "destination": number,
                "internal_caller_id_number": config.internalCaller.number,
                "internal_caller_id_name": config.internalCaller.name,
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
        },

        // Start the test runner and return the shell id
        test: function() {
            return terminal.create({
                    shellId: "corvisa-test",
                    command: [
                        '/bin/bash',

                        // Script itself
                        path.resolve(SCRIPTS_ROOT, "test.sh")
                    ]
                });
        },

        // Deploy to production
        deploy: function() {
            return terminal.create({
                    shellId: "corvisa-deploy",
                    command: [
                        'git', 'push'
                    ]
                });
        },

        // Debug an application
        debug: function(args) {
            var breakpoints = args.breakpoints;

            return debug(workspace.root(), args.breakpoints)
            .then(function(tmp) {
                console.log('tmp', tmp);
                return terminal.create({
                    shellId: "corvisa-debug",
                    command: [
                        '/bin/bash',

                        // Script itself
                        path.resolve(SCRIPTS_ROOT, "simulator.sh")
                    ],
                    opts: {
                        cwd: tmp
                    }
                });
            });
        },

        // List numbers
        numbers: function() {
            return corvisa.get("number")
            .then(function(result) {
                var user = _.first(result.data);

                return _.chain(user.number_orders)
                    .pluck("number_order_lines")
                    .flatten()
                    .pluck("number")
                    .flatten()
                    .value();
            });
        }

    });
};
