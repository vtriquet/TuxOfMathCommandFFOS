/**************************************************************************************************
Initialization of JavaScript Performance Monitor

FPS Frames rendered in the last second. The higher the number the better.
MS Milliseconds needed to render a frame. The lower the number the better.
**************************************************************************************************/

//var stats = new Stats();
//stats.setMode(1); // 0: fps, 1: ms

// Align top-left
//stats.domElement.style.position = 'absolute';
//stats.domElement.style.left = '0px';
//stats.domElement.style.top = '0px';

//document.body.appendChild(stats.domElement);

/*************************************************************************************************
Setup requestAnimationFrame

Uses to perform an animation.
**************************************************************************************************/

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
							
/**************************************************************************************************
Initialization of canvas
**************************************************************************************************/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set the size of the canvas relative to the width and height of the window of the client
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

/**************************************************************************************************
Global variables
**************************************************************************************************/

// Largeur de base du canvas
var fLargeurDeBase = 1360;

// Hauteur de base du canvas
var fHauteurDeBase = 620;

var fRatioLargeur = (document.documentElement.clientWidth) / fLargeurDeBase;
var fRatioHauteur = (document.documentElement.clientHeight) / fHauteurDeBase;

// Game object
var oGame = new Game();

// Array to store comets object (not yellow and red)
var aListComete = [];

// Comet object for the yellow comet
var oYellowComet = 0;

// Comet object for the red comet
var oRedComet = 0;

// Array of X position of the columns where comets appear
var aListColonneX = [];

/**************************************************************************************************
Timer and timestamps
**************************************************************************************************/

// Timer that handles the appearance of comets
var oTimer = new Timer();

// Timer that handles the appearance of the yellow comets
var oTimerBonusYellowComets = new Timer();

// Timer that handles the appearance of red comets
var oTimerBonusRedComets = new Timer();

// Timestamp that handles the movement of comets
var currentTimestamp = Date.now();
var previousTimestamp = 0;
var elapsedTime = 0;

// Timestamp that handles the movement of the yellow comets
var currentTimestampYellow = Date.now();
var previousTimestampYellow = 0;
var elapsedTimeYellow = 0;

// Timestamp that handles the movement of the red comets
var currentTimestampRed = Date.now();
var previousTimestampRed = 0;
var elapsedTimeRed = 0;

/**************************************************************************************************
Initialization of the menu
**************************************************************************************************/

// Music
var musicMenu = new Audio("resources/sounds/tuxi.ogg");
musicMenu.loop = true;
musicMenu.volume = 0.5;
musicMenu.load();
musicMenu.play();

// Get menu item
var itemPlay = document.getElementById("play");
var itemHelp = document.getElementById("help");
var itemOptions = document.getElementById("options");
var itemScores = document.getElementById("scores");

var eltItemOptionsSound = document.getElementById("itemOptionsSound");
var eltItemOptionsReset = document.getElementById("itemOptionsReset");
var eltArrow = document.getElementById("arrow");
var eltHelpValue = document.getElementById("helpValue");

// Set up event listener for menu item
itemPlay.addEventListener("click", launchGame, false);
itemHelp.addEventListener("click", launchHelp, false);
itemOptions.addEventListener("click", showOptions, false);
itemScores.addEventListener("click", showScores, false);

eltItemOptionsSound.addEventListener("click", updateOptionsSound, false);
eltItemOptionsReset.addEventListener("click", resetGame, false);

eltArrow.addEventListener("click", goToNextHelp, false);

/**************************************************************************************************
Initialization of the game
**************************************************************************************************/

var musicGame = new Audio("resources/sounds/03_gravity.ogg");
musicGame.loop = true;
musicGame.volume = 0.5;
musicGame.load();

var soundLaser = new Audio("resources/sounds/laser.wav");
soundLaser.volume = 0.7;
soundLaser.load();

var soundSizzling = new Audio("resources/sounds/sizzling.wav");
soundSizzling.volume = 0.7;
soundSizzling.load();

var soundBuzz = new Audio("resources/sounds/buzz.ogg");
soundBuzz.volume = 0.7;
soundBuzz.load();

var soundExplosion = new Audio("resources/sounds/explosion.wav");
soundExplosion.volume = 0.7;
soundExplosion.load();

// Get buttons
var pauseButton = document.getElementById("pauseButton");
var exitButton = document.getElementById("exitButton");
var resumeButton = document.getElementById("resumeButton");
var leaveButton = document.getElementById("leaveButton");

// Get keypad item
var keypad0 = document.getElementById("keypad0");
var keypad1 = document.getElementById("keypad1");
var keypad2 = document.getElementById("keypad2");
var keypad3 = document.getElementById("keypad3");
var keypad4 = document.getElementById("keypad4");
var keypad5 = document.getElementById("keypad5");
var keypad6 = document.getElementById("keypad6");
var keypad7 = document.getElementById("keypad7");
var keypad8 = document.getElementById("keypad8");
var keypad9 = document.getElementById("keypad9");
var keypadneg = document.getElementById("keypad-");
var keypadenter = document.getElementById("keypad+");

