var response = 0;
var roster = [];
var answer = 0;

var levels = [
  {
    name: "TEST LEVEL"
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
     if (masterRoster[i].name === "charName") {
      roster.push(masterRoster[i]);
      return;
    }
  }
  
function levelSelect() {
  let output = "";
  for (let i = 0; i < levels.length; i++) {
    output += "<button onclick='startLevel(" + i + ")'>" + levels[i].name + "</button>";
  }
  printQ("Select Level");
  document.getElementById("buttonArea").innerHTML = output;
}
  
startLevel(lvl) {
  let output = "";
  printQ("Select Characters:")
  for (let i = 0; i < roster.length; i++) {
    output += "<button onclick='addToCurrentRoster(" + i + ")><img src='" + roster[i].icon + "' width=32 height=32></button>" 
  }
  document.getElementById("buttonArea").innerHTML = output;
  
}

var masterRoster = [
  {
    name: "Math Warrior",
    icon: "mathwarrior.png",
    level: 1,
    rank: 1,
    speed: 5,
    hp: 50,
    abilities : [
      {
        name: "subtract",
        active: true,
        downtime: 0,
        icon: "subtract.png",
        execute: function(enemy) {
          let diff = Math.floor(Math.random()*(9 + this.level)) + this.level;
          printQ(enemy.hp + " - " + diff + " = ?");
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
    icon: "oilslick.png",
    level: 1,
    rank: 1,
    speed: 1,
    hp: 10,
    abilities : [
      {
        name: "ooze",
        damage: function() {
          target.hp -= (Math.floor(Math.random()*2)) + 1)
        }
      }
    ]
];

addToRoster("Math Warrior");
    
levelSelect();
    
