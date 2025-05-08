
let doodlerX,doodlerY;
let is_going_left = false;
let is_going_right = false;
let doodler_img;
let is_jumping=false;
let velocity=0;
let gravity=0.9;
let ground=300;


// loading the images
function preload() { 
    doodler_img = loadImage('./images/business left look.png');
  }
  

// function setup starts
function setup() {
    createCanvas(600,400);
    doodlerX=400;
    doodlerY=height-100;
   
  }


// function draw starts

function draw(){
    background(220);
    move();



    if(is_jumping){
      velocity=velocity+gravity;
      doodlerY=doodlerY+velocity;  
    }

    if(doodlerY>=ground){
        velocity=0;
        doodlerY=ground;
        is_jumping=false;
    }
 //  here I want to keep doodler on canvas
  doodlerX = constrain(doodlerX, 0, width - 80);
  doodlerY = constrain(doodlerY, 0, height - 80);
   image(doodler_img,doodlerX,doodlerY,60,60);
  }


//function move
function move(){
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

//when key is pressed starts

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      is_going_left = true;
    }
    
    if (keyCode === RIGHT_ARROW) {
      is_going_right = true;
    }
  
    if(keyCode===UP_ARROW){
        jump();
    }

   
    }



  //key released starts
  function keyReleased() {
    if (keyCode === LEFT_ARROW) {
      is_going_left = false;
    }
    if (keyCode === RIGHT_ARROW) {
      is_going_right = false;
    }
    
    }



  function jump(){
  
     if (!is_jumping){
        velocity=-15;
        is_jumping=true;
     }
       
    }

 
  
// 





 
