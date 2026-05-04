let stars = [];
let asteroids = [];
let bullets = [];

let myFont;

function preload() {
    myFont = loadFont('fonts/Game.ttf')
}

function setup() {
   createcanvas(800, 500) 
}

function draw() {
    background(20);


    //Asteroid spawn + movement
    if (frameCount % 60 === 0) {
    let newSize = random(60, 100)

        asteroids.push({
        x: width,
        y: random(height),
        size: newSize,
        speed: map(newSize, 20, 120, 6, 2) 
        //the bigger the asteroid the slower it moves
        });
    }

    //stars loop 
    for (let s of stars) {
        fill(255);
        noStroke();
        ellipse(s.x, s.y, 2);

        s.x -= s.speed;

        if (s.x < 0) {
            s.x = width;
            s.y = random(height);
        }
    }

    for (let i = asteroids.length - 1; i>= 0; i--) { 
        let a = asteroids [i];

        //draw asteroid
        fill(120);
        ellipse (a.x, a.y, a.size); 

        fill(100);
        ellipse (a.x + random(-3, 3),a.y + random(-3,3), a.size * 0.6);
        //wanted to make it more bulky and more asteroid like but found some difficulties

        //move left
        a.x -= a.speed;

        //remove if off screen
        if (a.x < -a.size) {
            asteroids.splice(i, 1); 
        }
    } 

    let base = map(sin(frameCount * 0.1), -1, 1, 180, 255);
    let glitch = random(-50, 0);

    fill(base + glitch);
    textSize(32);
    textAlign(CENTER, TOP);
    text("Space Rider", width / 2, 20);
    
    drawRider(width / 4, height / 2);

}

function drawRider(x,y){
push();
translate(x,y);

//slight tilt
rotate(-0.2);

rectMode(CENTER);

//BOARD
fill(180, 100, 255);
ellipse(0, 20, 60, 15);

//BODY
fill(100, 255, 150);
rect(0, 0, 20, 30, 5);

//HEAD 
fill(120, 255, 180);
ellipse(0, -25, 20, 20);

//EYES
fill(0);
ellipse(-4, -25, 3, 5);
ellipse(4, -25, 3, 5);

//ANTENNAE
stroke(120,255,180);
line(-5, -35, -8, -45);
line(5, -35, 8, -45);
noStroke();

pop();
}

//Shooting 
function mousePressed(){
  bullets.push ({
    x: width/4, 
    y: height /2,
    speed:8 
  });

    fill(255);
    textSize(32);
    text("Space Rider", 280, 250);

}