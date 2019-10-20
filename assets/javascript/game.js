// once page has loaded, run script
$( document ).ready(function() {
    start();
});

// VARIABLES
//=========================
//array of objects - players for this game
var players = [
    {
        name:"Gene",
        img: "assets/images/gene.png",
        healthPoint:100,
        attackPower:15,
        counterAttackPower:5,
    },
    {
        name:"King Candy" ,
        img:"assets/images/kingCandy.png",
        healthPoint:120,
        attackPower:25,
        counterAttackPower:45,
    },
    {
        name:"Tafyta",
        img:"assets/images/tafyta.png",
        healthPoint:130,
        attackPower:30,
        counterAttackPower:13,
    },
    {
        name:"Venellope",
        img:"assets/images/vanellope.png",
        healthPoint:140,
        attackPower:35,
        counterAttackPower:15,
    },
];


// FUNCTIONS
//=========================
function start(){
   $.each(players, function(){
        var newDiv = $("<div></div>").addClass("charDiv rounded");
       $.each(this, function(name, value){
            if(name === "name"){
                // console.log("name = "+ value);
                $("<p></p>").text(value).addClass("charName").appendTo(newDiv);
            };

            if(name === "img"){
                // console.log("img src= "+ value);
                $("<img>").attr("src", value).addClass("charImg").appendTo(newDiv)
            };
            
            if(name === "healthPoint"){
                // console.log("hp = "+ value);
                $("<p></p>").text(value).addClass("charHP").appendTo(newDiv);
            }
            $("#players").append(newDiv);
       });
   });
}







// MAIN PROCESS
//=========================
