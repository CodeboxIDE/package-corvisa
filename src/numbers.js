var settings = require("./settings");
var templatePanel = require("./templates/numbers.html");

var _ = codebox.require("hr.utils");
var View = codebox.require("hr.view");
var $ = codebox.require("jquery");
var rpc = codebox.require("core/rpc");
var commands = codebox.require("core/commands");

var getSIPConfig = _.memoize(function() {
    return rpc.execute('corvisa/sip');
});

var Panel = View.Template.extend({
    template: templatePanel,
    className: "component-panel-corvisa-numbers",
    events: {
        "click .number": "doCallNumber"
    },

    initialize: function(options) {
        Panel.__super__.initialize.apply(this, arguments);

        this.numbers = ["+33637380735"];
        this.updateNumbers();
    },

    templateContext: function() {
        return {
            numbers: this.numbers
        };
    },

    // Update list of numbers
    updateNumbers: function() {
        var that = this;

        return rpc.execute("corvisa/numbers")
        .then(function(nb) {
            that.numbers = nb;
            that.update();
        });
    },

    // Start a call
    doCallNumber: function(e) {
        var that = this;
        var number = $(e.currentTarget).data("number");

        e.preventDefault();

        return getSIPConfig()
        .then(function(config) {
            codebox.sip.setConfig({
                // todo make config
            });

            return commands.run("sip.call", { number: number });
        });
    }
});

module.exports = Panel;