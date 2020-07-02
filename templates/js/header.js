var li_menu_items = document.getElementsByClassName("li-menu-items");

var corres_li_menu_text = document.getElementsByClassName("corres-li-menu-text");

var problem_dropdown = document.getElementById("problem-dropdown");

var problem_container = document.getElementById("problem-container");

var computing_dropdown = document.getElementById("computing-dropdown");

var computing_container = document.getElementById("computing-container");

var linux_dropdown = document.getElementById("linux-dropdown");

var linux_container = document.getElementById("linux-container");

var crypto_dropdown = document.getElementById("crypto-dropdown");

var crypto_container = document.getElementById("crypto-container");


var click_problem = false,
    click_linux = false,
    click_computing = false,
    click_crypto = false;

for (let i = 0; i < li_menu_items.length; i++) {
    li_menu_items.item(i).addEventListener('mouseover', event => {
        li_menu_items.item(i).style.backgroundColor = "rgb(241, 93, 113)";
        corres_li_menu_text.item(i).style.color = "white";
    });
    li_menu_items.item(i).addEventListener('mouseout', event => {
        li_menu_items.item(i).style.backgroundColor = "white";
        corres_li_menu_text.item(i).style.color = "rgb(241, 93, 113)";
    });
}

problem_container.addEventListener('mouseover', event => {
    problem_dropdown.style.visibility = "visible";
});

problem_container.addEventListener('mouseout', event => {
    problem_dropdown.style.visibility = "hidden";
});

computing_container.addEventListener('mouseover', event => {
    computing_dropdown.style.visibility = "visible";
});

computing_container.addEventListener('mouseout', event => {
    computing_dropdown.style.visibility = "hidden";
});

linux_container.addEventListener('mouseover', event => {
    linux_dropdown.style.visibility = "visible";
});

linux_container.addEventListener('mouseout', event => {
    linux_dropdown.style.visibility = "hidden";
});

crypto_container.addEventListener('mouseover', event => {
    crypto_dropdown.style.visibility = "visible";
});

crypto_container.addEventListener('mouseout', event => {
    crypto_dropdown.style.visibility = "hidden";
});

for (let i = 0; i < corres_li_menu_text.length; i++) {
    corres_li_menu_text.item(i).addEventListener('click', event => {

    });
}