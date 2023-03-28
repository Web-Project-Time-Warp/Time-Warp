
async function refresh() {
    if(GameInfo.game.state != "Finished"){
        await getGameInfo();
        GameInfo.prepareUI();
    }
    if (GameInfo.game.player.state == "Waiting") {
        // Every time we are waiting
        await getGameInfo();
        await getPawnsPositions();
        await getArtifactsOnBoard();
        await getCollectedArtifacts();
        await getCards();
        if (GameInfo.game.player.state != "Waiting") {
            GameInfo.prepareUI();
        }
    }
}

function preload() {
    GameInfo.images.playerPawn = loadImage("./assets/WhitePawn.png");
    GameInfo.images.oppPawn = loadImage("./assets/BlackPawn.png");
}


async function setup() {
    let canvas = createCanvas(GameInfo.width, GameInfo.height);
    canvas.parent('game');
    // Preload  images

    await getGameInfo();
    await getPawnsPositions();
    await getArtifactsOnBoard();
    await getCollectedArtifacts();
    await getCards();
    setInterval(refresh, 500);

    // Buttons (create a separated function if they are many)
    GameInfo.movePawn = createButton('Move Pawn');
    GameInfo.movePawn.parent('game');
    GameInfo.movePawn.position(GameInfo.width - 260, GameInfo.height - 100);
    GameInfo.movePawn.mousePressed(movePawnAction);
    GameInfo.movePawn.addClass('game');

    GameInfo.drawCard = createButton('Draw card');
    GameInfo.drawCard.parent('game');
    GameInfo.drawCard.position(GameInfo.width - 260, GameInfo.height - 150);
    GameInfo.drawCard.mousePressed(drawCardAction);
    GameInfo.drawCard.addClass('game');

    GameInfo.dropCard = createButton('Drop Card');
    GameInfo.dropCard.parent('game');
    GameInfo.dropCard.position(GameInfo.width - 1175, GameInfo.height - 125);
    GameInfo.dropCard.mousePressed(changeDropMode);
    GameInfo.dropCard.addClass('game')

    GameInfo.surrend = createButton('Surrender');
    GameInfo.surrend.parent('game');
    GameInfo.surrend.position(GameInfo.width - 175, 25);
    GameInfo.surrend.mousePressed(surrendAction);
    GameInfo.surrend.addClass('game')

    GameInfo.prepareUI();

    GameInfo.loading = false;
}

function draw() {
    background(180,180,180);
    if (GameInfo.loading) {
        textAlign(CENTER, CENTER);
        textSize(40);
        fill('black');
        text('Loading...', GameInfo.width / 2, GameInfo.height / 2);
    } else if (GameInfo.game.state == "Finished" && GameInfo.scoreWindow) {
        GameInfo.scoreWindow.draw();
    } else {
        GameInfo.scoreBoard.draw();
        GameInfo.board.draw();
        GameInfo.playerDeck.draw();
        GameInfo.playerListArtifacts.draw();
        GameInfo.oppListArtifacts.draw();
        if (GameInfo.dropping) {
            GameInfo.dropCard.elt.textContent = "Cancel"
        } else {
            GameInfo.dropCard.elt.textContent = "Drop Card"
        }
    }
}

async function mouseClicked() {
    if (GameInfo.playerDeck) {
        GameInfo.playerDeck.click();
    }
}

function keyPressed(){
    //Draw Card Cheat
    if(keyCode === 71){
        drawCardCheat(1); //Claim Arfifact
    }else if(keyCode === 72){
        drawCardCheat(2); //Drop Arfifact
    }else if(keyCode === 74){
        drawCardCheat(3); //Time Jump
    }else if(keyCode === 75){
        drawCardCheat(4); //Time Reverse
    }else if(keyCode === 76){
        drawCardCheat(5); //Paradox
    }else if(keyCode === 186){
        drawCardCheat(6); //Time Trader
    }
}