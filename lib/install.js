'use strict';
const BinBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['--help'], err => {
	if (err) {
		log.warn(err.message);
		log.warn('zopflipng pre-build test failed');
		log.info('compiling from source');

		let makeBin = 'make';
		let makeArgs = '';

		if (process.platform === 'freebsd') {
			makeBin = 'gmake';
			makeArgs = 'CC=cc CXX=c++';
		}

		const builder = new BinBuild()
			.src('https://github.com/chrissimpkins/zopfli/archive/v2.1.0.zip')
			.cmd(`mkdir -p ${bin.dest()}`)
			.cmd(`${makeBin} zopflipng ${makeArgs} && mv ./zopflipng ${bin.path()}`);

		return builder.run(err => {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('zopflipng built successfully');
		});
	}

	log.success('zopflipng pre-build test passed successfully');
});
