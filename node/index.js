var Q = require('q');
var path = require("path");
var request = require("request");
var url = require("url");

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
        endpoint: config.api.endpoint
    });
    var corvisaApp = corvisa.application(config.appId);

    codebox.rpc.service("corvisa", {
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
            return Q.nfcall(request,
                url.resolve(config.numbers.endpoint, '/api/box/'+workspace.config('id')+'/numbers'),
                { json: true}
            )
            .spread(function(response, body) {
                if (response.statusCode != 200) throw "Error "+response.statusCode;
                return body.numbers || [];
            });
        },

        // Return SIP config
        sip: function() {
            return config.sip;
        }

    });
};
