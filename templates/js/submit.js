//8 for backspace and 46 for delete button

var num_of_line = 0;
var maed = document.getElementById("maed");
var lnnum = document.getElementById("lnnum");

maed.addEventListener('keydown', event => {
	if (event.keyCode == 9 || event.which == 9) {
		event.preventDefault();
		var s = maed.selectionStart;
		maed.value = maed.value.substring(0, maed.selectionStart) + "\t" + maed.value.substring(maed.selectionEnd);
		maed.selectionEnd = s + 1;
	}
});

maed.addEventListener('keyup', event => {
	var strtext = maed.value;
	num_of_line = count_num_of_lines(strtext);
	// lnnum.value = "";
	// for (let i = -1; i < num_of_line; i++) {
	// 	let temp = (i + 2);
	// 	// lnnum.innerHTML += (temp.toString() + "\n");
	// }
});

function count_num_of_lines(str) {
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) == 10)
			count++;
	}
	return count;
}

// Scroll the numbering and editor at the same time
function select_scroll_1(e) {
	lnnum.scrollTop = maed.scrollTop;
}
maed.addEventListener('scroll', select_scroll_1, false);