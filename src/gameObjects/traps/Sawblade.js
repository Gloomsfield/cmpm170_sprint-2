import { Trap } from "./Trap.js";

export default class Sawblade extends Trap {
	
	static staticInitialize() {}

	constructor(scene, x, y, properties) {
		super(scene, x, y, 'sawblade_texture', 0);

		this.setScale(0.25);

		this.setInteractive();
		scene.input.setDraggable(this);

		this.on('drag', (pointer, x, y) => {
			this.setPosition(x, y);
		});
	}

}

