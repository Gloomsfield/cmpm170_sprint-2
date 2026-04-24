'use strict';

const buttonDefaults = {
    buttonColor: '#999999',
    buttonColorOver: '#cccccc',
}

// Inspired by "Extension functions" from Kotlin; this file adds functions to object prototypes without modifying the prototype's original js code
Phaser.Scene.prototype.createButton = function createButton(text, posX, posY, style, onDown) {
    const buttonTextObj = this.add.text(posX, posY, text, style);

    buttonTextObj.setOrigin(0.5);
    buttonTextObj.setStroke('#FFF', 4);
    buttonTextObj.setInteractive();
    buttonTextObj.setBackgroundColor(buttonDefaults.buttonColor);

    buttonTextObj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        buttonTextObj.setBackgroundColor(buttonDefaults.buttonColorOver);
    });

    buttonTextObj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        buttonTextObj.setBackgroundColor(buttonDefaults.buttonColor);
    });

    buttonTextObj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, onDown, this);

    return buttonTextObj;
};

// Thank you Nathan https://github.com/nathanaltice/Mappy/blob/7714624b30aa1a21b257e6f1508d1b5b8b140ba5/src/Scenes/TiledPlatform.js#L40-L46
Phaser.Scene.prototype.addLayerDebugGraphics = function addLayerDebugGraphics(tiledLayer, tileStyleConfig) {
    // define a render debug so we can see the tilemap's collision bounds
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    tiledLayer.renderDebug(debugGraphics, {
        // color of non-colliding tiles
        tileColor: null,
        // color of colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        // color of colliding face edges
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
        // See Phaser.Types.Tilemaps.StyleConfig
        ...tileStyleConfig
    });
};
