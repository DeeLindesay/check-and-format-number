'use strict';

var deconstructNumberFormat = require('deconstruct-number-format');

exports = module.exports = function checkAndFormatNumber(value, requiredFormat, defaultValue) {

  var deconstructedFormat = deconstructNumberFormat(requiredFormat);

  value = '' + value;
  var value = value.trim(); //ignore leading and trailing spaces
  value = value.length ? value : defaultValue;
  
  if (!value.length) {return ''};
  
  // *********************************************************************************
  // check for negative values and make value absolute
  // *********************************************************************************

  var isNegative = false
  if (value[0] === '-' || value[value.length-1] === '-' || (value[0] === '(' && value[value.length-1] === ')')) {
      isNegative = true;
      if (deconstructedFormat.negativeType === 'none') {return 'error - must be positive'};
      value = value.replace(/[-()]/g, "");
  }

  // *********************************************************************************
  // check decimals and remove entered separators
  // *********************************************************************************

  if (deconstructedFormat.maxLeft === 0 &&
       value.indexOf('.') > -1 && value.indexOf(',') > -1) {
    return 'error - must be an integer'
  }
    
  //if ',' being used as a decimal then replace with a '.'
  if ((deconstructedFormat.decimalChar === ','
      || deconstructedFormat.integerSeparator === '.'
      || deconstructedFormat.decimalsSeparator === '.'
      || value.indexOf('.') !== value.lastIndexOf('.')
     ) && value.indexOf(',') === value.lastIndexOf(',')) {
    value = value.replace(/[ .]/g, "");   //remove separators
    value = value.replace(/[,]/g, ".");   //work with decimal points as integers
  } else {
    value = value.replace(/[, ]/g, "");  //remove separators
  }

  if (deconstructedFormat.maxRight === 0 && value.indexOf('.') > -1) {
    return 'error - must be an integer'
  };

  if (value.search(/[^0-9.]/) > -1) {return 'error - must be a valid number'};

  // *********************************************************************************
  // pad and round
  // *********************************************************************************

  //round before deconstructing into parts
  if (deconstructedFormat.padRight > 0) {
    //pad decimals
    if (value.slice(value.indexOf('.')).length < deconstructedFormat.padRight) {
      value = '' + Number(value).toFixed(deconstructedFormat.padRight);
    }
    //round decimals
    if (value.slice(value.indexOf('.')).length > deconstructedFormat.maxRight) {
      value = '' + Number(value).toFixed(deconstructedFormat.maxRight);
    }
  }
  
  var integerValue = value.indexOf('.') > -1 ? value.slice(0, value.indexOf('.')) : value;
  var decimalValue = value.slice(integerValue.length+1);


  
  while (integerValue.length < deconstructedFormat.padLeft) {
    integerValue = '0' + integerValue;
  }

  if (deconstructedFormat.maxLeft > -1 && integerValue.length > deconstructedFormat.maxLeft) {
    return  'error - number too large';
  }

  // *********************************************************************************
  // reformat
  // *********************************************************************************

  
  //Add integer separators
  while (/(\d+)(\d{3})/.test(integerValue)) {
    integerValue = integerValue.replace(/(\d+)(\d{3})/, '$1' + deconstructedFormat.integerSeparator + '$2');
  }

  //Add decimal separators
  while (/(\d{3})(\d+)/.test(decimalValue)) {
    decimalValue = decimalValue.replace(/(\d{3})(\d+)/, '$1' + deconstructedFormat.decimalsSeparator + '$2');
  }

  return (isNegative && deconstructedFormat.negativeLeftPos === 0 ? deconstructedFormat.negativeLeftSymbol : '') +
    deconstructedFormat.prefix +
    (isNegative && deconstructedFormat.negativeLeftPos > 0 ? deconstructedFormat.negativeLeftSymbol : '') +
    integerValue +
    (decimalValue.length ? deconstructedFormat.decimalChar : '') +
    decimalValue +
    (isNegative && deconstructedFormat.negativeRightPos > 0 ? deconstructedFormat.negativeRightSymbol : '') +
    deconstructedFormat.postfix +
    (isNegative && deconstructedFormat.negativeRightPos === 0 ? deconstructedFormat.negativeRightSymbol : '')

};