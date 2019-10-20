// once page has loaded, run script
$( document ).ready(function() {
    start();
});

// VARIABLES
//=========================
//array of objects - players for this game
var players = [
    {
        id: "gene",
        name:"Gene",
        img: "assets/images/gene.png",
        healthPoint:100,
        attackPower:15,
        counterAttackPower:5,
        role: "",
    },
    {
        id:"king-candy",
        name:"King Candy" ,
        img:"assets/images/kingCandy.png",
        healthPoint:120,
        attackPower:25,
        counterAttackPower:45,
        role: "",
    },
    {   
        id:"tafyta",
        name:"Tafyta",
        img:"assets/images/tafyta.png",
        healthPoint:130,
        attackPower:30,
        counterAttackPower:13,
        role: "",
    },
    {
        id:"venellope",
        name:"Venellope",
        img:"assets/images/vanellope.png",
        healthPoint:140,
        attackPower:35,
        counterAttackPower:15,
        role: "",
    },
];

var myCharacter = false;
var opponent = false;
var defeatedEnemies =[];
var chars=[];

// FUNCTIONS
//=========================
function fighter(player){
    this.name = player.name;
    this.hp = player.healthPoint;
    this.baseAttackPower = player.attackPower;
    this.counterAttackPo = player.counterAttackPower;
    this.currentAttackPower = this.baseAttackPower;
    this.role = player.role;
    this.idTag = player.id;
    this.imgSrc = player.img;


    //method for fighter to take damage
    this.takeDamage = function(num){
        this.hp -= num;
        $(this.name + "_charHP").text (this.hp);
    };

    //method to increase attack
    this.increaseAttack = function(){
        this.currentAttackPower += this.baseAttackPower;
    };

    //method to make fighter player
    this.becomePlayer = function(){
        this.role = 'player';
    };

    //method to make fighter enemy
    this.makeEnemy = function(){
        this.role = 'enemy';
    };

    //attack 
    this.attack = function(character){
        var stats = $("#battle-stats");
        stats.append(this.name, "attacks", character.name, "for", this.currentAttackPower, "damage. </br>");

        if(this.role === "player"){
            character.takeDamage(this.currentAttackPower);
            this.increaseAttack;
            character.attack(this);
        }
        else if(this.role === "enemy"){
            character.takeDamage(this.counterAttackPower);
        }
    };

    //is dead
    this.isDead = function(){
        if(this.hp <= 0){
            return true;
        }
        else{ return false;}
    };
};

function win(){
    var stats = $("#battle-stats").append("You Win!");
    var newButton = $("button");
    newButton.attr("id", "reset-btn").addClass("btn btn-outline-info").text("Replay");
    stats.append(newButton);
    $("#reset-btn").on("click", function(){
        start();
    });
}

function lose (){
    var stats = $("#battle-stats").append("You Lose!  Rematch?");
    var newButton = $("button");
    newButton.attr("id", "reset-btn").addClass("btn btn-outline-info").text("Replay");
    stats.append(newButton);
    $("#reset-btn").on("click", function(){
        start();
    });
}



function start(){
    //clears all fields


    //iterates over each object in array players
    //defines them as a fighter object
    //shows each on the DOM
   $.each(players, function(i){
       //create a fighter object of each player, adds to array chars
        chars[i] = new fighter(players[i]);
        
       //creates a new div for each character object
        var newDiv = $("<div></div>").attr("char-index", i).attr("id", players[i].id).addClass("charDiv rounded");
        
        //create p tage for character name, add to newDiv
        $("<p></p>").text(players[i].name).addClass("charName").appendTo(newDiv);

        //create img tag for character img, add to newDiv
        $("<img>").attr("src", players[i].img).addClass("charImg").appendTo(newDiv);

        //create p tage for character healthpoint, add to newDiv
        $("<p></p>").text(players[i].healthPoint).attr("id", players[i].name + "_charHP").addClass("charHP").appendTo(newDiv);

        //add character div to DOM in #players div
        $("#players").append(newDiv);
   });

   opponent = null;
   myCharacter = null;
   defeatedEnemies = [];

   //look for click on character, then set clicked to true
   //add class to clicked character & move character to "#my-player" div
  $(".charDiv").on("click", function(event){
        var target = $(this);
        if (chars[target.attr("char-index")].role === ""){
            myCharacter = $(this);
            myCharacter.addClass("myPlay");

            for (let index = 0; index < chars.length; index++) {
                const element = chars[index];
                var playerIndex = parseInt(myCharacter.attr("char-index"));
                if (index === playerIndex){
                    element.becomePlayer();
                }
                else{
                    element.makeEnemy();
                    var enemy = $("#" + element.idTag);
                    enemy.detach();
                    enemy.addClass("enemy");
                    enemy.appendTo("#enemies");
                }
                
            }
        }  
        else if(chars[target.attr("char-index")].role === "enemy" && !opponent){
            opponent = $(this);
            opponent.detach();
            opponent.addClass("opponent");
            opponent.appendTo("#opponent");
        }
        else if(chars[target.attr("char-index")].role === "player"){
            alert("You've clicked the chosen player. Choose and enemy to fight.");
        }
  });

  $("#attack-button").on("click", function(){
      if (opponent){
          $("#battle-stats").empty();
          var attacker = chars[myCharacter.attr("char-index")];
          var opponent = chars[opponent.attr("char-index")];
          attacker.attack(opponent);
          if (opponent.isDead()){
              opponent.detach();
              defeatedEnemies.push(opponent);

              if (defeatedEnemies.length === chars.length -1){
                  win();
                  $(this).off();
              }
              opponent =  null;
          }
          if (attacker.isDead()){
              lose();
              $(this).off();
          }
      }
  });
};







// MAIN PROCESS
//=========================
