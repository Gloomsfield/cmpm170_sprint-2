import { Trap } from "./Trap.js";

export default class Sawblade extends Trap {
	
	static staticInitialize() {}

	constructor(scene, x, y, properties) {
		super(scene, x, y, 'sawblade_texture', 0);

		this.setScale(0.25);

		this.setInteractive();
		scene.input.setDraggable(this);

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
	}

}

