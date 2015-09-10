//===================================================================================================================================================================================================== FUNCTIONS

document.getElementById("game").style.backgroundImage = "url('images/loading.gif')";

function getCookie(name) {
	var result = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
	if (result !== null && result !== "") {
		return unescape(result[2]);
	}
	return -1;
}

function setCookie(name, value) {
	document.cookie = name + "=" + value + "; expires=Sat, 01-Jan-2050 00:00:00 GMT";
}

function getRadio(name) {
	var radio = document.getElementsByName(name);
	for (i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			return radio[i].value;
		}
	}
	return -1;
}

function setRadio(name, value) {
	var radio = document.getElementsByName(name);
	for (i = 0; i < radio.length; i++) {
		if (radio[i].value === value) {
			radio[i].checked = true;
		} else {
			radio[i].checked = false;
		}
	}
}

function changeColor(color) {
	document.getElementById("topPanel").style.backgroundColor = color;
	document.getElementById("game").style.backgroundColor = color;
	document.getElementById("up").style.backgroundColor = color;
	document.getElementById("down").style.backgroundColor = color;
	document.getElementById("left").style.backgroundColor = color;
	document.getElementById("right").style.backgroundColor = color;
	document.getElementById("bottomPanel").style.backgroundColor = color;
}

if (getCookie("gameColor") !== -1) {
	changeColor(getCookie("gameColor"));
}
if (getCookie("gameType") !== -1) {
	setRadio("gameType", getCookie("gameType"));
}
if (getCookie("gameLevel") !== -1) {
	setRadio("gameLevel", getCookie("gameLevel"));
}
topScore = getCookie("topScore");
if (topScore !== -1) {
	document.getElementById("topScoreScore").innerHTML = String("0000" + topScore).slice(-4);
}

//===================================================================================================================================================================================================== GAME VARIABLES

var canvas = document.getElementById("level"), context = canvas.getContext("2d");
var src = ['headu.png', 'headd.png', 'headl.png', 'headr.png', 'headopenu.png', 'headopend.png', 'headopenl.png', 'headopenr.png', 'bodyu.png', 'bodyd.png', 'bodyl.png', 'bodyr.png', 'bodyfullu.png', 'bodyfulld.png', 'bodyfulll.png', 'bodyfullr.png', 'turn2.png', 'turn1.png', 'turn1.png', 'turn0.png', 'turn3.png', 'turn0.png', 'turn2.png', 'turn3.png', 'turnfull2.png', 'turnfull1.png', 'turnfull1.png', 'turnfull0.png', 'turnfull3.png', 'turnfull0.png', 'turnfull2.png', 'turnfull3.png', 'tailu.png', 'taild.png', 'taill.png', 'tailr.png', 'nibble.png', 'food0.png', 'food1.png', 'food2.png', 'food3.png', 'food4.png', 'food5.png', 'maze0.png', 'maze1.png', 'maze2.png', 'maze3.png', 'maze4.png', 'maze5.png', 'maze6.png', 'maze7.png', 'up.png', 'down.png', 'left.png', 'right.png'], img = [], imgCount = 0;
var gameType, gameLevel, speed = [658, 478, 378, 298, 228, 178, 138, 108, 88, 68, 48, 38, 28, 18, 8];
var score, counter, timer, pause, goTick, maze, campaign, dir, steer, x = [], y = [], s = [], len, nibx, niby, nibs, foodType, foodx, foody, full, blink, stopTick;
var sprites = [3, 11, 11, 11, 11, 11, 35], snakes = [], walls = [];

snakes[0] = [10, 9, 8, 7, 6, 5, 4];
snakes[1] = [7, 7, 7, 7, 7, 7, 7];

snakes[2] = [10, 9, 8, 7, 6, 5, 4];
snakes[3] = [7, 7, 7, 7, 7, 7, 7];

snakes[4] = [13, 12, 11, 10, 9, 8, 7];
snakes[5] = [6, 6, 6, 6, 6, 6, 6];

snakes[6] = [15, 14, 13, 12, 11, 10, 9];
snakes[7] = [3, 3, 3, 3, 3, 3, 3];

snakes[8] = [11, 10, 9, 8, 7, 6, 5];
snakes[9] = [6, 6, 6, 6, 6, 6, 6];

