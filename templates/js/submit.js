//8 for backspace and 46 for delete button

var num_of_line = 0;
var maed = document.getElementById("maed");
var lnnum = document.getElementById("lnnum");

var control_down = false;
var control_key = 17;
var mac_control = 91;

class customInput {
	constructor(data, inputType, ranges) {
		this.data = data;
		this.inputType = inputType;
		this.ranges = ranges;
	}
	getTargetRanges() {
		return this.ranges;
	}
	stopPropagation() {}
	preventDefault() {}
}

var defword_1 = "<div class='words' contenteditable='true' style='color: rgb(241, 28, 28);outline: none;display: inline;' id='";
var defword_2 = "'>";
var defword_3 = "</div>";
var words = [];

function create_node(id, str) {
	let tem = document.createElement("div");
	tem.id = id;
	tem.className = "words";
	tem.style.color = "rgb(241, 28, 28)";
	tem.style.display = "inline";
	tem.style.outline = "none";
	tem.contentEditable = "true";
	tem.innerHTML = str;
	tem.style.whiteSpace = "pre";
	return tem;
}

var temp_word = "";

let sel_obj = document.getSelection();
maed.addEventListener('beforeinput', beforeinput_listener);
maed.addEventListener('keydown', keydown_listener);
maed.innerHTML = defword_1 + "wrd1" + defword_2 + "" + defword_3;
let wrd1 = document.getElementById("wrd1");
wrd1.addEventListener('beforeinput', beforeinput_listener);
wrd1.addEventListener('keydown', keydown_listener);
words.push(wrd1);

function keydown_listener(event) {
	if (event.code == 9 || event.which == 9) { //do selection here
		event.preventDefault();
		event.stopPropagation();
		let st_nd = sel_obj.getRangeAt(0);
		var evnt = new customInput("\t", "insertText", [st_nd]);
		beforeinput_listener(evnt);
	}
}

function key_up(event) {
	if (event.keyCode == control_key || event.keyCode == mac_control)
		control_down = false;
}

function beforeinput_listener(event) {
	event.stopPropagation();
	event.preventDefault();
	if (event.inputType == "insertText" || event.inputType == "insertParagraph") {
		insert_text(event);
	} else if (event.inputType.substring(0, 6) == "delete") {
		delete_text(event);
	} else {
		try {
			let str = event.dataTransfer.getData("text");
			for (let i = 0; i < str.length; i++) {
				if (str.charCodeAt(i) == 10) {
					let st_nd = sel_obj.getRangeAt(0);
					var evnt = new customInput("<br>", "insertParagraph", [st_nd]);
					insert_text(evnt);
				} else if (str.charCodeAt(i) == 13) {} else {
					let st_nd = sel_obj.getRangeAt(0);
					var evnt = new customInput(str.charAt(i), "insertText", [st_nd]);
					insert_text(evnt);
				}
			}
		} catch (error) {
			return;
		}
	}
}


function insert_text(event) {
	let data = event.data;
	if (event.inputType == "insertParagraph")
		data = "<br>";
	let ranges = event.getTargetRanges()[0];
	let current_element = document.getElementById(ranges.startContainer.id);
	if (ranges.startContainer.id == "maed")
		current_element = wrd1;
	if (current_element == null)
		current_element = ranges.startContainer.parentElement;
	let curr_wrd = search_words(current_element.id);
	let next_wrd = words[curr_wrd + 1];
	let t_st = sel_obj.getRangeAt(0).startContainer.nodeValue;
	let t_no = sel_obj.getRangeAt(0).startOffset;
	if (data == " " || data == "\t" || data == "<br>") {
		let lent = "wrd" + (words.length + 1).toString();
		let place_text = "&nbsp;";
		let off_val = 1;
		if (data == "\t") {
			place_text = "&nbsp;&nbsp;&nbsp;&nbsp";
			off_val = 4;
		}
		if (data == "<br>") {
			place_text = "&#10;&#13;";
			off_val = 1;
		}
		if (t_st != null && ranges.endOffset != ranges.endContainer.textContent.length) {
			let prt1 = t_st.substring(0, t_no);
			let prt2 = place_text + t_st.substring(t_no);
			current_element.innerHTML = prt1;
			prt2 = prt2.replace("&#10;&#13;", "\n");
			let temp_word = create_node(lent, prt2);
			maed.insertBefore(temp_word, next_wrd);
			words.splice(curr_wrd + 1, 0, temp_word);
			current_element = document.getElementById(lent);
			let st_nd = current_element.childNodes[0];
			let t_range = document.createRange();
			t_range.setStart(st_nd, off_val);
			t_range.setEnd(st_nd, off_val);
			sel_obj.removeAllRanges();
			sel_obj.addRange(t_range);
		} else {
			let temp_word = create_node(lent, place_text);
			maed.appendChild(temp_word);
			words.push(temp_word);
			sel_obj.collapse(temp_word, 1);
			temp_word.addEventListener('beforeinput', beforeinput_listener);
			temp_word.addEventListener('keydown', keydown_listener);
		}
	} else {
		if (t_st != null) {
			t_st = t_st.substring(0, t_no) + data + t_st.substring(t_no);
			current_element.innerHTML = t_st;
			let st_nd = current_element.childNodes[0];
			let t_range = document.createRange();
			t_range.setStart(st_nd, t_no + 1);
			t_range.setEnd(st_nd, t_no + 1);
			sel_obj.removeAllRanges();
			sel_obj.addRange(t_range);
		} else {
			current_element.textContent += data;
			sel_obj.collapse(current_element, 1);
		}
	}
}

