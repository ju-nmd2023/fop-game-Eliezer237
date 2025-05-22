
let doodler;
let isGoingLeft = false;
let isGoingRight = false;
let doodlerImg;
let platformImg;
let boardPng;
let score=0;
const platforms=[];
 const numberOfPlatforms=5;
let isJumping=false;
let velocity=0;
let gravity=0.9;
let ground=300;
const platformWidth=85;
const platformHeight=20;
let gameOver=false;
let gameState=false;


// loading the images
function preload() { 
    doodlerImg = loadImage('./images/business left look.png');
    platformImg=loadImage("./images/platform.png")
    boardPng=loadImage("./images/board.png")

  }
  
// function setup 
function setup() {
  createCanvas(600,400);
  doodler=new Doodler(400,height-100,doodlerImg)

    for (let i=0; i<numberOfPlatforms;i++)
platforms.push(new Platform(i*(height/numberOfPlatforms))); //I want to generate multiple platforms here


//placing doodler on the top of the platform wen starting the game
let startPlatform=platforms[4];
doodler.x= startPlatform.x+platformWidth/2-doodler.width/2;
doodler.y=startPlatform.y-doodler.height;


velocity=0;
isJumping=false;
   
  }



//doodler class 
  class Doodler{
    constructor(x,y,img){
      this.x=x;
      this.y=y;
      this.width=60;
      this.height=60;
      this.image=img;
    }
    show(){
      image(this.image,this.x,this.y,this.width,this.height);
    }
  }


//class
  class Platform{
      constructor(y){
        this.x=Math.round(Math.random()*(width-85));
        this.y=y;
      }

      show(){
        image(platformImg,this.x,this.y,85,20);
      }

//function updates
      update(){
        if (isJumping){
          this.y +=5;
        }
      
          if(this.y>height)  {
          this.y=0;
          this.x=Math.round(Math.random()*(width-85));
          score++;
        }
      
      }
    }
  
 //drawing my beautiful doodler

   function draw(){
    image(boardPng,0,0,width,height)
    if(!gameState){
      startScreen();
      return;
    }
  
    moveDoodler();
  

  // doodler bottom &&right variables
  
    let doodlerBottom=doodler.y+doodler.height;
    let doodlerRight=doodler.x+doodler.width;

  //calling my platforms to show up

  for(let platform of platforms){
    platform.show();
    platform.update();

  //  I want to make variables and check the collision
  let platformRight=platform.x+platformWidth;
      
  if(
    doodlerBottom>platform.y&&
    doodlerBottom<=platform.y+platformHeight&&
    doodlerRight>platform.x&&
    doodler.x<=platformRight&& 
    velocity>0
    )

    {
      isJumping=true;
      velocity=-15;
    }


   }

    if(isJumping){
      velocity=velocity+gravity;
      doodler.y=doodler.y+velocity;  
    }

    if(doodler.y>=ground){
        velocity=0;
        doodler.y=ground;
        isJumping=false;
        gameOver=true;
       
    }
  //   Got this idea from chatgpt
      
 //  here I want to keep doodler on canvas
  doodler.x = constrain(doodler.x, 0, width - doodler.width);
  doodler.y = constrain(doodler.y, 0, height - doodler.height);



   //score updates
   fill(0) 
   textSize(20);
   text("Score:"+score,40,30);
   
   //gameover
   if(gameOver){
    background(0);
   fill(255,0,0);
   textSize(36);
   textAlign(CENTER,CENTER);
   text("Game Over",width/2,height/2-30);
   textSize(20);
   text("score:"+score,width/2,height/2+10);
   text("Click anywhere to restart ",width/2,height/2+50)
   noLoop();
   return;
   }

   doodler.show();

  }


    //the starting screen
   function startScreen(){
    background(255,0,255);
    fill(255);
    rect(257,195,100,45);
    fill(0)
    textSize(20);
    textAlign(CENTER,CENTER);
    text("Start",280,189,60,60);
   }

   function mousePressed(){
    if(!gameState&&
      mouseX>257 && mouseX<357 && mouseY>180 && mouseY<240){
        gameState=true;
        loop();
      }
      if (gameOver){
        resetGame();
      }
    
   }

  
    // what happens when I press the key here
    function keyPressed(e) {
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        isGoingRight = true;
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        isGoingLeft= true;
      }
      if (e.code === "ArrowUp") {
        jump();
      }
    }

        // what happens when I release the key here
    function keyReleased(e) {
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        isGoingRight = false;
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        isGoingLeft = false;
      }

      // move doodle jump function
    }
    function moveDoodler() {
      if (isGoingLeft) {
        doodler.x -= 5;
      }
      if (isGoingRight) {
        doodler.x += 5;
      }
    }
        
  function jump(){
  
     if (!isJumping){
        velocity=-15;
        isJumping=true;
     }
       
    }

    //game reset
    
    function resetGame(){
      score=0;
      velocity=0;
      gameOver=false;
      isJumping=false;

      platforms.length=0;
      for (let i=0; i<numberOfPlatforms;i++)
      platforms.push(new Platform(i*(height/numberOfPlatforms))); //I want to regenerate multiple platforms here
       //doodler position on top of a platform
      let startPlatform=platforms[4];
      doodler.x= startPlatform.x+platformWidth/2-doodler.width/2;
      doodler.y=startPlatform.y-doodler.height;
      loop();
    }