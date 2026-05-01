import { buttonTextStyle, canvasPos, menuTextStyle } from '@src/globals.js';

// http://127.0.0.1:5500/?mode=winScene
// https://gloomsfield.github.io/cmpm170_sprint-2/?mode=winScene

export class WinScene extends Phaser.Scene {

    constructor() {
        super('winScene');
    }

    create() {
        const textStyle = {
            ...menuTextStyle
        };
        this.text = this.add.text(...canvasPos(0.5), 'You guided the baby\nsafely through their\nfirst dungeon crawler!\n\nYou both win!', textStyle);
        this.text.setOrigin(0.5);

        this.createButton('Back to Main Menu', ...canvasPos(0.5, 0.9), buttonTextStyle, this.exitWin);
    }

    exitWin() {
        this.scene.start('mainMenuScene');
    }

}
