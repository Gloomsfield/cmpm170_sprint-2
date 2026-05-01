export class CursorOverlay extends Phaser.Scene {

    constructor() {
        super('cursorOverlayScene');
    }

    create() {
        this.input.setDefaultCursor('url(assets/UI/skeleton_hand_cursor.png), pointer');
    }

}
