export class Initialize extends Phaser.Scene {
    
    constructor(queryMode) {
        super('initializeScene');
        this.queryMode = queryMode ?? 'mainMenuScene';
    }

    preload() {
		this.load.path = './assets/baby/';

		this.load.image('baby_spritesheet', 'baby.webp', {
			frameWidth: 16, frameHeight: 16
		});

		this.anims.create({
			key: 'baby_walk-forward_anim',
			frames: this.anims.generateFrameNumbers('baby_spritesheet', {
				start: 0, end: 3,
			}),
			duration: 500,
			repeat: -1,
		});

		this.anims.create({
			key: 'baby_walk-left_anim',
			frames: this.anims.generateFrameNumbers('baby_spritesheet', {
				start: 4, end: 7,
			}),
			duration: 500,
			repeat: -1,
		});

		this.anims.create({
			key: 'baby_walk-right_anim',
			frames: this.anims.generateFrameNumbers('baby_spritesheet', {
				start: 4, end: 7,
			}),
			duration: 500,
			repeat: -1,
		});

		this.anims.create({
			key: 'baby_walk-backward_anim',
			frames: this.anims.generateFrameNumbers('baby_spritesheet', {
				frames: [ 8, 9, 8, 10, ],
			}),
			duration: 500,
			repeat: -1,
		});

        this.load.path = './assets/temp/';

		this.load.image('bear_texture', 'dummy.png');
		this.load.image('clown_texture', 'dummy.png');
		this.load.image('dog_texture', 'dummy.png');
		this.load.image('doll_texture', 'dummy.png');
		this.load.image('fish_texture', 'dummy.png');
		this.load.image('moth_texture', 'dummy.png');
		this.load.image('puppet_texture', 'dummy.png');

		this.load.audio('dog_bark_sound', 'dog_bark_sound.mp3');

		this.load.image('sawblade_texture', 'sawblade.png');

		this.load.image('dungeon_tileset', 'tileset_toadzilla_dungeon.png');

		this.load.tilemapTiledJSON('tutorial_tilemap', 'room1.json');
		this.load.tilemapTiledJSON('amory_tilemap', 'amory-debug.json');

		this.load.path = './assets/tilemaps/';
    }

    create() {
        this.scene.start(this.queryMode);
    }

}
