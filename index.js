const sleeplength = 50;

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function displayMessage(messages, index) {
	let i = 0;
	function cleanup() {
		sleep(2000).then(() => {
			input.value = "";
			new Audio("assets/type1.wav").play();
			if (index + 1 < messages.length)
				displayMessage(messages, index + 1);
		});
	}
	
	function timer(){ setTimeout(() => {
		if (i < messages[index].length) {
			new Audio("assets/type1.wav").play();
			input.value += messages[index][i];
			i++;
			timer();
		} else {
			cleanup();
		}
	}, sleeplength)};
	timer();
}

function save(filename, data) {
    const blob = new Blob([data], {type: 'text/plain'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}

function getTime() {
	let now = new Date().toLocaleString("en-US", {timeZone: "America/New_York"}).split(', ');
	let date = now[0].split('/').reverse().join('-')
	return date + "@" + now[1].split(' ').join('');
}

window.addEventListener('DOMContentLoaded', (event) => {
    const input = document.getElementById("input");
	var messages = [];
	
	input.addEventListener("keydown", function(event) {
		new Audio("assets/type1.wav").play();
		if (event.key === "Enter") {
		  messages.push(input.value);
		  input.value = "";
		}
		if (event.key === "Shift" && input.value == "") {
			save(getTime(), messages.join('\n'))
			displayMessage([...messages], 0);
			messages = [];
		}
	});
});

