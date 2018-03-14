var response = 0;



function printQ(x) {
  document.getElementById("questionArea").innerHTML = x;
}

function displayNumberButtons() {
  output = 
  output = "";
  for (let i = 0; i <= 9; i++) { 
    output += "<button onclick='numButton(" + i + ")'>" + i + "</button>";
  }
  output += "<button onclick='submitAttack(response)'>ENTER</button>";
  document.getElementById("buttonArea").innerHTML = output;
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
] // end masterRoster array

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
          
        }
      }
    ]

]
