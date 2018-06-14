'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const BinBuild = require('bin-build');
const compareSize = require('compare-size');

test.cb('rebuild the zopflipng binaries', t => {
	// Skip the test on Windows
	if (process.platform === 'win32') {
		t.end();
		return;
	}

	const tmp = tempy.directory();

	new BinBuild()
		.src('https://github.com/chrissimpkins/zopfli/archive/v2.1.0.tar.gz')
		.cmd(`mkdir -p ${tmp}`)
		.cmd(`make zopflipng && mv ./zopflipng ${path.join(tmp, 'zopflipng')}`)
		.run(err => {
			t.ifError(err);
			t.true(fs.existsSync(path.join(tmp, 'zopflipng')));
			t.end();
		});
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(require('../'), ['--help'])); // eslint-disable-line unicorn/import-index
});

test('minify a PNG', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.png');
	const dest = path.join(tmp, 'test.png');
	const args = [
		'--lossy_8bit',
		src,
		dest
	];

	await execa(require('../'), args); // eslint-disable-line unicorn/import-index
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
});