snakes[10] = [10, 9, 8, 7, 6, 5, 4];
snakes[11] = [6, 6, 6, 6, 6, 6, 6];

snakes[12] = [18, 17, 16, 15, 14, 13, 12];
snakes[13] = [3, 3, 3, 3, 3, 3, 3];

snakes[14] = [7, 6, 5, 4, 3, 2, 1];
snakes[15] = [5, 5, 5, 5, 5, 5, 5];

walls[0] = [];
walls[1] = [];

walls[2] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 0, 22, 0, 22, 0, 22, 0, 22, 0, 22, 0, 22, 0, 22, 0, 22, 0, 22, 0, 22, 0, 22, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
walls[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12];

walls[4] = [0, 1, 21, 22, 0, 22, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 22, 0, 1, 21, 22];
walls[5] = [0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 11, 11, 12, 12, 12, 12];

walls[6] = [8, 8, 8, 14, 15, 16, 17, 18, 19, 20, 21, 22, 8, 8, 8, 8, 14, 14, 14, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 14, 14];
walls[7] = [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 12];

walls[8] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 0, 22, 0, 6, 16, 22, 0, 6, 8, 9, 10, 11, 12, 13, 14, 16, 22, 0, 6, 16, 22, 0, 6, 16, 22, 0, 6, 8, 9, 10, 11, 12, 13, 14, 16, 22, 0, 6, 16, 22, 0, 22, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
walls[9] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12];

walls[10] = [0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 10, 10, 10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 12, 12, 12, 12, 12];
walls[11] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 10, 11, 12];

walls[12] = [11, 11, 10, 11, 12, 11, 11, 7, 11, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 7, 11, 15, 11, 11, 10, 11, 12, 11, 11];
walls[13] = [0, 1, 2, 2, 2, 3, 4, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 8, 9, 10, 10, 10, 11, 12];

walls[14] = [14, 14, 15, 16, 8, 14, 4, 8, 14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 14, 8, 8, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 8, 14, 18, 8, 14, 6, 7, 8, 8];
walls[15] = [0, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 10, 10, 11, 11, 11, 12];

//===================================================================================================================================================================================================== INIT SNAKE

function initSnake(maze) {
	x.length = 0;
	y.length = 0;
	s.length = 0;
	x = snakes[2 * maze].slice(0);
	y = snakes[2 * maze + 1].slice(0);
	s = sprites.slice(0);
	len = 6;
	dir = 3;
	steer = 3;
}

//===================================================================================================================================================================================================== SET NIBBLE

function setNibble() {
	var flag = 0;
	while (flag === 0) {
		flag = 1;
		nibx = Math.floor(Math.random() * 23);
		niby = Math.floor(Math.random() * 13);
		for (i = 0; i <= len; i++) {
			if (nibx === x[i] && niby === y[i]) {
				flag = 0;
				break;
			}
		}
		if (foodType && flag !== 0) {
			if (nibx === foodx && niby === foody || nibx === foodx + 1 && niby === foody) {
				flag = 0;
			}
		}
		if (gameType && flag !== 0) {
			for (i = 0; i < walls[2 * maze].length; i++) {
				if (nibx === walls[2 * maze][i] && niby === walls[2 * maze + 1][i]) {
					flag = 0;
					break;
				}
			}
		}
	}
}

//===================================================================================================================================================================================================== SET FOOD

function setFood() {
	var flag = 0;
	while (flag === 0) {
		flag = 1;
		foodx = Math.floor(Math.random() * 22);
		foody = Math.floor(Math.random() * 13);
		for (i = 0; i <= len; i++) {
			if (foodx === x[i] && foody === y[i] || foodx + 1 === x[i] && foody === y[i]) {
				flag = 0;
				break;
			}
		}
		if (foodx === nibx && foody === niby || foodx + 1 === nibx && foody === niby) {
			flag = 0;
		}
		if (gameType && flag !== 0) {
			for (i = 0; i < walls[2 * maze].length; i++) {
				if (foodx === walls[2 * maze][i] && foody === walls[2 * maze + 1][i] || foodx + 1 === walls[2 * maze][i] && foody === walls[2 * maze + 1][i]) {
					flag = 0;
					break;
				}
			}
		}
	}
	foodType = Math.floor(Math.random() * 6) + 1;
	document.getElementById("timerImage").style.backgroundImage = "url('" + img[36 + foodType].src + "')";
	document.getElementById("timerImage").style.display = "block";
	timer = 20;
	document.getElementById("timer").style.display = "block";
	nibs = 5 + Math.floor(Math.random() * 3);
}

