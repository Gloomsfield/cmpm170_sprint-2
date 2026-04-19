import * as globals from '../globals.js';

export class MainMenu extends Phaser.Scene {

    constructor() {
        super('mainMenuScene');
    }

    create() {
        this.createTitle();

        this.createMenuButtons();
    }

    createTitle() {
        const titleStyle = {
            
        };

        this.titleText = this.add.text(...globals.canvasPos(0.5, 0.45), "Baby's First Dungeon Crawler", globals.menuTextStyle)
        this.titleText.setOrigin(0.5);
    }

    createMenuButtons() {
        this.createButton('Play', ...globals.canvasPos(0.5, 0.55), globals.buttonTextStyle, this.startPlay);
        this.createButton('Credits', ...globals.canvasPos(0.5, 0.8), globals.buttonTextStyle, this.startCredits);
    }

    startPlay() {
        console.log('TODO switch to dungeon tutorial floor');
    }

    startCredits() {
        console.log('TODO switch to credits screen');
    }

}
