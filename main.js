let points = 0;
let speed = 60;

// get HTML elements
let guidePoints = document.getElementById('points');
let guideSpeed = document.getElementById('speed');
let person = document.getElementById('person');
let alien = document.getElementById('alien');
let message = document.getElementById('message');
let body = document.getElementsByTagName('body')[0];

// Array of aliens
let aliens = new Array();

// Initial values in guide
guidePoints.innerHTML = `${points} aliens dodged`;
guideSpeed.innerHTML = `${speed} mph`;

// position of the person
// lane #1: 20px
// lane #2: 90px
// lane #3: 160px
person.style.top = parseInt(window.innerHeight) - 120 + "px";
person.style.left = "90px"; // start in lane #2

// start the game
let spammer = setInterval(spamAlien, 1000);
let game = setInterval(moveAliens, speed);


// move the person when you press a key
body.addEventListener('keypress', moveAlien);

// move the aliens forward
function moveAliens() {
    // position and lane for the person
    var personFront = parseInt(person.style.top) - 120;
    var personLane = person.style.left;

    // move the aliens
    for (var i = 0; i < aliens.length; i++) {
        // move the aliens forward
        var alienNewTop = (parseInt(aliens[i].style.top) + 10) + "px";
        aliens[i].style.top = alienNewTop;

        // check aliens
        var alienFront = parseInt(aliens[i].style.top);
        var alienLane = aliens[i].style.left;

        // remove passing aliens
        if (alienFront >= personFront + 120) {
            body.removeChild(aliens[i]);
            aliens.splice(i, 1);

            // add points
            points++;
            guidePoints.innerHTML = `${points} aliens dodged`;
        }

        // check collisions
        if (alienFront >= personFront && personLane == alienLane) {
            // stop the game
            clearInterval(game);
            clearInterval(spammer);

            // let you know about the crash
            message.innerHTML = "Game Over";
        }
    }
}

// create a new red alien
function spamAlien() {
    // create a new alien
    let img = new Image();
    img.src = "alien.png";

    // position the alien on the screen
    img.style.height = "120px"
    img.style.position = "absolute";
    img.style.top = "-120px";

    // get a random lane
    let lane = Math.floor(Math.random() * 3) + 1;
    if (lane == 1) img.style.left = "20px";
    if (lane == 2) img.style.left = "90px";
    if (lane == 3) img.style.left = "160px";

    // add the alien to the aliens array 
    aliens.push(img);

    // add the alien to the screen
    body.appendChild(img);
}

// move the person from lane to lane
function moveAlien(e) {
    // get the current lane
    // lane #1: 20px
    // lane #2: 90px
    // lane #3: 160px
    let lane = person.style.left;

    if (e.key == 'a' && lane == '160px') person.style.left = '90px';
    if (e.key == 'a' && lane == '90px') person.style.left = '20px';
    if (e.key == 'd' && lane == '20px') person.style.left = '90px';
    if (e.key == 'd' && lane == '90px') person.style.left = '160px';
}