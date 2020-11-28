class Game{
    constructor(){

    }
    getState(){
        var gamestateref = database.ref("gameState")
        gamestateref.on("value",function(data){
            gameState=data.val()
        })
    }
    update(state){
        database.ref("/").update({
            gameState:state
        })
    }
    async startGame(){
        if(gameState===0){
            player = new Player()
            var playercountref= await database.ref("playerCount").once("value")
            if(playercountref.exists()){
                playerCount=playercountref.val()
                player.getCount()
            }

            
            form = new Form()
            form.display()
        }
    
    }
    play(){
        form.hide();
        textSize(30);
        text("Game Start", 120, 100)
        Player.getplayerinfo();
    
        if(allPlayers !== undefined){
          var display_position = 130;
          for(var plr in allPlayers){
            if (plr === "player" + player.index)
              fill("red")
            else
              fill("black");
    
            display_position+=20;
            textSize(15);
            text(allPlayers[plr].playername + ": " + allPlayers[plr].distance, 120,display_position)
          }
        }
    
        if(keyIsDown(UP_ARROW) && player.index !== null){
          player.distance +=50
          player.update();
        }
      }
}