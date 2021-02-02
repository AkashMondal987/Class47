var pokeBall, pikachu, obstacles, score, background;
var pokeBallImage, pikachuImage, obstaclesImage, backgroundImage;
var pokeBallGroup, obstaclesGroup;

function preload(){
  pokeBallImage = loadImage("Poke-Ball.png");
  pikachuImage = loadImage("Pikachu.png");
  obstaclesImamge = loadImage("Team Rocket.png");
  backgroundImage = loadImage("Jungle.jpg");
}

function setup() {
  createCanvas(600, 400);
  
  background = createSprite(0,0,600,600);
  background.addImage("background", backgroundImage);
  background.scale = 5;
  
  pikachu = createSprite(20,220,20,50);
  pikachu.addImage("pikachu", pikachuImage); 
  pikachu.scale = 0.2;
  
  pokeBallGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  text("Score: " + score, 500, 50);
  
  background.velocityX = -3;

    if (background.x < 0){
      background.x = background.width/2;
    }
  
  pikachu.y = World.mouseY;
  
  if (frameCount % 60 === 0) {
    pokeBall = createSprite(600,100,40,10);
    pokeBall.addImage("pokeBall", pokeBallImage)
    pokeBall.y = Math.round(random(10,390))
    pokeBall.scale = 0.1;
    pokeBall.velocityX = -3;
  }
  
  
  if (frameCount % 200 === 0) {
    obstacles = createSprite(600,100,40,10);
    obstacles.addImage("obstacles",obstaclesImamge )
    obstacles.y = Math.round(random(10,390))
    obstacles.scale = 0.3;
    obstacles.velocityX = -3;
  }
  
  if (pokeBall.isTouching(pikachu)){
    score = score + 1;
    pokeBall.destroyEach();
  }
   
  drawSprites();
}