// Set up event listener for buttons
exitButton.addEventListener("click", handleClickExitMenu, false);
pauseButton.addEventListener("click", handleClickPause, false);
resumeButton.addEventListener("click", handleClickResume, false);
leaveButton.addEventListener("click", handleClickExitGame, false);
leaveButtonOver.addEventListener("click", handleClickExitGame, false);
restartButton.addEventListener("click", handleClickRestart, false);

// Set up event listener for keypad item
keypad0.addEventListener("click", handleClickKeypad, false);
keypad1.addEventListener("click", handleClickKeypad, false);
keypad2.addEventListener("click", handleClickKeypad, false);
keypad3.addEventListener("click", handleClickKeypad, false);
keypad4.addEventListener("click", handleClickKeypad, false);
keypad5.addEventListener("click", handleClickKeypad, false);
keypad6.addEventListener("click", handleClickKeypad, false);
keypad7.addEventListener("click", handleClickKeypad, false);
keypad8.addEventListener("click", handleClickKeypad, false);
keypad9.addEventListener("click", handleClickKeypad, false);
keypadneg.addEventListener("click", handleClickKeypad, false);
keypadenter.addEventListener("click", handleClickKeypad, false);

// Get lednums item
var lednum0 = document.getElementById("lednum2");
var lednum1 = document.getElementById("lednum1");
var lednum2 = document.getElementById("lednum0");
var lednumneg = document.getElementById("lednumneg");
var lednumActive = lednum0;
var negativeSign = false;

var eltTux = document.getElementById("tuxChar");


/**************************************************************************************************
Initialisation des images utilis�es dans le jeu
**************************************************************************************************/

// Igloos
var imgIglooIntact = new Image();
imgIglooIntact.src = "resources/igloos/intact.png";
var imgIglooHalf = new Image();
imgIglooHalf.src = "resources/igloos/half.png";
var imgIglooMelted = new Image();
imgIglooMelted.src = "resources/igloos/melted1.png";

// Comets
var imgCometeZero = new Image();
imgCometeZero.src = "resources/comets/comet0.png";
var imgCometeOne = new Image();
imgCometeOne.src = "resources/comets/comet1.png";
var imgCometeTwo = new Image();
imgCometeTwo.src = "resources/comets/comet2.png";

// Yellow comets
var imgYellowCometZero = new Image();
imgYellowCometZero.src = "resources/comets/right_powerup_comet0.png";
var imgYellowCometOne = new Image();
imgYellowCometOne.src = "resources/comets/right_powerup_comet1.png";
var imgYellowCometTwo = new Image();
imgYellowCometTwo.src = "resources/comets/right_powerup_comet2.png";

// Red comets
var imgRedCometZero = new Image();
imgRedCometZero.src = "resources/comets/bonus_comet0.png";
var imgRedCometOne = new Image();
imgRedCometOne.src = "resources/comets/bonus_comet1.png";
var imgRedCometTwo = new Image();
imgRedCometTwo.src = "resources/comets/bonus_comet2.png";

var oCometeNumsAdd = new Image();
oCometeNumsAdd.src = "resources/status/nums/add.png";
var oCometeNumsSub = new Image();
oCometeNumsSub.src = "resources/status/nums/sub.png";
var oCometeNumsDiv = new Image();
oCometeNumsDiv.src = "resources/status/nums/div.png";
var oCometeNumsMul = new Image();
oCometeNumsMul.src = "resources/status/nums/mul.png";
var oCometeNumsEqual = new Image();
oCometeNumsEqual.src = "resources/status/nums/equal.png";
var oCometeNumsInt = new Image();
oCometeNumsInt.src = "resources/status/nums/int.png";
var oCometeNums0 = new Image();
oCometeNums0.src = "resources/status/nums/0.png";
var oCometeNums1 = new Image();
oCometeNums1.src = "resources/status/nums/1.png";
var oCometeNums2 = new Image();
oCometeNums2.src = "resources/status/nums/2.png";
var oCometeNums3 = new Image();
oCometeNums3.src = "resources/status/nums/3.png";
var oCometeNums4 = new Image();
oCometeNums4.src = "resources/status/nums/4.png";
var oCometeNums5 = new Image();
oCometeNums5.src = "resources/status/nums/5.png";
var oCometeNums6 = new Image();
oCometeNums6.src = "resources/status/nums/6.png";
var oCometeNums7 = new Image();
oCometeNums7.src = "resources/status/nums/7.png";
var oCometeNums8 = new Image();
oCometeNums8.src = "resources/status/nums/8.png";
var oCometeNums9 = new Image();
oCometeNums9.src = "resources/status/nums/9.png";

/**************************************************************************************************
Step
**************************************************************************************************/

var step = function () {
	
	if ((oGame.isPaused == false) && (oGame.active == true)) {
		// Resetting the display
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		oGame.drawComete();
		oGame.drawYellowComets();
		oGame.drawRedComets();
		
		requestAnimationFrame(step);
	}
	else {
		requestAnimationFrame(step);
	}
}
