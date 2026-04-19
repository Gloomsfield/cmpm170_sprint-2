import * as globals from '@src/globals.js';

const creditsHeader = 'Produced by';
const creditsAuthors =`
Amory Acosta
Emmett Jones
Parker Lanum
Ava Malinowski
Eric Welch`;

// http://127.0.0.1:5500/?mode=creditsScene
// https://gloomsfield.github.io/cmpm170_sprint-2/?mode=creditsScene

export class Credits extends Phaser.Scene {

    constructor() {
        super('creditsScene');
    }

    create() {
        this.createTitle();

        this.createExitButton();
    }

    createTitle() {
        const textPos = globals.canvasPos(0.5, 0.35);

        const headerStyle = {
            ...globals.menuTextStyle
        };

        this.headerText = this.add.text(...textPos, creditsHeader, headerStyle)
        this.headerText.setOrigin(0.5, 1.0);

        const authorsStyle = {
            ...globals.menuTextStyle
        };

        this.authorsText = this.add.text(...textPos, creditsAuthors, authorsStyle)
        this.authorsText.setOrigin(0.5, 0.0);
    }

    createExitButton() {
        this.createButton('Back to Main Menu', ...globals.canvasPos(0.5, 0.9), globals.buttonTextStyle, this.exitCredits);
    }

    exitCredits() {
        this.scene.start('mainMenuScene');
    }

}
