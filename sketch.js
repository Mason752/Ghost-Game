var t,timg;
var d,dimg,dGroup;
var c,cimg,cGroup;
var g,gimg;
var b,bGroup;
var gameState="PLAY";
var s;

function preload() {
  
  timg=loadImage("tower.png");
  dimg=loadImage("door.png");
  cimg=loadImage("climber.png");
  gimg=loadImage("ghost-standing.png");
  
  s=loadSound("spooky.wav");
}

function setup() {
  
  createCanvas(600, 600);
  s.loop();
  
  t=createSprite(300, 300);
  t.addImage(timg)
  t.velocityY=1
  
  g=createSprite(200, 200, 50, 50);
  g.addImage(gimg);
  g.scale=0.3;
 
  dGroup=new Group();
  cGroup=new Group();
  bGroup=new Group();
}

function draw() {
  
  background("black");
  
  if(gameState==="PLAY") {
    
    
  if(t.y>400) {
    t.y=300;
  }
  
  if(keyDown(RIGHT_ARROW)) {
    g.x=g.x+3
  }
  
  if(keyDown(LEFT_ARROW)) {
    g.x=g.x-3
  }
  
  if(keyDown("space")) {
    g.velocityY=-5
  }
  g.velocityY=g.velocityY+0.8;
  
  if(cGroup.isTouching(g)) {
    g.velocityY=0
  }
  
  if(bGroup.isTouching(g)||g.y>600) {
    g.destroy();
    gameState="END";
  }
  
  spawnDoors();
  
  drawSprites();
}
  if(gameState==="END") {
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("GAME OVER, YOU'RE BAD!!!!!!",90, 250)
  }
}

function spawnDoors() {
  if(frameCount%240===0) {
    d=createSprite(200, -50);
    d.addImage(dimg);
    d.x=Math.round(random(120, 400));
    c=createSprite(d.x, 10);
    c.addImage(cimg);
    b=createSprite(d.x, 15, c.width, 2);
    b.velocityY=1;
    c.velocityY=1;
    d.velocityY=1;
    b.debug=true;
    g.depth=d.depth
    g.depth=g.depth+1
    c.lifetime=800;
    d.lifetime=800;
    dGroup.add(d);
    cGroup.add(c);
    bGroup.add(b);
    
  }
}