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

		console.log('meow');

		this.scene = scene;
	}

}

