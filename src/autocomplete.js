var _ = codebox.require("hr.utils");

var completions = require("../data/completions.json");
var settings = require("./settings");

var importRegexp = /(local\s+)?([\w\d_]+)\s*=\s*require\s*\(?['"]?([^'"]+)['"]?\)?/;

// Extract modules list
function extractImports(source) {
    var localModules = [];

    while ((m = source.match(importRegexp)) !== null) {
        localModules.push({
            local: m[2],
            module: m[3]
        });

        source = source.slice(m[0].length);
    }

    return _.chain(completions.imports)
        .map(function(module, local) {
            return {
                local: local,
                module: module
            }
        })
        .concat(localModules)
        .uniq('local')
        .map(function(i) {
            return [i.local, i.module];
        })
        .object()
        .value();
}

codebox.editor.autocomplete.add(function(editor, pos, prefix) {
    if (!settings.data.get("autocompletion")) return [];

    prefix = prefix.toLowerCase();

    var source = editor.getContent();
    var imports = extractImports(source);

    return [

    ];
});