//===================================================================================================================================================================================================== CRASH

function crash() {
	var a = x[0], b = y[0];
	switch (steer) {
		case 0:
			if (b === 0) {
				b = 13;
			}
			b--;
			break;
		case 1:
			if (b === 12) {
				b = -1;
			}
			b++;
			break;
		case 2:
			if (a === 0) {
				a = 23;
			}
			a--;
			break;
		case 3:
			if (a === 22) {
				a = -1;
			}
			a++;
			break;
		default:
			break;
	}
	for (i = len; i > 0; i--) {
		if (a === x[i] && b === y[i]) {
			return 1;
		}
	}
	if (gameType) {
		for (var j = 0; j < walls[2 * maze].length; j++) {
			if (a === walls[2 * maze][j] && b === walls[2 * maze + 1][j]) {
				return 1;
			}
		}
	}
	return 0;
}

//===================================================================================================================================================================================================== GO

function go() {
	if (pause === 1) {
		return;
	}
	goTick = setTimeout(go, speed[gameLevel]);
	if (crash()) {
		clearTimeout(goTick);
		blink = 1;
		stop();
		return;
	}
//=============================================== HEAD
	len = x.length - 1;
	for (i = len; i > 0; i--) {
		x[i] = x[i-1];
		y[i] = y[i-1];
		s[i] = s[i-1];
	}
	dir = steer;
	s[0] = dir;
	switch (dir) {
		case 0:
			if (y[0] === 0) {
				y[0] = 13;
			}
			y[0]--;
			if (x[0] === nibx && y[0] - 1 === niby || x[0] === foodx && y[0] - 1 === foody && foodType || x[0] === foodx + 1 && y[0] - 1 === foody && foodType) {
				s[0] += 4;
			}
			break;
		case 1:
			if (y[0] === 12) {
				y[0] = -1;
			}
			y[0]++;
			if (x[0] === nibx && y[0] + 1 === niby || x[0] === foodx && y[0] + 1 === foody && foodType || x[0] === foodx + 1 && y[0] + 1 === foody && foodType) {
				s[0] += 4;
			}
			break;
		case 2:
			if (x[0] === 0) {
				x[0] = 23;
			}
			x[0]--;
			if (x[0] - 1 === nibx && y[0] === niby || x[0] - 1 === foodx + 1 && y[0] === foody && foodType) {
				s[0] += 4;
			}
			break;
		case 3:
			if (x[0] === 22) {
				x[0] = -1;
			}
			x[0]++;
			if (x[0] + 1 === nibx && y[0] === niby || x[0] + 1 === foodx && y[0] === foody && foodType) {
				s[0] += 4;
			}
			break;
		default:
			break;
	}
//=============================================== BODY
	var turn = -1;
	if (s[1] % 4 === 3 && s[0] % 4 === 0) {
		turn = 0;
	}
	if (s[1] % 4 === 3 && s[0] % 4 === 1) {
		turn = 1;
	}
	if (s[1] % 4 === 0 && s[0] % 4 === 2) {
		turn = 2;
	}
	if (s[1] % 4 === 0 && s[0] % 4 === 3) {
		turn = 3;
	}
	if (s[1] % 4 === 2 && s[0] % 4 === 0) {
		turn = 4;
	}
	if (s[1] % 4 === 2 && s[0] % 4 === 1) {
		turn = 5;
	}
	if (s[1] % 4 === 1 && s[0] % 4 === 2) {
		turn = 6;
	}
	if (s[1] % 4 === 1 && s[0] % 4 === 3) {
		turn = 7;
	}
	if (full === 2) {
		full--;
	}
	if (turn === -1) {
		s[1] = s[1] % 4 + 8;
		if (full === 1) {
			s[1] += 4;
			full = 0;
		}
	} else {
		s[1] = turn + 16;
		if (full === 1) {
			s[1] += 8;
			full = 0;
		}
	}
	s[len] = s[len] % 4 + 32;
//=============================================== NIBBLE
	if (x[0] === nibx && y[0] === niby) {
		score = score + gameLevel + 1;
		document.getElementById("score").innerHTML = String("0000" + score).slice(-4);
		full = 2;
		x[len + 1] = 0;
		if (gameType) {
			counter--;
			if (counter === 0) {
				if (maze === 7) {
					campaign++;
					gameLevel++;
					maze = 0;
				} else {
					maze++;
				}
				counter = campaign * 10;
				initSnake(maze);
				timer = 0;
			}
			document.getElementById("counter").innerHTML = String("00" + counter).slice(-2);
		}
		setNibble();
		nibs--;
		if (nibs === 0) {
			setFood();
		}
	}
//=============================================== FOOD
	if (foodType) {
		if (timer === 0) {
			document.getElementById("timer").style.display = "none";
			document.getElementById("timerImage").style.display = "none";
			foodType = 0;
		}
		if (x[0] === foodx && y[0] === foody || x[0] === foodx + 1 && y[0] === foody) {
			score = score + 5 * (gameLevel + 10) - 2 * (20 - timer);
			document.getElementById("score").innerHTML = String("0000" + score).slice(-4);
			full = 2;
			document.getElementById("timer").style.display = "none";
			document.getElementById("timerImage").style.display = "none";
			foodType = 0;
		} else {
			document.getElementById("timer").innerHTML = String("00" + timer).slice(-2);
			timer--;
		}
	}
//=============================================== DRAW
	context.clearRect(0, 0, 188, 108);
	if (gameType) {
		context.drawImage(img[43 + maze], 0, 0);
	}
	context.drawImage(img[36], nibx * 8 + 2, niby * 8 + 2);
	if (foodType) {
		context.drawImage(img[36 + foodType], foodx * 8 + 2, foody * 8 + 2);
	}
	for (i = len; i >= 0; i--) {
		context.drawImage(img[s[i]], x[i] * 8 + 2, y[i] * 8 + 2);
	}
}

