var player, playerAnime;
var bg, bgImg, invisibleGround, edges, coin, coinImg, coinGroup, obstacle, obsImg, obsGroup, gameOver, overImg;
var jumpSound, coinSound, treeSound, dieSound, winSound;
var score = 0, life = 20;
var gameState = 'play';

function preload(){
  playerAnime = loadImage('player.gif');
  bgImg = loadImage('bg.jpg');
  coinImg = loadImage('coin.gif');
  obsImg = loadImage('obstacle.gif');
  overImg = loadImage('game-over.gif');
  
  jumpSound = loadSound('jump-small.wav');
  coinSound = loadSound('coin-sound.wav');
  treeSound = loadSound('tree-sound.wav');
  dieSound = loadSound('die-sound.wav');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  edges = createEdgeSprites();
  
  bg = createSprite(windowWidth-350,windowHeight-500,300,300);
  bg.addImage(bgImg);
  bg.scale = 0.8;
  
  player = createSprite(windowWidth-(windowWidth-100),300,60,60);
  player.addImage(playerAnime);
  player.scale = 0.8;
  // player.debug = true;
  player.setCollider('rectangle',0,0,110,190)
  
  invisibleGround = createSprite(windowWidth/2,windowHeight-60,windowWidth,30);
  invisibleGround.visible = false;
  
  gameOver = createSprite(windowWidth/2,windowHeight/2,50,50);
  gameOver.addImage(overImg);
  
  coinGroup = new Group();
  obsGroup = new Group();
  
  
}

function draw() {
  background('white');
  drawSprites();
  
  fill('orange');
  stroke(25);
  textSize(25);
  text('Score : ' + score,windowWidth-120,windowHeight-(windowHeight-25));
  
  fill('red');
  stroke(25);
  textSize(25);
  text('Life : ' + life,windowWidth-(windowWidth-10),windowHeight-(windowHeight-25));
  
  player.collide(invisibleGround);
  player.collide(edges);
  
  if(gameState === 'play'){
    
      player.velocityY = player.velocityY + 1;
      gameOver.visible = false;
      bg.velocityX = -5;

    
      if(bg.x === windowWidth-1000){
          bg.x =  windowWidth-350;
        }
    
      if(keyDown('space') && player.y >= 240){
          player.velocityY = -(windowWidth-(windowWidth-20));
          jumpSound.play();
        }
      if(keyDown('right')){
          player.x = player.x + 5;
        }
      if(keyDown('left')){
          player.x = player.x - 5;     
        }
    
      if(player.isTouching(coinGroup)){
          coinGroup.destroyEach();
          coinSound.play();
          score = score + 5;
        }
    
      if(player.isTouching(obsGroup)){
          obsGroup.destroyEach();
          treeSound.play();
          life = life - 5;
        }
      if(life === 0){
        gameState = 'end';
        dieSound.play();
      }
      
      
      reCoin();
      reObstacle();
    
     }else
  if(gameState === 'end'){
        bg.velocityX = 0;
    
        coinGroup.destroyEach();
        obsGroup.destroyEach();
        // player.destroy();
    
        gameOver.visible = true;
        
        fill('red');
        stroke(25);
        textSize(20);
        text('Press Enter to Restart',windowWidth/2,(windowHeight/2)+100);  
    
        if(keyDown('enter')){
            gameState = 'play';
            life = 20;
            score = 0;
            player.x = 50;
            player.y = 300;
           }
     }
    
}

function reCoin(){
  if(frameCount%110 === 0){
    coin = createSprite(windowWidth+10,Math.round(random(windowHeight-(windowHeight-50),windowHeight-250)),50,50);
    coin.velocityX = -6;
    coin.addImage(coinImg);
    coin.scale = 0.18;
    lifetime = 200;
    // coin.debug = true;
    coin.setCollider('circle',0,0,150);
    coinGroup.add(coin);
  }
}

function reObstacle(){
  if(frameCount%120 === 0){
    obstacle = createSprite(windowWidth+10,windowHeight-170,50,50);
    obstacle.velocityX = -10;
    obstacle.addImage(obsImg);
    obstacle.scale = 0.4;
    obstacle.lifetime = 200;
    // obstacle.debug = true;
    obstacle.setCollider('rectangle',0,0,obstacle.width,350)
    obsGroup.add(obstacle);
  }
}