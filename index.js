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
			displayMessage([...messages], 0);
			messages = [];
		}
	});
});