//===================================================================================================================================================================================================== STOP

function stop() {
	if (blink % 2) {
		context.clearRect(0, 0, 188, 108);
		if (gameType) {
			context.drawImage(img[43 + maze], 0, 0);
		}
		context.drawImage(img[36], nibx * 8 + 2, niby * 8 + 2);
		if (foodType) {
			context.drawImage(img[foodType + 36], foodx * 8 + 2, foody * 8 + 2);
		}
	} else {
		for (i = len; i >= 0; i--) {
			context.drawImage(img[s[i]], x[i] * 8 + 2, y[i] * 8 + 2);
		}
	}
	blink++;
	if (blink === 10) {
		document.getElementById("gameGo").style.display = "none";
		document.getElementById("gameOver").style.display = "block";
		document.getElementById("gameOverScore").innerHTML = String("0000" + score).slice(-4);
		if (score > topScore) {
			setCookie("topScore", score);
			document.getElementById("topScoreScore").innerHTML = String("0000" + score).slice(-4);
		}
		blink = 0;
	} else {
		stopTick = setTimeout(stop, 270);
	}
}

//===================================================================================================================================================================================================== NEW GAME

function newGame() {
	gameType = parseInt(getRadio("gameType"), 10);
	setCookie("gameType", gameType);
	gameLevel = parseInt(getRadio("gameLevel"), 10);
	setCookie("gameLevel", gameLevel);
	clearTimeout(goTick);
	clearTimeout(stopTick);
	score = 0;
	counter = 10;
	pause = 0;
	maze = 0;
	campaign = 1;
	nibs = 5;
	foodType = 0;
	full = 0;
	blink = 0;
	initSnake(0);
	setNibble();
	document.getElementById("buttonPause").innerHTML = "pause";
	document.getElementById("gamePause").style.display = "none";
	document.getElementById("gameOver").style.display = "none";
	document.getElementById("score").innerHTML = "0000";
	document.getElementById("counter").innerHTML = "10";
	document.getElementById("timer").innerHTML = "20";
	document.getElementById("timer").style.display = "none";
	document.getElementById("timerImage").style.display = "none";
	document.getElementById("game").style.backgroundImage = "none";
	document.getElementById("colorPicker").style.display = "none";
	document.getElementById("gameGo").style.display = "block";
	if (gameType === 1) {
		document.getElementById("counter").style.display = "block";
		document.getElementById("counterImage").style.display = "block";
	} else {
		document.getElementById("counter").style.display = "none";
		document.getElementById("counterImage").style.display = "none";
	}
	go();
}

