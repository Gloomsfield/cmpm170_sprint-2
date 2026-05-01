import { canvasPos } from '@src/globals.js';

// http://127.0.0.1:5500/?mode=introScene
// https://gloomsfield.github.io/cmpm170_sprint-2/?mode=introScene

export class IntroCutscene extends Phaser.Scene {

    constructor() {
        super('introScene');
    }

    create() {
        const bg = this.add.image(...canvasPos(0.5), '__WHITE');
        bg.setDisplaySize(...canvasPos(1.0));
        this.gradient = bg.postFX.addGradient(0x55_AA_00, 0x00_AA_FF, 0);
        this.gradient.fromY = 0.125;
        this.gradient.toY = 0.2;
        this.gradient.size = 32;

		const map = this.add.tilemap('intro');
		const tileset = map.addTilesetImage('toadzilla_dungeon', 'dungeon_tileset_lush');
		this.tilemap = map.createLayer('cutscene-tiles', tileset);

        this.baby = this.add.sprite(300, 250, 'baby_texture');
        this.baby.play('baby-idle');
        this.puppet = this.add.sprite(500, 266, 'puppet_texture');

        this.tweens.add({
            targets: [this.tilemap, this.baby, this.puppet],
            x: "-=200",
            y: "-=100",
            ease: 'sine.inout',
            duration: 3000,
            onComplete: this.showBaby,
            callbackScope: this
        });
    }

    showBaby() {
        this.time.delayedCall(2000, this.panToPuppet, null, this);
    }

    panToPuppet() {
        this.tweens.add({
            targets: [this.tilemap, this.puppet],
            x: "-=150",
            duration: 3000,
            onComplete: this.puppetRetreats,
            callbackScope: this
        });

        this.tweens.add({
            targets: this.baby,
            x: "-=10",
            y: "+=7",
            duration: 3000
        });

        this.baby.play('baby-walk-right');
    }

    puppetRetreats() {
        this.tweens.add({
            targets: this.puppet,
            x: "+=32",
            duration: 1000,
            onComplete: this.intoDungeon,
            callbackScope: this
        });

        this.baby.play('baby-idle');
    }

    intoDungeon() {
        this.tweens.add({
            targets: this.puppet,
            alpha: 0,
            duration: 1000,
            ease: 'sine.inout'
        });

        this.tweens.add({
            targets: this.baby,
            x: "+=94",
            y: "+=7",
            duration: 3000,
            onComplete: this.startDungeon,
            callbackScope: this
        });

        this.baby.play('baby-walk-right');
    }

    startDungeon() {
        this.scene.start('dungeonLevelScene');
    }

}
