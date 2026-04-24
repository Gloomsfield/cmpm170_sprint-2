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

		this.startingAngle = Math.atan2(this.sawblade.y - this.y, this.sawblade.x - this.x);
		this.maxAngle = properties.maxAngle * Math.PI / 180.0;

		this.radius = new Phaser.Math.Vector2(
			this.sawblade.x,
			this.sawblade.y
		).distance(new Phaser.Math.Vector2(this.x, this.y));

		scene.events.on('update', this.update, this);

		this.scene = scene;
	}

	clampSawblade() {
		let unclampedSawbladeAngle = Math.atan2(
			this.sawblade.x - this.x,
			-this.sawblade.y + this.y
		) - Math.PI / 2.0;

		let clampedSawbladeAngle = Math.min(
			this.startingAngle + this.maxAngle, Math.max(
				this.startingAngle - this.maxAngle, unclampedSawbladeAngle
			)
		);

		let newSawbladePosition = new Phaser.Math.Vector2(
			Math.cos(clampedSawbladeAngle),
			Math.sin(clampedSawbladeAngle)
		).scale(this.radius).add(new Phaser.Math.Vector2(this.x, this.y));

		this.sawblade.setPosition(newSawbladePosition.x, newSawbladePosition.y);
	}

	update(time, delta) {
		this.sawblade.update();
		this.clampSawblade();
	}

}

