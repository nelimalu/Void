function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function gotozen() {
	let char = document.getElementById('char').value;
	let line = document.getElementById('line').value;

	if (!isNumeric(char))
		char = 50;
	if (!isNumeric(line))
		line = 2000;

	window.location.href = `zen.html?char=${char}&line=${line}`;
}