import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';

export default {
	input: './module',
	output: {
		file: 'bundle.js',
		format: 'cjs'
	},
	external: [
		'uglify-js',

		'assert',
		'fs',
		'path',
		'process',
		'events',
		'module',
		'http',
		'https',
		'os',
		'url',
		'util'
	],
	name: 'ng-tpl-bundle',
	plugins: [
		nodeResolve ({
			jsnext: true,
			main: true,
			preferBuiltins: true
		}),
		localResolve(),
		commonjs ({
			include: 'node_modules/**',
			ignoreGlobal: false,
			sourceMap: false,
			ignore: [ 'fs', 'path', 'process' ]
		})
	]
};