document.getElementById("buttonNew").onclick = newGame;

//===================================================================================================================================================================================================== PAUSE

function pauseGame() {
	if (document.getElementById("gameGo").style.display !== "block" && document.getElementById("gamePause").style.display !== "block" || blink !== 0) {
		return;
	}
	if (pause === 0) {
		pause = 1;
		document.getElementById("gameGo").style.display = "none";
		document.getElementById("gamePause").style.display = "block";
	} else {
		pause = 0;
		document.getElementById("gamePause").style.display = "none";
		document.getElementById("gameGo").style.display = "block";
		go();
	}
}

document.getElementById("buttonPause").onclick = pauseGame;

//===================================================================================================================================================================================================== COLOR PICKER

document.getElementById("buttonColor").onclick = function() {
	var display = document.getElementById("colorPicker").style.display;
	if (display === "none" || display === "") {
		document.getElementById("colorPicker").style.display = "block";
	} else {
		document.getElementById("colorPicker").style.display = "none";
	}
}

//===================================================================================================================================================================================================== COLORS

var colors = ["#ffb15e", "#ffe65e", "#d3ff5e", "#69ff5e", "#5ee3ff", "#5ea6ff", "#9e5eff", "#db5eff", "#ff5e62", "#b2bd08", "#ca0", "#9a8408", "#875b34"];
for (i = 0; i <= 12; i++) {
	document.getElementById("color" + i).style.marginLeft = (i * 17) + "px";
	document.getElementById("color" + i).style.backgroundColor = colors[i];
	document.getElementById("color" + i).onclick = function() {
		index = this.id.split("r")[1];
		var color = colors[index];
		changeColor(color);
		setCookie("gameColor", color);
	}
}

//===================================================================================================================================================================================================== INFO

document.getElementById("buttonInfo").onclick = function() {
	var newWindow = window.open("info.html", "Snake_II_Game_Info", "menubar=0,location=1,resizable=1,scrollbars=1,status=0");
	newWindow.focus();
}

//===================================================================================================================================================================================================== CONTROLS

document.getElementById("up").ontouchstart = function() {
	if (dir === 2 || dir === 3) {
		steer = 0;
	}
	return false;
}

document.getElementById("down").ontouchstart = function() {
	if (dir === 2 || dir === 3) {
		steer = 1;
	}
	return false;
}

document.getElementById("left").ontouchstart = function() {
	if (dir === 0 || dir === 1) {
		steer = 2;
	}
	return false;
}

document.getElementById("right").ontouchstart = function() {
	if (dir === 0 || dir === 1) {
		steer = 3;
	}
	return false;
}

//===================================================================================================================================================================================================== IMAGES

function count() {
	imgCount++;
	if (imgCount === 55) {
		document.getElementById("topPanel").style.visibility = "visible";
		document.getElementById("ads").style.display = "block";
		document.getElementById("game").style.backgroundImage = "url('images/logo.png')";
		document.getElementById("controls").style.visibility = "visible";
		document.getElementById("bottomPanel").style.visibility = "visible";
	}
}

for (i = 0; i < 55; i++) {
	img[i] = new Image();
	img[i].onload = count;
	img[i].src = "images/" + src[i];
}

//===================================================================================================================================================================================================== KEYBOARD

function handleKey(e) {
	var keyCode = e.keyCode;
	switch (keyCode) {
		case 38:
			if (dir === 2 || dir === 3) {
				steer = 0;
			}
			return false;
			break;
		case 40:
			if (dir === 2 || dir === 3) {
				steer = 1;
			}
			return false;
			break;
		case 37:
			if (dir === 0 || dir === 1) {
				steer = 2;
			}
			return false;
			break;
		case 39:
			if (dir === 0 || dir === 1) {
				steer = 3;
			}
			return false;
			break;
		case 113:
			newGame();
			return false;
			break;
		case 27:
			pauseGame();
			return false;
			break;
		default:
			break;
	}
	return true;
}
document.onkeydown = handleKey;

//=====================================================================================================================================================================================================

document.getElementById("buttonHide").onclick = function() {
	document.getElementById("ads").style.display="none";
}

//=====================================================================================================================================================================================================
