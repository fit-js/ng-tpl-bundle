import * as fs from 'fs';
import * as path from 'path';
import templatecache from 'templatecache';

const core = require ('fit-cli');

let develop, source, output, cwd;

function build () {
	templatecache({
		angularRoot: cwd,
		isStandalone: true,
		templatesFilePath: output
	}, function (err, templatejs) {
		let dest = path.join (output, 'templates.js');
		fs.writeFileSync (dest, templatejs, 'utf-8');
	});
}

export function init (config) {
	develop = core.args.env() === 'develop';

	source = ['*.html', '**/*.html'];
	output = config.output;
	cwd = config.cwd;

	build();

	let bs = core.globals.get ('bs');

	if (develop && bs) {
		bs
			.watch (source, { cwd: cwd })
			.on ('change', build);
	}
}
