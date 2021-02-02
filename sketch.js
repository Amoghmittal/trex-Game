var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudimg
var  obstacles,obstacles1img,obstacles2img,obstacles3img,obstacles4img,obstacles5img,obstacles6img;
var score;
var PLAY=1
var END=0;
var gameState=PLAY;
var Cloudgroup;
var obstaclesgroup;
var gameOver,gameOverimg;
var restart,restartimg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudimg=loadImage('cloud.png')
  groundImage = loadImage("ground2.png")
  obstacles1img=loadImage('obstacle1.png')
obstacles2img=loadImage('obstacle2.png')  
 obstacles3img=loadImage('obstacle3.png') 
  obstacles4img=loadImage('obstacle4.png')
  obstacles5img=loadImage('obstacle5.png')
  obstacles6img=loadImage('obstacle6.png')
  gameOverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided)
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  score=0;
  gameOver=createSprite(300,100,20,5)
  gameOver.addImage("see",gameOverimg)
   
  restart=createSprite(300,110,10,10)
 restart.addImage("write",restartimg) 
  
  Cloudgroup=new Group()
  obstaclesgroup= new Group()
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background(0);
  
  if(gameState==PLAY){
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
 trex.velocityY = trex.velocityY + 0.8   
 if (ground.x < 0){
    ground.x = ground.width/2;
  }   
   spawnClouds();
  spawnObstacles(); 
     score=score+Math.round(getFrameRate()/15)
    ground.velocityX=-2;
    if(trex.isTouching(obstaclesgroup)){
      gameState=END;
    } 
  }
  
 else if (gameState==END) {
  ground.velocityX=0;   
   obstaclesgroup.setVelocityXEach (0)    
  Cloudgroup.setVelocityXEach(0)
  obstaclesgroup.setLifetimeEach( -1)
    Cloudgroup.setLifetimeEach(-1)
    trex.changeAnimation("collided",trex_collided)
  
   
         }
 
  
  
  
 
  trex.collide(invisibleGround);
  text('score:'+score,0,15);

  drawSprites();
}

function spawnClouds(){

 if(frameCount%80==0) {
  cloud=createSprite(600,100,20,10)
cloud.velocityX=-2;
cloud.addImage("stand",cloudimg) 
  cloud.scale=0.5; 
   cloud.y=random(50,100)
  trex.depth=cloud.depth;
   trex.depth=trex.depth+1;
  cloud.lifetime=300; 
   Cloudgroup.add(cloud);
 }
}

function spawnObstacles(){
if(frameCount%60==0){
obstacles=createSprite(600,160,10,20)
 obstacles.velocityX=-5;
  obstacles.scale=0.5
  obstacles.lifetime=120
  var r=Math.round(random(1,6))
  switch(r){
    case 1:  obstacles.addImage("see",obstacles1img)
      break;
     case 2:  obstacles.addImage("see",obstacles2img)
      break; 
    case 3:  obstacles.addImage("see",obstacles3img)
      break;  
     case 4:  obstacles.addImage("see",obstacles4img)
      break; 
      case 5:  obstacles.addImage("see",obstacles5img)
      break;
     case 6:  obstacles.addImage("see",obstacles6img)
      break;
      default:break;
     
  }
obstaclesgroup.add(obstacles)
}
}


























