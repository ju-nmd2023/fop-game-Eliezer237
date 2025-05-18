
let doodlerX,doodlerY;
let is_going_left = false;
let is_going_right = false;
let doodler_img;
let platform_img;
let board_png;
const platforms=[];
 const numberfPlatforms=5;
let is_jumping=false;
let velocity=0;
let gravity=0.9;
let ground=300;
const platformWidth=85;
const platformHeight=20;
const doodlerWidth=60;
const doodlerHeight=60;





// loading the images
function preload() { 
    doodler_img = loadImage('./images/business left look.png');
    platform_img=loadImage("./images/platform.png")
    board_png=loadImage("./images/board.png")

  }
  
// function setup 
function setup() {
    createCanvas(600,400);
    doodlerX=400;
    doodlerY=height-100;

    for (let i=0; i<=5;i++)
platforms.push(new Platform(i*(height/numberfPlatforms))); //I want to generate multiple platforms here


//placing doodler on the top of the platform wen starting the game
let startPlatform=platforms[4];
doodlerX= startPlatform.x+platformWidth/2-doodlerWidth/2;
doodlerY=startPlatform.y-doodlerHeight;


velocity=0;
is_jumping=false;
   
  }

//class
  class Platform{
      constructor(y){
        this.x=Math.round(Math.random()*(width-85));
        this.y=y;
      }

      show(){
        image(platform_img,this.x,this.y,85,20);
      }
  }
 //drawing my beatiful doodler
function draw(){
    image(board_png,0,0,width,height)
    moveDoodler();

  // doodler bottom &&right variables
  
    let doodlerBottom=doodlerY+doodlerHeight;
    let doodlerRight=doodlerX+doodlerWidth;

  //calling my platforms to show up

  for(let platform of platforms){
    platform.show();

  //  I want to make variables and check the collision
  let platformRight=platform.x+platformWidth;
      
  if(
    doodlerBottom>platform.y&&
    doodlerBottom<=platform.y+platformHeight&&
    doodlerRight>platform.x&&
    doodlerX<=platformRight&& 
    velocity>0
    )

    {
      is_jumping=true;
      velocity=-15;
    }


   }

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
  


    // what happens when I press the key here
    function keyPressed(e) {
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        is_going_right = true;
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        is_going_left = true;
      }
      if (e.code === "ArrowUp") {
        jump();
      }
    }

        // what happens when I release the key here
    function keyReleased(e) {
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        is_going_right = false;
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        is_going_left = false;
      }

      // move doodle jump function
    }
    function moveDoodler() {
      if (is_going_left) {
        doodlerX -= 5;
      }
      if (is_going_right) {
        doodlerX += 5;
      }
    }
        
  function jump(){
  
     if (!is_jumping){
        velocity=-15;
        is_jumping=true;
     }
       
    }