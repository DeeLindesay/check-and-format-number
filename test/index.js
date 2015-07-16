'use strict';

var test = require('testit');
var checkAndFormat = require('../');
var assert = require('assert');

test('1', function () {
  var actual = checkAndFormat('-23342456,2343278', '$(# ###,### #) per year');
  var expected = '$(23 342 456,234 327 8) per year';
  assert.deepEqual(actual, expected);
});

test('2', function () {
  var actual = checkAndFormat('-23342456,2343278', '$# ###,### # per year');
  var expected = 'error - must be positive';
  assert.deepEqual(actual, expected);
});

test('3', function () {
  var actual = checkAndFormat('-23342456.2343278', '$(# ###,### #) per year');
  var expected = '$(233 424 562 343 278) per year';
  assert.deepEqual(actual, expected);
});

test('4', function () {
  var actual = checkAndFormat('23,342,456.2343278-', '$(#,###,###.#) per year');
  var expected = '$(23,342,456.2343278) per year';
  assert.deepEqual(actual, expected);
});

test('5', function () {
  var actual = checkAndFormat('23,342,456.2343278-', '$(9,###,##0.00) per year');
  var expected = 'error - number too large';
  assert.deepEqual(actual, expected);
});

test('6', function () {
  var actual = checkAndFormat('9,342,456.2353278-', '- $9,###,##0.00 per year');
  var expected = '- $9,342,456.24 per year';
  assert.deepEqual(actual, expected);
});

test('7', function () {
  var actual = checkAndFormat('35', 'RPL 00000000');
  var expected = 'RPL 00000035';
  assert.deepEqual(actual, expected);
});

test('8', function () {
  var actual = checkAndFormat('355.2', '###');
  var expected = 'error - must be an integer';
  assert.deepEqual(actual, expected);
});

test('9', function () {
  var actual = checkAndFormat('355.2', '###.000');
  var expected = '355.200';
  assert.deepEqual(actual, expected);
});

test('10', function () {
  var actual = checkAndFormat('9,342,456.2353278-', '$9 ### ##0.00# ###- per year');
  var expected = '$9 342 456.235 327 8- per year';
  assert.deepEqual(actual, expected);
});

test('11', function () {
  var actual = checkAndFormat('9,342,456.2353278-', '-$9 ### ##0.00# ### per year');
  var expected = '-$9 342 456.235 327 8 per year';
  assert.deepEqual(actual, expected);
});