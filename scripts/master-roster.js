var response = 0;
var roster = [];
var currentRoster = [];
var answer = 0;
var level = 0;
var round = 0;
var enemies = [];
var enemy =  {
    name: "Oil Slick",
    icon: "https://raw.githubusercontent.com/MethodsOfMath/math-warrior-legends-of-math/master/images/oilslick.png",
    level: 1,
    rank: 1,
    speed: 1,
    hp: 10,
    turn: 0,
    perturn: 0,
    abilities : [
      {
        name: "ooze",
        damage: function(target) {
          target.hp -= (Math.floor(Math.random()*2) + 1);
        }
      }
    ]
  };

var levels = [
  {
    name: "TEST LEVEL 1",
    enemies: ["Oil Slick"],
    rounds: [["Oil Slick"]]
  },
  {
    name: "TEST LEVEL 2",
    enemies: ["Oil Slick","Oil Slick"],
    rounds: [["Oil slick","Oil Slick"]]
  }
];

function printQ(x) {
  document.getElementById("questionArea").innerHTML = x;
}

function displayNumberButtons() { 
  let output = "";
  for (let i = 0; i <= 9; i++) { 
    output += "<button onclick='numButton(" + i + ")'>" + i + "</button>";
  }
  output += "<button onclick='submitAttack(response)'>ENTER</button>";
  document.getElementById("buttonArea").innerHTML = output;
  document.getElementById("numberDisplay").innerHTML = 0;
}

function numButton(n) {
  response = response * 10;
  response += n;
  document.getElementById("numberDisplay").innerHTML = response;
}

function submitAttack(r) {
  if (answer === r) {
    enemy.hp = answer;
    printQ("Hit!");
  } else {
    printQ("Miss!");
  }
}

function addToRoster(charName) {
  for (let i = 0; i < roster.length; i++) {
    if (roster[i].name === charName) {
      return;
    }
  }
  for (let i = 0; i < masterRoster.length; i++) {
     if (masterRoster[i].name === charName) {
      roster.push(masterRoster[i]);
       console.log("Added " + charName + " to the roster");
      return;
    }
  }
}

function displayEnemiesLvlSel(lvl) {
  for (let i = 0; i < levels[lvl].enemies.length; i++) {
    for (let j = 0; j < masterEnemies.length; j++) {
      if (levels[lvl].enemies[i] === masterEnemies[j].name) {
        let id = "enemy" + (i + 1).toString();
        let image = "<img src='" + masterEnemies[j].icon + "' height='64' width='64'>";
        document.getElementById(id).innerHTML = image;
      }
    }
  }
}
  
function levelSelect() {
  let output = "";
  for (let i = 0; i < levels.length; i++) {
    output += "<button onclick='startLevel(" + i + ")'>" + levels[i].name + "</button>";
  }
  printQ("Select Level:");
  document.getElementById("enemy1stats").innerHTML = "MATH WARRIOR V";
  document.getElementById("party1stats").innerHTML = "LEGENDS OF MATH";
  document.getElementById("party2").innerHTML = "(demo)";
  document.getElementById("buttonArea").innerHTML = output;
}
  
function startLevel(lvl) {
  let output = "";
  document.getElementById("enemy1stats").innerHTML = "Enemies";
  document.getElementById("party1stats").innerHTML = "Your Party";
  document.getElementById("party2").innerHTML = "";
  displayEnemiesLvlSel(lvl);
  for (let i = 0; i < roster.length; i++) {
    output += "<button onclick='addToCurrentRoster(" + i + ")'><img src='" + roster[i].icon;
    output += "' width='32' height='32'></button>";
    //<img src='" + roster[i].icon + "' width='32' height='32'>
    // " + roster[i].name + "
  }
  printQ("Select Characters:");
  document.getElementById("buttonArea").innerHTML = output;
  
}

function addToCurrentRoster(s) {
  if (currentRoster.length <= 4) {
    for (let i = 0; i < currentRoster.length; i++){
      if (currentRoster[i] === roster[i]) {
        return;
      }
    }
    currentRoster.push(roster[s]);
  }
  if (currentRoster.length >= 1) {
    document.getElementById("party1").innerHTML = '<img src="' + currentRoster[0].icon + '" height="64" width="64">';
  }
  if (currentRoster.length >= 2) {
    document.getElementById("party2").innerHTML = '<img src="' + currentRoster[1].icon + '" height="64" width="64">';
  }
  if (currentRoster.length >= 3) {
    document.getElementById("party3").innerHTML = '<img src="' + currentRoster[2].icon + '" height="64" width="64">';
  }
 
  if (currentRoster.length >= 4) {
    document.getElementById("party4").innerHTML = '<img src ="' + currentRoster[3].icon + '" height="64" width="64">';
  }
  document.getElementById("party4stats").innerHTML = "<button onclick='startRound(0)'>LET'S GO!</button>";
}

function updateEnemyStats(n) {
  let statid = "enemy" + (n + 1).toString() + "stats";
  let stats = "HP: " + enemies[n].hp + "<br>";
  stats += "turn: " + Math.floor(enemies[n].turn * 100) + "%";
  document.getElementById(statid).innerHTML = stats;
}

function updatePlayerStats(n) {
  let statid = "party" + (n + 1).toString() + "stats";
  let stats = "HP: " + currentRoster[n].hp + "<br>";
  stats += "turn: " + Math.floor(currentRoster[n].turn * 100) + "%";
  document.getElementById(statid).innerHTML = stats;
}