function delete_text(event) {
	let range = event.getTargetRanges()[0];
	let current_element = range.endContainer.parentElement;
	let start = range.startContainer.parentElement,
		end = current_element;
	let s_o = range.startOffset,
		e_o = range.endOffset;
	if (start.isSameNode(end)) {
		for (let i = e_o; i > s_o; i--)
			delete_single_character(end, i);
	} else {
		let end_no = search_words(end.id);
		let no_words = Math.abs(end_no - search_words(start.id) - 1);
		for (let i = e_o; i > 0; i--)
			delete_single_character(end, i);
		for (let j = 0; j < no_words; j++)
			for (let i = words[end_no - j - 1].textContent.length; i > 0; i--)
				delete_single_character(words[end_no - j - 1], i);
		for (let i = start.textContent.length; i > s_o; i--)
			delete_single_character(end, i);
	}
}

function delete_single_character(element, pos) {
	let word_ind = search_words(element.id);
	if (element.textContent.length <= 1) {
		if (word_ind == 0 && words.length == 1) {
			wrd1.textContent = "";
			return;
		}
		element.remove();
		if (word_ind == 0) {
			let curr_word = words[word_ind + 1];
			words.splice(curr_word, 1);
			let st_nd = curr_word.childNodes[0];
			let t_range = document.createRange();
			t_range.setStart(st_nd, 0);
			t_range.setEnd(st_nd, 0);
			sel_obj.removeAllRanges();
			sel_obj.addRange(t_range);
			wrd1 = words[0];
		} else {
			let curr_word = words[word_ind - 1];
			words.splice(curr_word, 1);
			try {
				let st_nd = curr_word.childNodes[0];
				let t_range = document.createRange();
				t_range.setStart(st_nd, curr_word.textContent.length);
				t_range.setEnd(st_nd, curr_word.textContent.length);
				sel_obj.removeAllRanges();
				sel_obj.addRange(t_range);
			} catch (err) {}
		}
		return;
	} else {
		let txt = element.textContent;
		if (pos > txt.length)
			return;
		let ch = txt.charCodeAt(pos - 1);
		let off_val = pos - 1;
		txt = txt.substring(0, pos - 1) + txt.substring(pos);
		if (ch == 160 || ch == "13" && word_ind != 0) {
			element.remove();
			words.splice(word_ind, 1);
			txt = words[word_ind - 1].textContent + txt;
			element = words[word_ind - 1];
			off_val = element.textContent.length;
		}
		txt = txt.replace("\u0010", "\n");
		txt = txt.replace("\u0013", "");
		element.innerHTML = txt;
		let st_nd = element.childNodes[0];
		let t_range = document.createRange();
		t_range.setStart(st_nd, off_val);
		t_range.setEnd(st_nd, off_val);
		sel_obj.removeAllRanges();
		sel_obj.addRange(t_range);
		return;

	}
}

function search_words(str) {
	for (let i = 0; i < words.length; i++)
		if (words[i].id == str)
			return i;
	return -1;
}

// Scroll the numbering and editor at the same time
function select_scroll_1(e) {
	lnnum.scrollTop = maed.scrollTop;
}

maed.addEventListener('scroll', select_scroll_1, false);

var sbmt_code = document.getElementById("sbmt-code");

sbmt_code.addEventListener('click', event => {
	console.log(maed.textContent);
});

// language selector dropdown

var lang_sel_label = document.getElementById("lang-sel-label");
var lang_dropdown = document.getElementById("lang-dropdown");
var lang_items = document.getElementsByClassName("lang-item");

lang_sel_label.addEventListener('click', evnt => {
	evnt.stopPropagation();
	if (lang_dropdown.style.visibility == "hidden" || lang_dropdown.style.visibility == "")
		lang_dropdown.style.visibility = "visible";
	else if (lang_dropdown.style.visibility == "visible")
		lang_dropdown.style.visibility = "hidden";
});

document.addEventListener('click', evnt => {
	if (lang_dropdown.style.visibility == "visible")
		lang_dropdown.style.visibility = "hidden";
});

for (let i = 0; i < lang_items.length; i++) {
	lang_items[i].addEventListener('click', evnt => {
		evnt.stopPropagation();
		if (lang_dropdown.style.visibility == "visible") {
			lang_dropdown.style.visibility = "hidden";
			lang_sel_label.innerHTML = lang_items[i].innerHTML;
			console.log(lang_sel_label.innerHTML);
		}
	});
}