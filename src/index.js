var settings = require("./settings");

var Q = codebox.require("q");
var _ = codebox.require("hr.utils");
var commands = codebox.require("core/commands");
var rpc = codebox.require("core/rpc");
var dialogs = codebox.require("utils/dialogs");

// Commands
var runProject = commands.register({
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
            settings.save();

            alert("Call "+ nb);
        });
    }
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
            command: "corvisa.simulator"
        },
        {
            caption: "Debug Application",
            command: "corvisa.simulator"
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

