//create a sprite and give dimensions to cover full screen. and then display text as u won.

var background,backgroundImage;
var harry,harryImage;
var gem, gemImage, gemGroup;

var obstacle, obstacleImage, obstacleGroup;
var gameOver,gameOverImage;

var gemSound;
var backSound;

var blackwall;

var back;

var line1,line2,line3,lin4;

var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY; 

function preload() 
{
  backgroundImage = loadImage("background.jpg");
  harryImage = loadImage("harrynoback.png");
  gemImage = loadImage("gemimg.png");
 
  obstacleImage = loadImage("bombfinal.png");
  backSound = loadSound("backSound.mp3"); 
  gameOverImage = loadImage("Gameoverfinal.png");

  gemSound = loadSound("gemsound.mp3");
  
}

function setup() 
{
  createCanvas(700,500);
  
  //creating background of quidditch
  background = createSprite(200, 200, 500, 500);
  background.addImage(backgroundImage);
  background.velocityX = -7;

  line1 = createSprite(10, 10, 10, 1000);
  line2 = createSprite(10,10,1000,10);
  line3 = createSprite(490,10,10,1000);
  line4 = createSprite(10,490,1000,10);

  line1.visible=false;
  line2.visible=false;
  line3.visible=false;
  line4.visible=false;

  //back=createSprite(0,0,5000,5000);
  //back.shapeColor("black");

  harry = createSprite(50, 200, 20, 20);
  harry.addImage(harryImage);
  harry.scale = 0.22;
  
  gemGroup = new Group();
  
  obstacleGroup = new Group();

  backSound.loop();
}


function draw() 
{
  fill("white");
  textSize(30);
  text("Score:" + score, 190, 50);

  if (gameState === PLAY) 
  {

    if(background.x < 0)
    {
      background.x = background.width / 2;
    }


    //harry.debug=true;
    //obstacle.debug=true;
    //gem.debug=true;


    background.depth=score.depth;
    background.depth=background.depth-1;

    if (keyDown("right")){
      harry.x = harry.x+5;
    }

    if (keyDown("left")) {
      harry.x = harry.x-5;
    }

    if (keyDown("up")) {
      harry.y = harry.y-5;
    }

    if (keyDown("down")) {
      harry.y = harry.y+5;
    }
    
    harry.bounceOff(line1);
    harry.bounceOff(line2);
    harry.bounceOff(line3);
    harry.bounceOff(line4);

    if (harry.isTouching(gemGroup)) 
    {  
     score = score + 5;
     gemGroup.destroyEach();
     gemSound.PLAY;
     
    }




if(harry.isTouching(obstacleGroup))
{
  

  back=createSprite(0,0,5000,5000);
  //back.fill("black");
  //back.shapeColor("black");
  gameOver=createSprite(240,235,50,50);
  gameOver.addImage(gameOverImage);
  gameOver.scale=1;

  harry.visible = false;

  obstacleImage.visible = false;
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.visible = false;
  obstacleGroup.destroyEach();


  gemGroup.setVelocityXEach(0);
  gemImage.visible = false;
  gemGroup.visible = false;
  gemGroup.destroyEach();

  background.destroy();
 
  gameState = END;
}
  }

  if (gameState === END) 
  {
    background.destroy();
    harry.visible = false;

    obstacleImage.visible = false;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.visible = false;
    obstacleGroup.destroyEach();

 

    gemGroup.setVelocityXEach(0);
    gemImage.visible = false;
    gemGroup.visible = false;
    gemGroup.destroyEach();
  }
  spawnGems();
  
  spawnObstacle()
  drawSprites();
}

function spawnGems() 
{
  if(gameState===PLAY)
  {
    if (World.frameCount % 80 === 0) 
    {
      gem = createSprite(300, 200, 20, 20);
      gem.addImage(gemImage);
      gem.scale = 0.2;
      gem.velocityX = -6;
      gem.y = Math.round(random(100, 300));

      gemGroup.add(gem);
    }
  }
}


function spawnObstacle() 
{
  if(gameState===PLAY)
  {
    if (World.frameCount % 150 === 0) 
    {
      obstacle = createSprite(200,0,20, 20);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.2;
      obstacle.x = Math.round(random(100, 300));
      obstacle.velocityY = 6;
    
      obstacleGroup.add(obstacle);

    }
  }
}

