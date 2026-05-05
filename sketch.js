let stars = [];
let asteroids = [];
let bullets = [];
let effects = [];
let riderX;
let riderY;
let score = 0;
let misses = 0;
let maxMisses = 5;
let gameOver = false; 
let music;



let myFont;

function preload() {
   myFont = loadFont('fonts/Game.ttf');
   music = loadSound('music.mp3'); 
}

function setup() {
   createCanvas(800, 500) 

   riderX = width / 4;
   riderY = height / 2;

  if (music) {
    music.setVolume(0.5)
  }

   for (let i = 0; i < 100; i++) { 
    stars.push ({
        x: random(width),
        y: random (height), 
        speed: random(1, 3)
    });
   }
}

function draw() {
    
    if (gameOver) {
        background(0);

        fill(255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width / 2, height / 2);

        textSize(20);
        text("Final Score: " + score, width / 2, height / 2 + 40);

        textSize(20);
        text("Press R to restart", width / 2, height / 2 + 80);
        
        return; //stops game loop
    }

    background(20);


    //Asteroid spawn + movement
    if (frameCount % 60 === 0) {
    let newSize = random(60, 100);

        asteroids.push({
        x: width,
        y: random(height),
        size: newSize,
        speed: map(newSize, 20, 120, 6, 2) 
        //the bigger the asteroid the slower it moves
        });
    }

    //STARS 
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
    //ASTEROIDS
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

            misses++; // counts misses

               if (misses >= maxMisses) {
        gameOver = true;
    }
        }
    } 

    //BULLETS
   for (let i = bullets.length -1; i >= 0; i--) {
    let b = bullets[i];

    //Draw bullet
    fill(255, 200, 0);
    noStroke();
    ellipse(b.x, b.y, 8);

    //move bullet
    b.x += b.vx;
    b.y += b.vy;

    //collision with asteroid
    for (let j = asteroids.length - 1; j>= 0; j--) {
        let a = asteroids[j];

        let d = dist(b.x, b.y, a.x, a.y);

        if (d < a.size  * 0.6) {

            score += 10;

            //remove asteroid 
            asteroids.splice(j, 1);

            //remove bullet
            bullets.splice(i, 1);

         for (let k = 0; k < 5; k++) {
        effects.push({
            x: a.x,
            y: a.y,
            size: random(5, 15),
            life: 20
        });
    }

            continue; //stop checking this bullet
        }
      }
    
    
    //remove if off screen
    if (b.x > width || b.x < 0 || b.y < 0 || b.y > height) {
        bullets.splice(i, 1);
    }
   }
    //EFFECTS
     for (let i = effects.length - 1; i >= 0; i--) {
        let e = effects[i];

        //draw explosion 
        noStroke();
        fill(255, random(100, 200), 0, 150);
        ellipse(e.x, e.y, e.size); 

        //animate 
        e.size += 2;   //grows
        e.life--;      //fades away over time 

        // remove when done 
        if (e.life <=0) {
            effects.splice(i, 1)
        }
     }

    let base = map(sin(frameCount * 0.1), -1, 1, 180, 255);
    let glitch = random(-50, 0);
    
    textFont(myFont); 

    //UI TEXT
    fill(base + glitch);
    textSize(32);
    textAlign(CENTER, TOP);
    text("Space Rider", width / 2, 20);
    
    drawRider(riderX, riderY);

    //SCORE TEXT 
    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);

    text("score: " + score, 10, 10);
    text("Misses: " + misses + "/" + maxMisses, 10, 40);

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

    //MUSIC
    if (music && !music.isPlaying()) {
        music.loop();
    }

    let angle = atan2(mouseY - riderY, mouseX - riderX);

  bullets.push ({
    x: riderX + cos(angle) * 20, 
    y: riderY + sin(angle) * 20,
    vx: cos(angle) * 9,
    vy: sin(angle) * 9
  });

} 

function resetGame () {
    score = 0;
    misses = 0;
    gameOver = false;

    asteroids = [];
    bullets = [];
    effects = [];

    riderX = width / 4;
    riderY = height / 2;
}

function keyPressed() {
    if (gameOver && (key === 'r' || key === 'R')) {
        resetGame();
    }
}