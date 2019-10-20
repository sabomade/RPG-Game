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
    },
    {
        id:"king-candy",
        name:"King Candy" ,
        img:"assets/images/kingCandy.png",
        healthPoint:120,
        attackPower:25,
        counterAttackPower:45,
    },
    {   
        id:"tafyta",
        name:"Tafyta",
        img:"assets/images/tafyta.png",
        healthPoint:130,
        attackPower:30,
        counterAttackPower:13,
    },
    {
        id:"venellope",
        name:"Venellope",
        img:"assets/images/vanellope.png",
        healthPoint:140,
        attackPower:35,
        counterAttackPower:15,
    },
];

var myCharacter = false;
var geneWasClicked = false;
var kingWasClicked = false;
var tafWasClicked = false;
var venWasClicked = false;

// FUNCTIONS
//=========================
function start(){
    //iterates over each object in array players
   $.each(players, function(){
       //creates a new div for each character object & adds class
        var newDiv = $("<div></div>").addClass("charDiv rounded");
        
        //iterate over each key and value in the given object
       $.each(this, function(name, value){
            if(name === "id"){
                // console.log ("id = " +value);
                //if key === id: add value to div as id attribute
                newDiv.attr("id", value);
            }

            if(name === "name"){
                // console.log("name = "+ value);
                //If key === name: create new p tag of character Name, add a class, & append to div
                $("<p></p>").text(value).addClass("charName").appendTo(newDiv);
            };

            if(name === "img"){
                // console.log("img src= "+ value);
                //if key === img: create new img tag, assign src to value, add class, & append to div
                $("<img>").attr("src", value).addClass("charImg").appendTo(newDiv)
            };
            
            if(name === "healthPoint"){
                // console.log("hp = "+ value);
                //if key === hp: create new p tag of hp value, add a class, & append to div
                $("<p></p>").text(value).addClass("charHP").appendTo(newDiv);
            }
            //add all character divs to DOM in #players div
            $("#players").append(newDiv);
       });
   });

   //look for click on character, then set clicked to true
   //add class to clicked character & move character to "#my-player" div
   $("#gene").on("click", function(){
       if(!myCharacter){
       myCharacter = true;
       geneWasClicked = true;
       $(this).addClass("myPlay");
       $("#my-player").append(this);
       };
   });
   $("#king-candy").on("click", function(){
        if(!myCharacter){
        myCharacter = true;
        kingWasClicked = true;
        $(this).addClass("myPlay");
        $("#my-player").append(this);
        };
    });
    $("#tafyta").on("click", function(){
        if(!myCharacter){
        myCharacter = true;
        tafWasClicked = true;
        $(this).addClass("myPlay");
        $("#my-player").append(this);
        };
    });
    $("#venellope").on("click", function(){
        if(!myCharacter){
        myCharacter = true;
        venWasClicked = true;
        $(this).addClass("myPlay");
        $("#my-player").append(this);
        };
    });

}







// MAIN PROCESS
//=========================
