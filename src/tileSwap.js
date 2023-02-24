let t2=document.getElementById("t2");
let t4=document.getElementById("t4");
let t6=document.getElementById("t6");
let t9=document.getElementById("t9");
let t12=document.getElementById("t12");

function swapT2() {
    t2.src="./tiles/tileHover_2.png";

}
function restoreT2() {
    t2.src="./tiles/tileDefault_2.png";
}

function swapT4() {
    t4.src="./tiles/tileHover_4.png";
}
function restoreT4() {
    t4.src="./tiles/tileDefault_4.png";
}

function swapT6() {
    t6.src="./tiles/tileHover_6.png";
}
function restoreT6() {
    t6.src="./tiles/tileDefault_6.png";
}

function swapT9() {
    t9.src="./tiles/tileHover_9.png";
}
function restoreT9() {
    t9.src="./tiles/tileDefault_9.png";
}

function swapT12() {
    t12.src="./tiles/tileHover_12.png";
}
function restoreT12() {
    t12.src="./tiles/tileDefault_12.png";
}

// Onclick
function useT2() {
    localStorage['pairCount'] = '2';
    window.location.replace('./gameScreen.html');
}
function useT4() {
    localStorage['pairCount'] = '4';
    window.location.replace('./gameScreen.html');
}
function useT6() {
    localStorage['pairCount'] = '6';
    window.location.replace('./gameScreen.html');
}
function useT9() {
    localStorage['pairCount'] = '9';
    window.location.replace('./gameScreen.html');
}
function useT12() {
    localStorage['pairCount'] = '12';
    window.location.replace('./gameScreen.html');
}