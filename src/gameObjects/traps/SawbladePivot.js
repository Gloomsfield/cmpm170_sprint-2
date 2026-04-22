import { Trap } from "./Trap.js";

import { default as Sawblade } from "./Sawblade.js"

export default class SawbladePivot extends Trap {
	
	static staticInitialize(scene, x, y, properties) {
		new SawbladePivot(scene, x, y, properties);
	}

	constructor(scene, x, y, properties) {
		super(scene, x, y, 'sawblade-pivot_texture', 0);

		this.sawblade = new Sawblade(
			scene,
			properties.sawblade.x,
			properties.sawblade.y,
			properties.sawblade.properties
		);

		this.radius = new Phaser.Math.Vector2(
			this.sawblade.x,
			this.sawblade.y
		).distance(new Phaser.Math.Vector2(this.x, this.y));

		scene.events.on('update', this.update, this);

		this.scene = scene;
	}

	clampSawblade() {
		let oldSawbladePosition = new Phaser.Math.Vector2(
			this.sawblade.x,
			this.sawblade.y
		);

		let thisPosition = new Phaser.Math.Vector2(
			this.x,
			this.y
		);

		let direction = new Phaser.Math.Vector2(oldSawbladePosition).subtract(thisPosition).normalize();
		let newSawbladePosition = new Phaser.Math.Vector2(direction).scale(this.radius).add(thisPosition);

		this.sawblade.setPosition(newSawbladePosition.x, newSawbladePosition.y);
	}

	update(time, delta) {
		this.sawblade.update();
		this.clampSawblade();
	}

}

