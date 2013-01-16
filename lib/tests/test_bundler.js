/*global*/ path = require('path');
/*global*/ fs = require('fs');
/*global*/ files = require(path.join(__dirname, '..', 'files.js'));
/*global*/ bundler = require(path.join(__dirname, '..', 'bundler.js'));
/*global*/ inFiber = require(path.join(__dirname, '..', 'fiber-helpers.js')).inFiber;
/*global*/ _ = require('underscore');
/*global*/ assert = require('assert');

var tmpBaseDir = files.mkdtemp('test_bundler');
var tmpCounter = 1;
var lastTmpDir;
/*global*/ tmpDir = function () {
  lastTmpDir = path.join(tmpBaseDir, "" + (tmpCounter++) /* path.join likes string, not numbers */);
  files.mkdir_p(lastTmpDir);
  return lastTmpDir;
};

Fiber(function () {
  try {
    /// RUN TESTS
//xcxc    require(path.join(__dirname, 'test_bundler_options.js'));
    require(path.join(__dirname, 'test_bundler_npm.js'));

    /// SUCCESS
    files.rm_recursive(tmpBaseDir);
  } catch (err) {
    // print stack track and exit with error code if an assertion fails
    console.log(err.stack);
    console.log();
    console.log('Bundle can be found at ' + lastTmpDir);
    process.exit(1);
  };
}).run();

