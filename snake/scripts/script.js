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
  document.getElementById("leftPanel").style.backgroundColor = color;
  document.getElementById("rightPanel").style.backgroundColor = color;
  document.getElementById("game").style.backgroundColor = color;
  document.getElementById("banner").style.color = color;
  var bannerLinks = document.querySelectorAll('#banner a');
  for (var i = 0; i < bannerLinks.length; i++) {
    bannerLinks[i].style.color = color;
  }
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

//===================================================================================================================================================================================================== GAME VARIABLES

var canvas = document.getElementById("level"), context = canvas.getContext("2d");
var src = ['headu.png', 'headd.png', 'headl.png', 'headr.png', 'headopenu.png', 'headopend.png', 'headopenl.png', 'headopenr.png', 'bodyu.png', 'bodyd.png', 'bodyl.png', 'bodyr.png', 'bodyfullu.png', 'bodyfulld.png', 'bodyfulll.png', 'bodyfullr.png', 'turn2.png', 'turn1.png', 'turn1.png', 'turn0.png', 'turn3.png', 'turn0.png', 'turn2.png', 'turn3.png', 'turnfull2.png', 'turnfull1.png', 'turnfull1.png', 'turnfull0.png', 'turnfull3.png', 'turnfull0.png', 'turnfull2.png', 'turnfull3.png', 'tailu.png', 'taild.png', 'taill.png', 'tailr.png', 'nibble.png', 'food0.png', 'food1.png', 'food2.png', 'food3.png', 'food4.png', 'food5.png', 'maze0.png', 'maze1.png', 'maze2.png', 'maze3.png', 'maze4.png', 'maze5.png', 'maze6.png', 'maze7.png'], img = [], imgCount = 0;
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
    score = (-1) * score / 3 + 1337;
    score = score + gameLevel + 1;
    document.getElementById("score").innerHTML = String("0000" + score).slice(-4);
    score = (-3) * score + 4011;
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
      score = (-1) * score / 3 + 1337;
      score = score + 5 * (gameLevel + 10) - 2 * (20 - timer);
      document.getElementById("score").innerHTML = String("0000" + score).slice(-4);
      score = (-3) * score + 4011;
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
    score = (-1) * score / 3 + 1337;
    document.getElementById("gameOverScore").innerHTML = String("0000" + score).slice(-4);
    score = (-3) * score + 4011;
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
  score = 4011;
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
    document.getElementById("buttonPause").innerHTML = "continue";
  } else {
    pause = 0;
    document.getElementById("gamePause").style.display = "none";
    document.getElementById("gameGo").style.display = "block";
    document.getElementById("buttonPause").innerHTML = "pause";
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

//===================================================================================================================================================================================================== MORE

document.getElementById("buttonInfo").onclick = function() {
  var left = (window.screen.width - 800) / 2;
  var top = (window.screen.height - 500) / 2;
  var newWindow = window.open("info.html", "Snake_II_Game_Info", "width=800,height=500,left=" + left + ",top=" + top + "menubar=0,location=1,resizable=1,scrollbars=1,status=0");
  newWindow.focus();
}

//===================================================================================================================================================================================================== KEYBOARD

function handleKey(e) {
  var keyCode = e.keyCode;
  switch (keyCode) {





    // Rudolph updates
    case 36:
      if (dir === 0) {
        steer = 2;
      } else if (dir === 2) {
        steer = 0;
      } else if (dir === 3) {
        steer = 0;
      } else if (dir === 1) {
        steer = 2;
      }
      return false;
      break;

    case 33:
      if (dir === 0) {
        steer = 3;
      } else if (dir === 3) {
        steer = 0;
      } else if (dir === 2) {
        steer = 0;
      } else if (dir === 1) {
        steer = 3;
      }
      return false;
      break;

    case 35:
      if (dir === 2) {
        steer = 1;
      } else if (dir === 1) {
        steer = 2;
      } else if (dir === 3) {
        steer = 1;
      } else if (dir === 0) {
        steer = 2;
      }
      return false;
      break;

    case 34:
      if (dir === 3) {
        steer = 1;
      } else if (dir === 1) {
        steer = 3;
      } else if (dir === 2) {
        steer = 1;
      } else if (dir === 0) {
        steer = 3;
      }
      return false;
      break;


















    case 38:
      if (dir === 2 || dir === 3) {
        steer = 0;
      }
      return false;
      break;

    case 87:
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

    case 83:
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

    case 65:
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

    case 68:
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

//===================================================================================================================================================================================================== IMAGES

function count() {
  imgCount++;
  if (imgCount === 51) {
    document.getElementById("leftPanel").style.visibility = "visible";
    document.getElementById("rightPanel").style.visibility = "visible";
    document.getElementById("game").style.backgroundImage = "url('images/logo.png')";
  }
}

for (i = 0; i < 51; i++) {
  img[i] = new Image();
  img[i].onload = count;
  img[i].src = "images/" + src[i];
}

//=====================================================================================================================================================================================================

var hide = function (string) {

  function RotateLeft(lValue, iShiftBits) {
    return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
  }

  function AddUnsigned(lX,lY) {
    var lX4,lY4,lX8,lY8,lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  }

  function F(x,y,z) { return (x & y) | ((~x) & z); }
  function G(x,y,z) { return (x & z) | (y & (~z)); }
  function H(x,y,z) { return (x ^ y ^ z); }
  function I(x,y,z) { return (y ^ (x | (~z))); }

  function FF(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };

  function GG(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };

  function HH(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };

  function II(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };

  function ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1=lMessageLength + 8;
    var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
    var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
    var lWordArray=Array(lNumberOfWords-1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while ( lByteCount < lMessageLength ) {
      lWordCount = (lByteCount-(lByteCount % 4))/4;
      lBytePosition = (lByteCount % 4)*8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount-(lByteCount % 4))/4;
    lBytePosition = (lByteCount % 4)*8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
    lWordArray[lNumberOfWords-2] = lMessageLength<<3;
    lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
    return lWordArray;
  };

  function WordToHex(lValue) {
    var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
    for (lCount = 0;lCount<=3;lCount++) {
      lByte = (lValue>>>(lCount*8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
    }
    return WordToHexValue;
  };

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }

    return utftext;
  };

  var x=Array();
  var k,AA,BB,CC,DD,a,b,c,d;
  var S11=7, S12=12, S13=17, S14=22;
  var S21=5, S22=9 , S23=14, S24=20;
  var S31=4, S32=11, S33=16, S34=23;
  var S41=6, S42=10, S43=15, S44=21;

  string = Utf8Encode(string);

  x = ConvertToWordArray(string);

  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

  for (k=0;k<x.length;k+=16) {
    AA=a; BB=b; CC=c; DD=d;
    a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
    d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
    c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
    b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
    a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
    d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
    c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
    b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
    a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
    d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
    c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
    b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
    a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
    d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
    c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
    b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
    a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
    d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
    c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
    b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
    a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
    d=GG(d,a,b,c,x[k+10],S22,0x2441453);
    c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
    b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
    a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
    d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
    c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
    b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
    a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
    d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
    c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
    b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
    a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
    d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
    c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
    b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
    a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
    d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
    c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
    b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
    a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
    d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
    c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
    b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
    a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
    d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
    c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
    b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
    a=II(a,b,c,d,x[k+0], S41,0xF4292244);
    d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
    c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
    b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
    a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
    d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
    c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
    b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
    a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
    d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
    c=II(c,d,a,b,x[k+6], S43,0xA3014314);
    b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
    a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
    d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
    c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
    b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
    a=AddUnsigned(a,AA);
    b=AddUnsigned(b,BB);
    c=AddUnsigned(c,CC);
    d=AddUnsigned(d,DD);
  }

  var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

  return temp.toLowerCase();
}

//=====================================================================================================================================================================================================

document.getElementById("buttonHide").onclick = function() {
  document.getElementById("ads").style.display="none";
}