function setEnemy(n) {
  enemy = enemies[n];
  console.log(enemy);
}

function loadEnemy(r,p) {
  for (let k = 0; k < masterEnemies.length; k++) {
    if (masterEnemies[k].name === levels[level].rounds[r][p]) {
      enemies.push(masterEnemies[k]);
      let imgid = "enemy" + (p + 1).toString();
      let image = "<button onclick='setEnemy(" + p + ")'><image src='" + masterEnemies[k].icon;
      image += "' height='64' width='64'></button>";
      document.getElementById(imgid).innerHTML = image;
      return;
    }
  }
}

function totalHP(party) {
  let totalHP = 0;
  for(let i = 0; i < party.length; i++) {
    totalHP += party[i].hp;
  }
  return totalHP;
}

function playerTurn(guy, n) {
  output = "";
  for (let i = 0; i < guy.abilities.length; i++) {
    if (guy.abilities[i].active) {
      //let fun = "currentRoster[" + n + "].abilities[" + i + "].execute()";
      let image = "<img src='" + currentRoster[n].abilities[i].icon + "' height='32' width='32'>";
      output += "<button onclick='subtract()'>" + image + "</button> ";
    } 
  }
  document.getElementById('buttonArea').innerHTML = output;
  printQ("Select ability:");
}

function enemyTurn() {
  for (let i = 0; i < enemies.length; i++){
    let abNum = Math.floor(Math.random()*enemies[i].abilities.length);
    let targetNum = Math.floor(Math.random()*currentRoster.length);
    enemies[i].abilities[abNum].damage(currentRoster[targetNum]);
    updatePlayerStats(targetNum);
  }
}


function startRound(round) {
  // starts round
  // set up round
    // set up enemies
    enemies = [];
    for (let j = 0; j < levels[level].rounds[round]; j++) {
      loadEnemy(round,j);
    }
    // set up turns
    let totalspeedP = 0;
    let totalspeedE = 0;
    for (let i = 0; i < currentRoster.length; i++) {
      totalspeedP += currentRoster[i].speed;
    }
    for (let i = 0; i < enemies.length; i++) {
      totalspeedE += enemies[i].speed;
    }
     
     // begin round
    enemy = enemies[0];
    if (totalspeedE > totalspeedP) {
      enemyTurn();
    } else {
      playerTurn(currentRoster[0],0);
    }
  }
    
   
    /*
    while(totalHP(currentRoster) > 0 && totalHP(enemies) > 0) {
      for (let i = 0; i < currentRoster.length; i++){
        currentRoster[i].turn += currentRoster[i].perturn;
        updatePlayerStats(i);
        if (currentRoster[i].turn >= 1) {
          playersTurn(currentRoster[i], i);
        }
      }
      for (let i = 0; i < enemies.length; i++){
        enemies[i].turn += enemies[i].perturn;
          if (enemies[i].turn >= 1) {
            let abNum = Math.floor(Math.random()*enemies[i].abilities.length);
            let targetNum = Math.floor(Math.random()*currentRoster.length);
            enemies[i].abilities[abNum].damage(currentRoster[targetNum]);
            updatePlayerStats(targetNum);
          }
          
          updateEnemyStats(i);
      }
    }
    if (totalHP(currentRoster) <= 0) {
      printQ("You lose. ; ;");
    }
  } // end round
  if (totalHP(enemies) <= 0) {
    printQ("You win!");
  }
}
*/

var masterRoster = [
  {
    name: "Math Warrior",
    icon: "https://raw.githubusercontent.com/MethodsOfMath/math-warrior-legends-of-math/master/images/mathwarrior.png",
    level: 1,
    rank: 1,
    speed: 5,
    hp: 50,
    turn: 0,
    perturn: 0,
    abilities : [
      {
        name: "subtract",
        active: true,
        downtime: 0,
        icon: "https://raw.githubusercontent.com/MethodsOfMath/math-warrior-legends-of-math/master/images/subtract.png",
        execute() {
          let diff = Math.floor(Math.random()*(10)) + 1;
          let ques = enemy.hp.toString() + " - " + diff.toString() + " = ?";
          printQ(ques);
          displayNumberButtons();
          answer = enemy.hp - diff;
        } // end execute function
      } // end subtract object
    ] // end abilities array
  } // end Math Warrior object
]; // end masterRoster array

var masterEnemies = [
  {
    name: "Oil Slick",
    icon: "https://raw.githubusercontent.com/MethodsOfMath/math-warrior-legends-of-math/master/images/oilslick.png",
    level: 1,
    rank: 1,
    speed: 1,
    hp: 10,
    turn: 0,
    perturn: 0,
    abilities : [
      {
        name: "ooze",
        damage: function(target) {
          target.hp -= (Math.floor(Math.random()*2) + 1);
        }
      }
    ]
  } 
];

function subtract() {
          console.log("subtract function executed");
          let diff = Math.floor(Math.random()*10) + 1;
          console.log(diff);
          console.log(enemies);
          let ques = (enemy.hp).toString() + " - " + diff.toString() + " = ?";
          console.log(ques);
          printQ(ques);
          displayNumberButtons();
          answer = enemies[0].hp - diff;
}

addToRoster("Math Warrior");
    
levelSelect();
