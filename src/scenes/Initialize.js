export class Initialize extends Phaser.Scene {
    
    constructor(queryMode) {
        super('initializeScene');
        this.queryMode = queryMode ?? 'mainMenuScene';
    }

    preload() {
        this.load.path = './assets/temp/';

		this.load.image('baby_texture', 'dummy.png');
		this.load.image('bear_texture', 'dummy.png');
		this.load.image('clown_texture', 'dummy.png');
		this.load.image('dog_texture', 'dummy.png');
		this.load.image('doll_texture', 'dummy.png');
		this.load.image('fish_texture', 'dummy.png');
		this.load.image('moth_texture', 'dummy.png');
		this.load.image('puppet_texture', 'dummy.png');

		this.load.image('sawblade_texture', 'sawblade.png');

		this.load.image('dungeon_tileset', 'tileset_toadzilla_dungeon.png');

		this.load.tilemapTiledJSON('tutorial_tilemap', 'room1.json');

		this.load.audio('dog_bark_sound', 'dog_bark_sound.mp3');

		this.load.path = './assets/tilemaps/';
    }

    create() {
        this.scene.start(this.queryMode);
    }

}
