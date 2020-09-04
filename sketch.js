var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, knife;

var fruit1, fruit2, fruit3, fruit4, fruitsGroup;

var enemy,enemyGroup;

var score;

var lose;

var gameover,gameoverimg;

var knifesound,gameoversound;
function preload() {
  knife = loadImage("sword.png")

  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png")

  gameover = loadImage("gameover.png")
  
  enemy = loadImage("alien1.png")
  
  knifesound =loadSound("knife.mp3")
  gameoversound=loadSound("gameover.mp3")
}

function setup() {
  createCanvas(400, 400);

  sword = createSprite(200, 200, 20, 50);
  sword.addImage("knife1", knife)
  sword.scale = 0.5

  gameoverimg = createSprite(200,200,20,20)
  gameoverimg.addImage(gameover)
  
  fruitsGroup = new Group();
enemyGroup = new Group();
  
  gameoverimg.setCollider("rectangle",0,0,400,gameoverimg.width);
 //gameoverimg.debug = true
  
  score=0
  lose=0
}

function draw() {
  background("brown")
  
  text("Score: "+ score, 300,20);
    text("Lose: "+ lose, 50,20);

  if(gameState === PLAY){
gameoverimg.visible=false;
    
  sword.y = World.mouseY
  sword.x = World.mouseX
    
 fruits();
  enemies();
    
    
 if(fruitsGroup.isTouching(sword)){
  fruitsGroup.destroyEach();
  knifesound.play();
  score=score+2
 }
    if (enemyGroup.isTouching(sword)) { 
  enemyGroup.destroyEach();  
      gameoversound.play();
   lose=lose+1   
      gameState=END
  }
 
  }
  if (gameState === END){
gameoverimg.visible=true
    
 score=0
fruitsGroup.setLifetimeEach(-1);
enemyGroup.setLifetimeEach(-1);
    
fruitsGroup.setVelocityXEach(0);
enemyGroup.setVelocityXEach(0);
    
    if (mousePressedOver(gameoverimg)){
 reset();
 }
    background("blue")
  }
  drawSprites();
}

function fruits() {
  if (frameCount % 60 === 0) {
    

    
      position = Math.round(random(1, 2));
   fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    r = Math.round(random(1, 4))
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2)
    } else if (r == 3) {
      fruit.addImage(fruit3)
    } else if (r == 4) {
      fruit.addImage(fruit4)
    }
     if(position==1)
    {
      fruit.x=400;
    fruit.velocityX = -(7+(score/4));
      fruit.setlifetime = 100;
    } else if(position==2){
     fruit.x=0;
      
    fruit.velocityX = (7+(score/4));
      fruit.setlifetime =- 100;
    }

    fruit.y= Math.round(random(50, 340));
    
    //assign lifetime to the variable
    

    
    fruitsGroup.add(fruit);
  }
}

function enemies() {
  if (frameCount % 200 === 0) {
     position = Math.round(random(1, 2));
    monster = createSprite(400, 200,20, 20);
    monster.addAnimation("running", enemy);
     if(position==1)
    {
      monster.x=400;
    monster.velocityX = -(9+(score/10));
      monster.setlifetime = 100;
    } else if(position==2){
     monster.x=0;
      
    monster.velocityX = (9+(score/10));
    monster.setlifetime =- 100;
    }
monster.y=Math.round(random(100,300));

monster.setlifetime=50;
enemyGroup.add(monster);
  }
}

function reset(){
score=0;
  gameState=PLAY
  fruitsGroup.destroyEach();
  gameoverimg.visible=false;

}