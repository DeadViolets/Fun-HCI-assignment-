let experimentActive = false;
let speed = 3;
let direction = 1;
let hit = 0;
let miss = 0;
let movingBox = document.getElementById("movingDiv");
let target = document.getElementById("targetDiv");
let changeStartingSide = 0;
let startingSide = 1;

const screenWidth = window.innerWidth;
const rightDiv = document.getElementById("rightDiv");
const leftDiv = document.getElementById("leftDiv");
const p_hit = document.getElementById("hit");
const p_miss = document.getElementById("miss");
const p_time = document.getElementById("time");
const p_speed = document.getElementById("pSpeed");
const b_decSpeed = document.getElementById("decreaseSpeed");
const b_incSpeed = document.getElementById("increaseSpeed");
const startingLeft = leftDiv.offsetLeft;
const startingRight = startingLeft + leftDiv.offsetWidth - movingBox.offsetWidth;

async function startExperiment() {
    experimentActive = true;
    changeStartingSide = Math.floor(Math.random() * 5 + 2);

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
    if (movingBox.offsetLeft >= target.offsetLeft && movingBox.offsetLeft + movingBox.offsetWidth <= target.offsetLeft + target.offsetWidth) {
        hit++;
        p_hit.innerHTML = "Hit: " + hit;
    } else {
        miss++;
        p_miss.innerHTML = "Miss: " + miss;
    }

    changeStartingSide--;
    p_time.innerHTML = "changeStartingSide: " + changeStartingSide;
    if(changeStartingSide == 0) {
        startingSide = -startingSide;
        changeStartingSide = Math.floor(Math.random() * 2 + 5);
    }
    if(startingSide == 1) {
        movingBox.style.left = startingLeft;
    } else {
        movingBox.style.left = startingRight;
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