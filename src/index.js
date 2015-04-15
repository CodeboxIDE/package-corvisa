var settings = require("./settings");

var Q = codebox.require("q");
var _ = codebox.require("hr.utils");
var commands = codebox.require("core/commands");
var rpc = codebox.require("core/rpc");
var dialogs = codebox.require("utils/dialogs");

// Commands
commands.register([
    {
        id: "corvisa.callme",
        title: "Corvisa: Call Me",
        run: function() {
            return Q()
            .then(function(r) {
                if (!settings.data.get("number")) {
                    return dialogs.prompt("Enter your phone number:");
                }
                return settings.data.get("number");
            })
            .then(function(nb) {
                settings.data.set("number", nb);
                codebox.settings.save();

                return rpc.execute("corvisa/callme", {
                    number: nb
                });
            });
        }
    },
    {
        id: "corvisa.simulator",
        title: "Corvisa: Run Simulator",
        run: function() {
            return rpc.execute("corvisa/simulator")
            .then(function(r) {
                return commands.run("terminal.open", {
                    shellId: r.shellId
                });
            });
        }
    },
    {
        id: "corvisa.test",
        title: "Corvisa: Start Test Runner",
        run: function() {
            return rpc.execute("corvisa/test")
            .then(function(r) {
                return commands.run("terminal.open", {
                    shellId: r.shellId
                });
            });
        }
    }
]);

codebox.menubar.createMenu({
    caption: "Corvisa Summit",
    items: [
        {
            caption: "Call Me",
            command: "corvisa.callme"
        },
        { type: "separator" },
        {
            caption: "Run Tests",
            command: "corvisa.test"
        },
        {
            caption: "Run Simulator",
            command: "corvisa.simulator"
        },
        {
            caption: "Debug Application",
            command: "corvisa.debug"
        },
        { type: "separator" },
        {
            caption: "Deploy Application",
            command: "corvisa.deploy"
        },
        { type: "separator" },
        {
            caption: "Return to Dashboard",
            command: "corvisa.dashboard"
        }
    ]
});

