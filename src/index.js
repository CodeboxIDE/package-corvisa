require("./stylesheets/main.less");

var settings = require("./settings");
var templateWelcome = require("./templates/welcome.html");
var PanelNumbers = require("./numbers");
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
        id: "corvisa.deploy",
        title: "Corvisa: Deploy To Production",
        run: function() {
            return rpc.execute("corvisa/deploy")
            .then(function(r) {
                return commands.run("terminal.open", {
                    shellId: r.shellId
                });
            });
        }
    },
    {
        id: "corvisa.debug",
        title: "Corvisa: Debug with Breakpoints",
        run: function() {
            return rpc.execute("corvisa/debug", {
                breakpoints: codebox.editor.breakpoints.toJSON()
            })
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

// Replace run command with run of corvisa simulator
commands.get("run.project").set("run", function() {
    return commands.run("corvisa.simulator");
});

// Replace welcome command
commands.get("application.welcome").set("run", function() {
    /*return codebox.tabs.add(codebox.tabs.HtmlPanel, {
        className: "component-corvisa-dialog",
        content: templateWelcome
    }, {
        type: "welcome",
        title: "Welcome"
    });*/
});

// Numbers list
codebox.panels.add(PanelNumbers, {}, {
    title: "Numbers",
    section: "numbers"
});

// Corvisa menu
codebox.menubar.createMenu({
    caption: "Corvisa Summit",
    items: [
        {
            caption: "Run Tests",
            command: "corvisa.test"
        },
        {
            caption: "Run Simulator",
            command: "run.project"
        },
        {
            caption: "Debug",
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

