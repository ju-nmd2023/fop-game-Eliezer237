let doodlerX,doodlerY;
let is_going_left = false;
let is_going_right = false;
let doodler_img;



function preload() { 
    doodler_img = loadImage('./images/business left look.png');
}
  


function setup() {
    createCanvas(600,400);
    doodlerX=400;
    doodlerY=height-100;
}

function draw(){
    background(220);
    if (is_going_left) {
        doodlerX -= 5;
      }
      if (is_going_right) {
        doodlerX += 5;
      }
        // Keep doodler on canvas
  doodlerX = constrain(doodlerX, 0, width - 80);
   image(doodler_img,doodlerX,doodlerY,60,60);
}


//when key is pressed

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      is_going_left = true;
    }
    if (keyCode === RIGHT_ARROW) {
      is_going_right = true;
    }
  }
  
  function keyReleased() {
    if (keyCode === LEFT_ARROW) {
      is_going_left = false;
    }
    if (keyCode === RIGHT_ARROW) {
      is_going_right = false;
    }
  }
// 



 
