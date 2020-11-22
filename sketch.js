var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, fruit, monster, fruitGroup, monstersGroup,score, r, randomFruit, edges;

var swordImage, fruit1, fruit2, fruit3, fruit4, gameOver,monsterImage,restart;  
    
function preload(){
  
  swordImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadImage("alien1.png", "alien2.png");
  gameOverImage = loadImage("gameover.png");
  cuttingSound = loadSound("Knife-Stab-A1.mp3");
  crashingSound = loadSound("Crash Sound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  restartImage = loadImage("restart_2.png")
  
} 

function setup(){
   
  sword=createSprite(240,240,10,10);
  sword.addImage(swordImage);
  sword.scale = 0.5;
  
  gameOver = createSprite(240,240,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1.2;
  restart = createSprite(240,310,100,100)
  restart.addImage(restartImage)
  restart.scale = 0.3;
    
  fruitGroup = createGroup();
  monstersGroup = createGroup();
  
  score = 0;
   
}

function draw(){
 createCanvas(480,480);
 background("black");
  
 if(gameState === PLAY){
   
   gameOver.visible = false;
   restart.visible = false;
   sword.visible = true;
      
   fruit();
   enemy(); 
   
   sword.y = World.mouseY;
   sword.x = World.mouseX;
   
   if(sword.isTouching(fruitGroup)){
     fruitGroup.destroyEach();
     cuttingSound.play();
     score = score + 1;
   }
 }
   
  if(sword.isTouching(monstersGroup)){
    gameState = END;
  
    
    gameOverSound.play();
    crashingSound.play();
}
       
  if(gameState === END){
    
    if(mousePressedOver(restart)){
      reset();
    }
         
    gameOver.visible = true;
    restart.visible = true;
    sword.visible = false;
            
    fruitGroup.destroyEach();
    monstersGroup.destroyEach();
        
    fruitGroup.setVelocityXEach(0);
    fruitGroup.setVelocityYEach(0);
    
  }
      
drawSprites();
  
  fill("lightGreen")
  textSize(20);
  text("Score: " + score,215,30);  
    
}

function reset(){
  gameState = PLAY;
  monstersGroup.destroyEach();
  fruitGroup.destroyEach();
  score = 0;
}

function fruit(){
  
if(World.frameCount%80 === 0){
  position = Math.round(random(1,2));
  var fruit = createSprite(400,200,20,20)
  if(position==1){
    fruit.x = 450;
    fruit.velocityX = -(10+score/2);
    fruit.lifetime = 54;
  }
  else
 {
  if(position==2){
    fruit.x = 0;
    fruit.velocityX =(10+score/2);
  fruit.lifetime = 58;
  }
 }
  
  fruit.scale = 0.2;
  r = Math.round(random(1,4))
  if(r === 1){
    fruit.addImage(fruit1)
  } else if (r === 2){
    fruit.addImage(fruit2);
  } else if (r === 3){
    fruit.addImage(fruit3)
  } else {
    fruit.addImage(fruit4)
  } 
   
  fruit.y = Math.round(random(50,450))
 
  fruitGroup.add(fruit);
     
 }
}
 
function enemy(){
  if(World.frameCount%200 === 0){
   position = Math.round(random(1,2));
  var monster = createSprite(400,200,20,20)
  if(position==1){
   monster.x = 450;
   monster.velocityX = -(10+score/2);
   monster.lifetime = 50;
  }
  else
 {
  if(position==2){
    monster.x = 0;
    monster.velocityX = (10+score/2);
    monster.lifetime = 55;
  }
 }
    monster.addAnimation("moving" , monsterImage);
    monster.y = Math.round(random(100,300))
   
    
    monstersGroup.add(monster);
    
  }
}
