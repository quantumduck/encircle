document.addEventListener("DOMContentLoaded", init);

function init() {
  document.getElementById("error-box").innerHTML = "";
}

function calculateExpression() {
  var result = document.getElementById('sExpression').value;
  document.getElementById('message-box').innerHTML = `=&gt; ${result}`;
}
