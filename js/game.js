// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background-poly.png";

// THIS IS A RANDOM COMMENT BY
// AND ANOTHER COMMENT ON MASTER

// Hero image
var petReady = false;
var petImage = new Image();
petImage.onload = function () {
  petReady = true;
};
petImage.src = "images/hero copy.png";

// Monster image
var cheeseReady = false;
var cheeseImage = new Image();
cheeseImage.onload = function () {
  cheeseReady = true;
};
cheeseImage.src = "images/cheese.png";

// Game objects
var pet = {
  speed: 256, // movement in pixels per second
};
var cheese = {};
var cheesesCaught = 0;

// Handle keyboard controls
var keysDown = {};
var name = "Taryn";

addEventListener(
  "keydown",
  function (e) {
    keysDown[e.keyCode] = true;
  },
  false
);

addEventListener(
  "keyup",
  function (e) {
    delete keysDown[e.keyCode];
  },
  false
);

// Reset the game when the player catches a cheese
var reset = function () {
  pet.x = canvas.width / 2;
  pet.y = canvas.height / 2;

  // Throw the cheese somewhere on the screen randomly
  cheese.x = 32 + Math.random() * (canvas.width - 64);
  cheese.y = 32 + Math.random() * (canvas.height - 64);
};

// Update game objects
var update = function (modifier) {
  if (38 in keysDown) {
    // Player holding up
    pet.y -= pet.speed * modifier;
  }
  if (40 in keysDown) {
    // Player holding down
    pet.y += pet.speed * modifier;
  }
  if (37 in keysDown) {
    // Player holding left
    pet.x -= pet.speed * modifier;
  }
  if (39 in keysDown) {
    // Player holding right
    pet.x += pet.speed * modifier;
  }

  // Are they touching?
  if (
    pet.x <= cheese.x + 32 &&
    cheese.x <= pet.x + 32 &&
    pet.y <= cheese.y + 32 &&
    cheese.y <= pet.y + 32
  ) {
    ++cheesesCaught;
    reset();
  }
};

// Draw everything
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (petReady) {
    ctx.drawImage(petImage, pet.x, pet.y);
  }

  if (cheeseReady) {
    ctx.drawImage(cheeseImage, cheese.x, cheese.y);
  }

  // Score
  ctx.fillStyle = "rgb(50, 50, 50)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Pieces of cheese: " + cheesesCaught, 32, 32);
};

// The main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
