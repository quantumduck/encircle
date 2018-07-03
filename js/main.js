document.addEventListener("DOMContentLoaded", init);

function init() {
  document.getElementById("error-box").innerHTML = "";
}

function isInteger(string) {
  return /^\d+$/.test(string);
}

function isFunction(string) {
  return string.startsWith('(') && string.endsWith(')');
}

function calculateExpression() {
  clearError();
  var result = calculate(document.getElementById('sExpression').value);
  document.getElementById('message-box').innerHTML = `=&gt; ${result}`;
}

function calculate(string) {
  if (isInteger(string)) {
    return parseInt(string, 10);
  } else if (isFunction(string)) {
    var params = getFunctionParams(trimEnds(string));
    if (params.length === 3) {
      if (params[0] === "add") {
        return calculate(params[1]) + calculate(params[2]);
      } else if (params[0] === "multiply") {
        return calculate(params[1]) * calculate(params[2]);
      } else {
        printError(`Unknown function: ${params[0]}`);
        return NaN;
      }
    } else if (params.length > 0) {
      printError(`Wrong number of parameters in: ${string}`);
      return NaN;
    } else {
      return NaN;
    }
  } else {
    printError(`Unparseable expression: ${string}`);
    return NaN;
  }
}

function trimEnds(string) {
  return string.substring(1, string.length - 1);
}

function getFunctionParams(string) {
  var params = [];
  var parenCount = 0;
  var startIndex = 0;
  for (var i = 0; i < string.length; i++) {
    var char = string[i];
    if (char === '(') {
      parenCount += 1;
    } else if (char === ')') {
      parenCount -= 1;
    } else if (char === ' ' && parenCount === 0) {
      params.push(string.substring(startIndex, i));
      startIndex = i + 1;
    }
    if (parenCount < 0) {
      printError('Unmatched close param found');
      return [];
    }
  }
  if (parenCount > 0) {
    printError('Unmatched open param found');
    return [];
  }
  params.push(string.substring(startIndex));
  return params;
}

function printError(message) {
  document.getElementById("error-box").innerHTML = message;
}

function clearError() {
  document.getElementById("error-box").innerHTML = "";
}
