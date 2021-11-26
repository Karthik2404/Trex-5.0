var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var ob1 ,ob2 , ob3 ,ob4 ,ob5 ,ob6;

var newImage;

var score = 0;

var PLAY = 1;
var END = 0;

var gamestate = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  cloudImage = loadImage("cloud.png");
  
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");

}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;

  gameOver = createSprite(300,100); 
  gameOver.addImage(gameOverImg); 
  restart = createSprite(300,140); 
  restart.addImage(restartImg);
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)

  //create obstacles and cloud groups
  obstaclesGroup = new Group ();
  cloudsGroup = new Group ();

  trex.setCollider("circle" , 0 , 0 , 40)
  //trex.debug = true

  
}

function draw() {
  background(180);

  text("Score: "+ score, 500,50);
 
  if (gamestate===PLAY){
    ground.velocityX = -4;

    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("space")&& trex.y >= 160) {
      trex.velocityY = -12;
    }
    
    trex.velocityY = trex.velocityY + 0.8

     //spawn the clouds
    spawnClouds();
    spawnObstacles();

    gameOver.visible = false;
    restart.visible = false;

    if (obstaclesGroup.isTouching (trex)){
      gamestate = END
    }

  }
  else if (gamestate===END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.changeAnimation("collided", trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach (0);
    cloudsGroup.setVelocityXEach (0);
    gameOver.visible = true;
    restart.visible = true;
   
  }
  
  trex.collide(invisibleGround);
  
 
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
  
    //assigning lifetime to the variable
    cloud.lifetime = 200
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
    }
}


function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.scale=0.4
    obstacle.velocityX = -3 
    var rand = Math.round(random(1,6));
     switch(rand) {
        case 1: obstacle.addImage(ob1);
                break;
        case 2: obstacle.addImage(ob2);
                break;
        case 3: obstacle.addImage(ob3);
                break; 
        case 4: obstacle.addImage(ob4);
                break; 
        case 5: obstacle.addImage(ob5);
                break;
        case 6: obstacle.addImage(ob6);
                break;
        default:
                break;
       }

       obstacle.lifetime=200

    obstaclesGroup.add(obstacle);   
  }
}


