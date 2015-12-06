// Generate variables
var BLOCK_SIZE_X = 101,
    BLOCK_SIZE_Y = 83,
    totalScore = 0,
    collisionCount = 0;

// Variable for setting the starting point of the player.
var playerStartX = 2* BLOCK_SIZE_X,
    playerStartY = 5 * BLOCK_SIZE_Y - 20;

// base class for players and enemies
var Thing = function(x, y) {
    this.x = x;
    this.y = y;
};
Thing.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//var Enemy = function(x, y, speed) {
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

//    Thing.call(this,x,y);
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Thing.prototype);

Enemy.prototype.hitBox = {
    'x': BLOCK_SIZE_X,
    'y': BLOCK_SIZE_Y
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    s = (Math.random() * 50 * dt);
    this.x += s;
    if (this.x > 500) this.x = 0;
//    Thing.call(this,x, y);

};

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
Enemy.prototype.constructor = Enemy;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    Thing.call(this, x, y);
    this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(Thing.prototype);

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(dir) {

    console.log(this.x);

    if (dir === 'left' && this.x >= BLOCK_SIZE_X) this.x -= BLOCK_SIZE_X;
    if (dir === 'right' && this.x < 400) this.x += BLOCK_SIZE_X;
    if (dir === 'up') {
        this.y -= 83;
        if (this.y < BLOCK_SIZE_Y - 30) {
            this.update();
        }
    }
    if (dir === 'down' && this.y < 392) this.y += 83;

};

// this function updates the player's position
Player.prototype.update = function() {
    if (this.y < BLOCK_SIZE_Y - 30) {
        this.x = playerStartX;
        this.y = playerStartY;
        console.log("update function called");
        totalScore += 1;
        console.log(totalScore);
    }

};
// this function resets the players position to the starting position
Player.prototype.reset = function() {
    totalScore = 0;
    this.x = playerStartX;
    this.y = playerStartY;
    collisionCount += 1;
    console.log("COLLISION DETECTED Game Reset");
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    y = 220 - (80 * i);
    x = 400 / (1 + i);
    allEnemies.push(new Enemy(x, y));
}

var player = new Player(playerStartX, playerStartY);

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
