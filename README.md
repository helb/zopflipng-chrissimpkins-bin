# `zopflipng-chrissimpkins-bin`

[![Build Status](https://travis-ci.org/helb/zopflipng-chrissimpkins-bin.svg?branch=master)](https://travis-ci.org/helb/zopflipng-chrissimpkins-bin)
[![npm version](https://badge.fury.io/js/zopflipng-chrissimpkins-bin.svg)](https://badge.fury.io/js/zopflipng-chrissimpkins-bin)

Like [imagemin/zopflipng-bin](https://github.com/imagemin/zopflipng-bin), but uses a [zopfli fork](https://github.com/chrissimpkins/zopfli) by [@chrissimpkins](https://github.com/chrissimpkins) instead of Google's version.

You probably want to install [`imagemin-crunch`](https://github.com/helb/imagemin-crunch) instead (uses pngquant and this forked zopflipng to optimize images).


## Installation

```
$ npm i zopflipng-chrissimpkins-bin
```


## Usage

```js
const {execFile} = require('child_process');
const zopflipng = require('zopflipng-chrissimpkins-bin');

execFile(zopflipng, ['-m', '--lossy_8bit', 'input.png', 'output.png'], () => {
	console.log('Image minified!');
});
```


## CLI

```
$ npm i -g zopflipng-bin
```

```
$ zopflipng --help
```
