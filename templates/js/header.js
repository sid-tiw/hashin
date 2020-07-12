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
        li_menu_items.item(i).style.backgroundColor = "cornflowerblue";
        corres_li_menu_text.item(i).style.color = "white";
    });
    li_menu_items.item(i).addEventListener('mouseout', event => {
        li_menu_items.item(i).style.backgroundColor = "white";
        corres_li_menu_text.item(i).style.color = "cornflowerblue";
    });
}

problem_container.addEventListener('mouseover', event => {
    problem_dropdown.className = " extra-class";
});

problem_container.addEventListener('mouseout', event => {
    problem_dropdown.className = "problem-dropdown";
});

computing_container.addEventListener('mouseover', event => {
    computing_dropdown.className = "extra-class";
});

computing_container.addEventListener('mouseout', event => {
    computing_dropdown.className = "computing-dropdown";
});

linux_container.addEventListener('mouseover', event => {
    linux_dropdown.className = "extra-class";
});

linux_container.addEventListener('mouseout', event => {
    linux_dropdown.className = "linux-dropdown";
});

crypto_container.addEventListener('mouseover', event => {
    crypto_dropdown.className = "extra-class";
});

crypto_container.addEventListener('mouseout', event => {
    crypto_dropdown.className = "crypto-dropdown";
});


for (let i = 0; i < corres_li_menu_text.length; i++) {
    corres_li_menu_text.item(i).addEventListener('click', event => {

    });
}