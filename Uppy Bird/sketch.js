let bird;
let pipes = [];
let birdImg;
let pipeImg;
let bg;
let score = 0;
let soundClasifier;
function preload() {
    birdImg = loadImage('bird.png');
    pipeImg = loadImage('pipe.png');
    bg = loadImage('background.png');
    const options = {
        probabilityThreshold: 0.95
    }
    soundClasifier = ml5.soundClassifier("SpeechCommands18w", options)
}
function setup() {
    createCanvas(innerWidth, innerHeight);
    soundClasifier.classify(results);
    bird = new Bird()
    pipe = new Pipe()
}
function draw() {

    background(0);
    image(bg, -1000, innerHeight / 7, bg.width - 100, bg.height);
    bird.show();
    bird.update();

    if (frameCount % 100 == 0) {
        pipes.push(new Pipe());
    }

    // there is no adding of the element here adding happens because of the loop in
    // the draw funciton.

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();
        if ((pipes[i].x) < (-pipes[i].width)) {
            pipes.splice(i, 1);
        }
        if (pipes[i].hits(bird)) {
            gameOver();
        } else {
            score++;
        }
    }
    showScores();
}
//using the key board to play: its much easier to play :).
// function keyPressed() {
//     if (key === " ") {
//         bird.up();
//     }
// }

function results(error, answer) {
    if (error) {
        console.log("Sth went wrong");
        console.error(error);

    }
    if (answer[0].label === "up") {
        bird.up();
        bird.up();
        s
    }
    console.log(answer);
}

function gameOver() {
    textSize(64);
    textAlign(CENTER, CENTER);
    text('GAMEOVER', innerWidth / 2, innerHeight / 2);

    textAlign(LEFT, BASELINE);

    text("Your Score: " + score, innerWidth / 3.2, innerHeight / 3)
    noLoop();
}
function showScores() {
    textSize(32);
    text('score: ' + score, 0, 32);
}
