var settings = require("./settings");
var autocomplete = require("./autocomplete");

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
    },
    {
        id: "corvisa.dashboard",
        title: "Corvisa: Return to Dashboard",
        run: function() {
            window.open("https://platform.corvisacloud.com/#/home");
        }
    }
]);

// Replace run comman with run of corvisa simulator
var runCommand = commands.get("run.project");
runCommand.set("run", function() {
    return commands.run("corvisa.simulator");
});

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
            command: "run.project"
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

