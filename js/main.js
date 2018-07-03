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
  var result = calculate(document.getElementById('sExpression').value);
  document.getElementById('message-box').innerHTML = `=&gt; ${result}`;
}

function calculate(string) {
  if (isInteger(string)) {
    return parseInt(string, 10);
  } else if (isFunction(string)) {
    return 42;
  } else {
    printError(`Unparseable expression: ${string}`);
    return NaN;
  }
}

function trimEnds(string) {
  return string.substring(1, string.length - 1);
}

function printError(message) {
  document.getElementById("error-box").innerHTML = message;
}

function clearError() {
  document.getElementById("error-box").innerHTML = "";
}
