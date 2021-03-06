/**************************************************************************************************
Handles keyboard events for writing on the console screen.
**************************************************************************************************/
var handleKeyDown = function(e) {

	// 0
	if ((e.keyCode == 48) || (e.keyCode == 96)) {
		oGame.updateLednums(0);
		oGame.animateTux(e.keyCode);
	}
	// 1
	else if ((e.keyCode == 49) || (e.keyCode == 97)) {
		oGame.updateLednums(1);
		oGame.animateTux(e.keyCode);
	}
	// 2
	else if ((e.keyCode == 50) || (e.keyCode == 98)) {
		oGame.updateLednums(2);
		oGame.animateTux(e.keyCode);
	}
	// 3
	else if ((e.keyCode == 51) || (e.keyCode == 99)) {
		oGame.updateLednums(3);
		oGame.animateTux(e.keyCode);
	}
	// 4
	else if ((e.keyCode == 52) || (e.keyCode == 100)) {
		oGame.updateLednums(4);
		oGame.animateTux(e.keyCode);
	}
	// 5
	else if ((e.keyCode == 53) || (e.keyCode == 101)) {
		oGame.updateLednums(5);
		oGame.animateTux(e.keyCode);
	}
	// 6
	else if ((e.keyCode == 54) || (e.keyCode == 102)) {
		oGame.updateLednums(6);
		oGame.animateTux(e.keyCode);
	}
	// 7
	else if ((e.keyCode == 55) || (e.keyCode == 103)) {
		oGame.updateLednums(7);
		oGame.animateTux(e.keyCode);
	}
	// 8
	else if ((e.keyCode == 56) || (e.keyCode == 104)) {
		oGame.updateLednums(8);
		oGame.animateTux(e.keyCode);
	}
	// 9
	else if ((e.keyCode == 57) || (e.keyCode == 105)) {
		oGame.updateLednums(9);
		oGame.animateTux(e.keyCode);
	}
	// Negative sign
	else if (e.keyCode == 109) {
		oGame.updateLednums("-");
		oGame.animateTux(e.keyCode);
	}
	// Enter
	else if (e.keyCode == 13) {
		oGame.updateLednums("+");
		oGame.animateTux(e.keyCode);
	}	
}

/**************************************************************************************************
Handles the event to pause the game when the player is no longer on the application.
**************************************************************************************************/
var handleBlur = function() {
	if (oGame.isPaused == false) {
		oGame.pause();
	}
}

/**************************************************************************************************
Handles the click on the keypad console.
**************************************************************************************************/
var handleClickKeypad = function() {
	var key = this.id.charAt(6);
	oGame.updateLednums(key);
}

/**************************************************************************************************
Handles the click on the pause button.
**************************************************************************************************/
var handleClickPause = function() {
	oGame.pause();
}

/**************************************************************************************************
Handles the click on the resume button - Only available when the game is paused.
**************************************************************************************************/
var handleClickResume = function() {
	oGame.resume();
}

/**************************************************************************************************
Handles the click on the restart button - Only available when the game is finished.
**************************************************************************************************/
var handleClickRestart = function() {
	oGame.restart();
}

/**************************************************************************************************
Handles the click on the exit button. - Only available in the menu.
This allows the player to exit a menu tab (example : leave the score tab).
**************************************************************************************************/
var handleClickExitMenu = function() {
	
	document.getElementById("background").style.backgroundImage = "url(resources/title/menu_bkg.jpg)";
	document.getElementById("background").style.backgroundSize = '100% 100%';
	
	document.getElementById("menu").style.display = "table";
	document.getElementById("tabScore").style.display = "none";
	document.getElementById("tabHelp").style.display = "none";
	document.getElementById("tabOptions").style.display = "none";
	document.getElementById("exitButton").style.display = "none";
	
	helpValue.value = 1;
}

/**************************************************************************************************
Handles the click on the exit button. - Only available in the game
This allows the player to exit the game and go back to the menu.
**************************************************************************************************/
var handleClickExitGame = function() {
	oGame.stop();
	exitButton.addEventListener("click", handleClickExitMenu, false);
	exitButton.removeEventListener("click", handleClickExitGame, false);
}

/**************************************************************************************************
Launches the game
**************************************************************************************************/
var launchGame = function() {

	exitButton.removeEventListener("click", handleClickExitMenu, false);
	exitButton.addEventListener("click", handleClickExitGame, false);
	
	oGame.start();
	
	/*
	
	UNCOMMENT FOR MONITORING THE PERFORMANCE
	
	setInterval( function () {
		stats.begin();
			 Step
			step();
		stats.end();
	}, 1000 / 60 );	
	
	
	*/
	step();
}

/**************************************************************************************************
Launches the help
**************************************************************************************************/
var launchHelp = function() {

	showTab();
	
	document.getElementById("topLeftLogo").style.display = "none";
	document.getElementById("bottomLeftLogo").style.display = "none";
	document.getElementById("exitButton").style.display = "none";
	
	document.getElementById("arrow").style.display = "block";
	document.getElementById("background").style.backgroundImage = "url(resources/menu/aide-1.png)";
	document.getElementById("background").style.backgroundSize = '100% 100%';
}

/**************************************************************************************************
Shows options tab
**************************************************************************************************/
var showOptions = function() {

	showTab();
	
	document.getElementById("tabOptions").style.display = "block";
}

/**************************************************************************************************
Shows scores tab
**************************************************************************************************/
var showScores = function() {
	
	showTab();
	
	readAllScores();
	document.getElementById("tabScore").style.display = "block";
}

var showTab = function() {
	
	document.getElementById("exitButton").style.display = "block";
	document.getElementById("menu").style.display = "none";
}

/**************************************************************************************************
Updates sounds option
**************************************************************************************************/
var updateOptionsSound = function() {
	alert("Desactiver sons");
}

/**************************************************************************************************
Resets all the parameters of the game
**************************************************************************************************/
var resetGame = function() {
	alert("Reinitialiser param�tre");
}

var goToNextHelp = function() {
	
	if (helpValue.value == 1) {
		document.getElementById("background").style.backgroundImage = "url(resources/menu/aide-2.png)";
		document.getElementById("background").style.backgroundSize = '100% 100%';
		
		helpValue.value = 2;
	}
	else if (helpValue.value == 2) {
		document.getElementById("background").style.backgroundImage = "url(resources/menu/aide-3.png)";
		document.getElementById("background").style.backgroundSize = '100% 100%';
		
		helpValue.value = 3;
	}
	else if (helpValue.value == 3) {
		document.getElementById("background").style.backgroundImage = "url(resources/menu/aide-4.png)";
		document.getElementById("background").style.backgroundSize = '100% 100%';
		
		helpValue.value = 4;
	}
	else if (helpValue.value == 4) {
		handleClickExitMenu();
	}
}