export class Initialize extends Phaser.Scene {
    
    constructor(queryMode) {
        super('initializeScene');
        this.queryMode = queryMode ?? 'mainMenuScene';
    }

    preload() {
        this.load.path = './assets/temp/';

		this.load.spritesheet('baby_texture', 'baby.png', { frameWidth: 16 });
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
		this.load.tilemapTiledJSON('room2', 'room2.json');
		this.load.tilemapTiledJSON('room3', 'room3.json');
		this.load.tilemapTiledJSON('room4', 'room4.json');
		this.load.tilemapTiledJSON('room5', 'room5.json');

		this.load.audio('dog_bark_sound', 'dog_bark_sound.mp3');
		this.load.audio('main_theme', 'audio/main_theme.mp3');	

		this.load.path = './assets/tilemaps/';
    }

    create() {
        this.scene.launch('MusicScene');

        this.createBabyAnims();

        this.scene.start(this.queryMode);
    }

	createBabyAnims() {
		this.anims.create({
            key: 'baby-walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('baby_texture', { start: 0, end: 3 }),
        });

		this.anims.create({
            key: 'baby-walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('baby_texture', { start: 4, end: 7 }),
        });

		this.anims.create({
            key: 'baby-walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('baby_texture', { start: 8, end: 11 }),
        });

		this.anims.create({
            key: 'baby-walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('baby_texture', {
                frames: [ 12, 13, 12, 14 ]
            }),
        });
	}

}
