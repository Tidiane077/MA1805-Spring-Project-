let myFont;

function preload() {
    myFont = loadFont('fonts/Game.ttf')
}
function setup() {
   createCanvas(windowWidth, windowHeight);
   textFont(myFont);
}

function draw() {
    background(0);

    fill(255);
    textSize(32);
    textAlign(CENTER, TOP);
    text("Space Rider", width / 2, 20);
}