'use strict';

var test = require('testit');
var checkAndFormat = require('../');
var assert = require('assert');

test('1', function () {
  var actual = checkAndFormat('-23342456,2343278', '$(# ###,### #) per year');
  var expected = '$(23 342 456,234 327 8) per year';
  assert.deepEqual(actual, expected);
});

test('1', function () {
  var actual = checkAndFormat('-23342456,2343278', '$# ###,### # per year');
  var expected = 'error - must be positive';
  assert.deepEqual(actual, expected);
});

test('1', function () {
  var actual = checkAndFormat('-23342456.2343278', '$(# ###,### #) per year');
  var expected = '$(233 424 562 343 278) per year';
  assert.deepEqual(actual, expected);
});

test('1', function () {
  var actual = checkAndFormat('(23,342,456.2343278)', '$(#,###,###.#) per year');
  var expected = '$(23 342 456.2343278) per year';
  assert.deepEqual(actual, expected);
});