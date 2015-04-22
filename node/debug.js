var Q = require('q');
var _ = require('lodash');
var wrench = require('wrench');
var fs = require('fs');
var os = require('os');
var path = require('path');

var REPL = "repl()";

// Given the workspace root and a list of breakpoints
// it will copy it in a new folder and replace breakpoints by "repl()"
module.exports = function(root, breakpoints) {
	// Folder for debug app
	var tmproot = path.resolve(os.tmpdir(), 'debug-corvisa');

	// List of files with breakfiles
	var files = _.chain(breakpoints).pluck('file').uniq().value();

	return Q()
	.then(function() {
		return Q.nfcall(wrench.copyDirRecursive, root, tmproot, {
		    forceDelete: true
		});
	})
	.then(function() {
		return _.reduce(files, function(prev, file) {
			return prev.then(function() {
				var fullPath = path.resolve(tmproot, file);
				var blines = _.chain(breakpoints)
					.filter({ file: file })
					.pluck('line')
					.uniq()
					.sort()
					.value();

				// Read file
				return Q.nfcall(fs.readFile, fullPath, { encoding: 'utf-8'})
				.then(function(content) {
					var lines = content.split('\n');

					_.each(blines, function(line, i) {
						lines.splice(line+i, 0, REPL);
					});

					// Write file
					content = lines.join('\n');
					return Q.nfcall(fs.writeFile, fullPath, content, { encoding: 'utf-8'});
				})
			})
		}, Q());
	})
	.thenResolve(tmproot);
};

