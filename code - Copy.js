let experimentActive = false;
let speed = 5;
let direction = 1;
let hit = 0;
let miss = 0;
let movingBox = document.getElementById("movingDiv");
let target = document.getElementById("targetDiv");
let changeStartingSide = true;
let changeStartingSideCount = 0;
let invertColors = false;
let invertColorsCount = 0;
let invertColorsCheck = 1;
let startingSide = 1;

const screenWidth = window.innerWidth;
const leftDiv = document.getElementById("leftDiv");
const p_hit = document.getElementById("hit");
const p_miss = document.getElementById("miss");
const p_time = document.getElementById("time");
const p_mean = document.getElementById("mean");
const p_speed = document.getElementById("pSpeed");
const p_invert = document.getElementById("pInvert");
const b_decSpeed = document.getElementById("decreaseSpeed");
const b_incSpeed = document.getElementById("increaseSpeed");
const b_falseInvert = document.getElementById("falseInvert");
const b_trueInvert = document.getElementById("trueInvert");
const startingLeft = leftDiv.offsetLeft;
const startingRight = startingLeft + leftDiv.offsetWidth - movingBox.offsetWidth;

async function startExperiment() {
    experimentActive = true;
    changeStartingSideCount = newStartingSide();
    invertColors = newInvert();

    if(movingBox) {
        let xPos = 0;
        let boxWidth = movingBox.offsetWidth;
        while(true) {
            if(!experimentActive) break;
            xPos = movingBox.offsetLeft;
            if(xPos + boxWidth > startingRight + movingBox.offsetWidth || xPos < startingLeft) {
                direction = -direction;
            }
            movingBox.style.left = (xPos + speed * direction) + 'px';
            await sleep(1);
        }
    }
}

function checkTarget() {
    if (movingBox.offsetLeft >= target.offsetLeft 
        && movingBox.offsetLeft + movingBox.offsetWidth <= target.offsetLeft + target.offsetWidth) {
        hit++;
        p_hit.innerHTML = "Hit: " + hit;
    } else {
        miss++;
        p_miss.innerHTML = "Miss: " + miss;
    }

    if(changeStartingSide == true) {
        changeStartingSideCount--;
        p_time.innerHTML = "changeStartingSideCount: " + changeStartingSideCount;
        if(changeStartingSideCount == 0) {
            startingSide = -startingSide;
            changeStartingSideCount = newStartingSide();
        }
        if(startingSide == 1) {
            movingBox.style.left = startingLeft;
        } else {
            movingBox.style.left = startingRight;
        }
    }

    if(invertColors == true) {
        invertColorsCount--;
        p_mean.innerHTML = "Invert count: " + invertColorsCount;
        if(invertColorsCount == 0) {
            invertColorsCheck = -invertColorsCheck;
            invertColorsCount = newInvert();
        }
        if(invertColorsCheck == 1) {
            movingBox.style.background = "blue";
            leftDiv.style.background = "black";
            target.style.background = "blue";
        } else {
            movingBox.style.background = "black";
            leftDiv.style.background = "blue";
            target.style.background = "black";
        }
    }
}

function stopExperiment() {
    experimentActive = false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.onkeydown = onKey;

function onKey(e) {
    if(e == null) {
        e = window.event;
    }
    switch (e.which || e.charCode || e.keyCode) {
        case 32:
            // space
            if (!experimentActive) {
                startExperiment();
            } else {
                checkTarget();
            }
            break;
        case 65:
            // a
            if (experimentActive) {
                stopExperiment();
            }
            break;
        case 66:
            // b
            // here you can extend... alert("pressed the b key"); break;
    }
}

function getRandomNumber(lower, upper) {
    return Math.floor(Math.random() * (upper - lower) + lower);
}

function newStartingSide() {
    return getRandomNumber(2, 7);
}

function newInvert() {
    return getRandomNumber(7, 10);
}

b_decSpeed.onclick = function fIncSpeed() {
    if(speed == 0) {
        return;
    }
    speed--;
    p_speed.innerHTML = "Speed: " + speed;
}

b_incSpeed.onclick = function fDecSpeed() {
    speed++;
    p_speed.innerHTML = "Speed: " + speed;
}

b_falseInvert.onclick = function fFalseInvert() {
    invertColors = false;
    p_invert.innerHTML = "Invert : nej";
}

b_trueInvert.onclick = function fTrueInvert() {
    invertColors = true;
    p_invert.innerHTML = "Invert: ja";
}