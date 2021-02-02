var pokeBall, pikachu, obstacles, score, ground, background;
var pokeBallImage, pikachuAnimation, obstaclesImage, backgroundImage;
var pokeBallGroup, obstaclesGroup;
var Play = 1;
var End = 2;
var gameState = Play;
var count = 0;

function preload(){
  pokeBallImage = loadImage("sprites/pokeBalls.png");
  pikachuAnimation = loadAnimation("sprites/PikachuGif.gif");
  obstaclesImage = loadImage("sprites/TeamRocket.png");
  backgroundImage = loadImage("sprites/Jungle.jpg");
}

function setup(){
  background = createSprite(0,0,1600,800);
  background.addImage("background", backgroundImage);
  background.scale = 15;

  pikachu = createSprite(100, 300, 20, 50);
  pikachu.addAnimation("pikachu", pikachuAnimation);
  pikachu.scale = 0.5;

  ground = createSprite(1600 ,780, 1600, 20);
  ground.x = ground.width /2;
  ground.velocityX = -5

  score = 0;

  pikachu.debug = true;
  pikachu.setCollider("circle", 0, 0, 20);

  pokeBallGroup = new Group();
  obstaclesGroup = new Group();

}

function draw(){
  createCanvas(1600,800);

  if(gameState == Play){
    background.velocityX = -5;

    if(background.x < 0){
      background.x = background.width/2;
    }
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space")&& pikachu.y >= 159) {
      pikachu.velocityY = -12;
    }
  
    ground.visible = false;
  
    pikachu.velocityY = pikachu.velocityY + 0.8;

    if(pokeBallGroup.isTouching(pikachu)){
      score = score+frameCount/10;
      pokeBallGroup.destroyEach();
    }

    if(obstaclesGroup.isTouching(pikachu)){
      score = score - 10;
      count = count +1;
      if(count > 3){
        gameState = End;
      }
    }

    pokeBalls();
    TeamRocket();
  }

  if(gameState == End){
    pikachu.velocityY = 0;
    pokeBallGroup.velocityX = 0;
    obstaclesGroup.velocityX = 0;
    }

  pikachu.collide(ground);

  drawSprites();
  textSize(30);
  strokeWeight(5);
  text("Score:"+ score,1400,100);
}

function pokeBalls(){
  if (frameCount % 60 === 0){
    pokeBall = createSprite(1600, 600, 10, 10);
    pokeBall.addImage("pokeBall", pokeBallImage);
    pokeBall.y = Math.round(random(50,750));
    pokeBall.velocityX = -25;
    pokeBall.scale = 0.15

    pokeBallGroup.add(pokeBall);
  }
}

function TeamRocket(){
if (frameCount % 50 === 0) {
  obstacles = createSprite(1600,600,10,10);
  obstacles.addImage("obstacles", obstaclesImage)
  obstacles.y = Math.round(random(55,750))
  obstacles.scale = 0.5;
  obstacles.velocityX = -30;

  obstaclesGroup.add(obstacles);
 }
}