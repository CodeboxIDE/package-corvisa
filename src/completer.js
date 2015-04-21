// Regexes
var regexes = {
    "import": /^(local\s+)?([\w\d_]+)\s*=\s*require\s*\(?['"]?(.+?)['"]?\)?$/,
    "assign": /^[ \t]*(?:local\s+)?([\w\d_.,]+)\s*=\s*([\w\d_.:]+)\s*(?:\(.*\)\s*)?(?:--.*)?$/,
}

// Completions "class"
function SummitCompleter(completions) {
    if(!(this instanceof SummitCompleter)) {
        return new SummitCompleter(completions);
    }

    // Big list of completion data from the corvisa JSON
    this.completions = completions;
}

SummitCompleter.prototype.findCompletions = function(view, prefix, imports, objects) {
    var self = this;

    // Completions results
    var results = [];

    // Fetch full current line
    var currentLine = "";

    // Check if we're in a require lines

    // Modules
    var moduleResults = Object.keys(imports)
    // Filter by prefix
    .filter(function(key) {
        return startsWith(key, prefix);
    })
    // Get full module path "summit.http" ...
    .map(function(key) {
        return imports[key];
    })
    // Filter out unknown modules
    .filter(function(key) {
        return key in self.completions.modules;
    })
    .map(function(key) {
        return getCompletions(self.completions.modules[key]);
    });

    // Objects
    var objResults = Object.keys(objects)
    // Filter by prefix
    .filter(function(key) {
        return startsWith(key, prefix);
    })
    // Get type full type path "summit.A.B.c"
    .map(function(key) {
        return objects[key];
    })
    // Filter out unknown types
    .filter(function(key) {
        return key in self.objTypes;
    })
    .map(function(key) {
        return getCompletions(self.objTypes[key]);
    });

    // Join results
    var results = [].concat([].concat(moduleResults), [].concat(objResults));

    // Sort
    results.sort();

    return results;
};

/*
 * Utility funcs
 */

function startsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}

// Extracts completions for a module or object
function getCompletions(obj) {
    return [].concat(
        getSubCompletions(obj.functions),
        getSubCompletions(obj.fields)
    );
}

// Extracts completions for a module or object's fields or functions
function getSubCompletions(subObj) {
    return Object.keys(subObj)
    .map(function(key) {
        var field = subObj[key];
        // We only care about the trigger for now
        return field.trigger;
    });
}

module.exports = SummitCompleter;