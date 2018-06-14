'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');

const url = `https://raw.github.com/helb/zopflipng-chrissimpkins-bin/${pkg.version}/vendor/`;

module.exports = new BinWrapper()
	.src(`${url}osx/zopflipng`, 'darwin')
	.src(`${url}linux/zopflipng`, 'linux')
	.dest(path.resolve(__dirname, '../vendor'))
	.use('zopflipng');
