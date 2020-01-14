
//An array holds all the player characters
const characters = ['images/char-boy.png', 'images/char-cat-girl.png',
 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];

let gemsCounter = 0;
let winsConter = 0;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if(this.x >= 500){
    this.x = -90;
    this.speed = 100 + Math.floor(Math.random() * 220);
  }
  this.checkCollisions();
};

//collision - Source: https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
Enemy.prototype.checkCollisions = function() {
  if (this.x < player.x + 70 &&
  this.x + 70 > player.x &&
  this.y < player.y + 40 &&
  40 + this.y > player.y) {
    player.reset();
    Gem.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player clss
class Player {
  constructor(x, y){
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.score = 'You won ' + winsConter + ' time(s) and collected ' + gemsCounter + ' Gem(s)';
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '20px serf';
    ctx.fillText(this.score, 10, 570);
  }
  update(){
    this.score = 'You won ' + winsConter + ' time(s) and collected ' + gemsCounter + ' Gem(s)';
    let char = Math.floor(Math.random() * characters.length);

    //Checks if the player has reached the water area (the winning area)
    //if the player wins the player's character will be changed
    if(player.y < 0) {
      winsConter++;
      player.reset();
      this.sprite = characters[char];
      Gem.reset();
    }
  }
  reset(){
    this.x = 200;
    this.y = 320;
  }
  handleInput(pressedKey){
    if(pressedKey === 'left' && this.x > 0){
      this.x -= 100;
    } else if(pressedKey === 'right' && this.x < 400){
      this.x += 100;
    } else if(pressedKey === 'up' && this.y > 20){
      this.y -= 90;
    } else if(pressedKey === 'down' && this.y < 400){
      this.y += 90;
    }
  }
};

class Gem {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.gem = 'images/Gem Blue.png';
    this.status = 1;
  }
  render(){
    ctx.drawImage(Resources.get(this.gem), this.x, this.y, 70, 100);
  }
  //Check if the player has collide the gem to collect it
  checkCollisions(){
    //Collision - Source: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
    if (this.x > player.x &&
      this.x < player.x + 80 &&
      this.y > player.y &&
      this.y < player.y + 80){
        this.status = 0;
        //Removing the gem
        allGems = allGems.filter(function(e) {return e.status != 0});
        gemsCounter++;
      }
  }
  static reset(){
    allGems = [];
    for (var i = 0; i < 3; i++) {
      gemXaxis = columns[Math.floor(Math.random() * 5)];
      gemYaxis = rows[Math.floor(Math.random() * 3)];
      allGems.push(new Gem(gemXaxis, gemYaxis));
    }
  }
}
// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(-7, 60, 200), new Enemy(-3, 145, 210), new Enemy(-5, 228, 180)];
let player = new Player(200, 320);
let allGems = [new Gem(115, 108), new Gem(215, 274), new Gem(418, 190)];
let columns = [ 15, 115, 215, 315, 415];
let rows = [ 110, 190, 270];
let gemXaxis, gemYaxis;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
