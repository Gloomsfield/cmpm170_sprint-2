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
			this.draggedPosition.x = x;
			this.draggedPosition.y = y;
		});
	}

	update() {
		this.x = this.draggedPosition.x;
		this.y = this.draggedPosition.y;
	}

}

