import { Trap } from "./Trap.js";

export default class Sawblade extends Trap {
	
	static staticInitialize() {}

	constructor(scene, x, y, properties) {
		super(scene, x, y, 'sawblade_texture', 0);

		this.setScale(0.25);

		this.setInteractive();
		scene.input.setDraggable(this);

		scene.physics.add.existing(this);
		this.body.setCircle(this.width / 2.0, 0.5, 0.5);

		scene.physics.add.overlap(this, scene.getCollisionGroup('sawblade'), (_, obj) => obj.die());

		this.draggedPosition = new Phaser.Math.Vector2(this.x, this.y);

		this.on('drag', (pointer, x, y) => {
			let position = new Phaser.Math.Vector2(this.x, this.y);
			let pointerPosition = new Phaser.Math.Vector2(x, y);

			// TODO factor out constant 10.0
			if(position.distance(pointerPosition) > 10.0) {
				this.emit('dragend', pointer, this, false);

				return;
			}

			this.x = x;
			this.y = y;

		});

<<<<<<< HEAD
		const ambientSawSound = this.scene.sound.add('saw_sound_ambient', {loop: true, volume: 0.2});

	
		ambientSawSound.play();

	}

	whirr() {

=======
		const color = 0xFF_66_00;
		const colorOver = 0xFF_FF_00;
		

		this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
			this.glow.color = colorOver;
		}, this);

		this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
			this.glow.color = color;
		}, this);

        this.glow = this.postFX.addGlow(color, 3, 0, false, 0.1, 3);
>>>>>>> origin
	}

}

