var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1664;
canvas.height = 640;
document.body.appendChild(canvas);
var bgReady = false;

var killzombi = function(){
    if  (hero.x <= (monster.x + 64)
        && monster.x <= (hero.x + 64)
        && hero.y <= (monster.y + 64)
        && monster.y <= (hero.y + 64)
    ) {
        ++monstersCaught;
        reset();
    }

};
var blockmove = function(){ 
    if(hero.x >= 1600)
        hero.x = 1580;
    if(hero.x <= 20)
        hero.x = 40;
};

var bgImage = new Image();
var heromove = function(){};
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/zombi.png";
var hero = {
    speed: 256 
};
var monster = {};
var monstersCaught = 0;
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false)

var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    
    monster.x = 32 + (Math.random() * (canvas.width - 164));
    monster.y = 32 + (Math.random() * (canvas.height - 164));
};
//blockmove();

var heromove = function (modifier) {
    if (38 in keysDown) { 
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { 
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { 
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { 
        hero.x += hero.speed * modifier;
        blockmove();
       
    
    
        killzombi();
    }};



    //blockmove();

var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
  if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Quest: Kill 5 zombi ", 32, 32);
    ctx.fillText("Zombi killed: " + monstersCaught, 32, 64);

    if (monstersCaught > 4){
ctx.font = "50px Arial bold";
ctx.fillText("You killed Last zombii. Great job hero !!!",450,250);
togglePause();
restart.removeAttribute("hidden");
centralEntity.script.game.on('reset', this.reset, this)

    }
};
var main = function () {
    var now = Date.now();
    var delta = now - then;
    heromove(delta / 1000);
    render();

    then = now;

    requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();
reset();
main();
