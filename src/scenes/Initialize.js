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
		this.load.spritesheet('dog_texture', 'doggy.png', { frameWidth: 20, frameHeight: 16 });
		this.load.image('doll_texture', 'dummy.png');
		this.load.image('fish_texture', 'dummy.png');
		this.load.image('moth_texture', 'dummy.png');
		this.load.image('puppet_texture', 'puppet.png');

		this.load.image('sawblade_texture', 'sawblade.png');
        this.load.image('circle', 'circle.png');  

		this.load.image('dungeon_tileset', 'tileset_toadzilla_dungeon.png');
		this.load.image('dungeon_tileset_lush', 'tileset_toadzilla_dungeon_lush.png');

		this.load.tilemapTiledJSON('intro', 'intro.json');
		this.load.tilemapTiledJSON('tutorial_tilemap', 'room1.json');
		this.load.tilemapTiledJSON('room2', 'room2.json');
		this.load.tilemapTiledJSON('room3', 'room3.json');
		this.load.tilemapTiledJSON('room4', 'room4.json');
		this.load.tilemapTiledJSON('room5', 'room5.json');

		this.load.audio('dog_bark_sound', 'dog_bark_sound.mp3');
<<<<<<< HEAD
		this.load.audio('saw_sound_ambient', 'audio/saw.mp3');
		this.load.audio('saw_sound_interact', 'audio/saw_interact.mp3');
=======
		this.load.audio('main_theme', 'audio/main_theme.mp3');	
>>>>>>> origin

		this.load.path = './assets/tilemaps/';
    }

    create() {
        this.scene.launch('MusicScene');
        this.scene.launch('cursorOverlayScene');

        this.createBabyAnims();
		this.createDoggyAnims();

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

		this.anims.create({
            key: 'baby-idle',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('baby_texture', { frames: [ 16, 17, 18, 19, 18, 17 ] }),
        });
	}

	createDoggyAnims() {
		this.anims.create({
			key: 'doggy-idle',
			frameRate: 2,
			repeat: -1,
			frames: this.anims.generateFrameNumbers('dog_texture', { start: 0, end: 1 }),
		});
	}

}
