export class Initialize extends Phaser.Scene {
    
    constructor(queryMode) {
        super('initializeScene');
        this.queryMode = queryMode ?? 'mainMenuScene';
    }

    preload() {
        this.load.path = './assets/';
        
		this.load.path = './assets/tilemaps/';
    }

    create() {
        this.scene.start(this.queryMode);
    }

}
