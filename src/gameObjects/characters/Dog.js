import { Enemy } from "./Enemy.js";

import { EffectShape, EffectDescriptor, Effect } from "../effects/Effect.js";

import { State } from "@lib/StateMachine.js";

class BarkEffectDescriptor extends EffectDescriptor {
	
	constructor() {
		super(
			'bark',
			EffectShape.createCircle(30),
			(_, obj) => this.onBarkRadiusEnter(obj),
			100
		);
	}

	onBarkRadiusEnter(obj) {
		console.log(obj);
	}

}

export default class Dog extends Enemy {

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'dog_texture', 0, properties);

		this.bark();
    }

	initializeStates() {
		return {
			'idle': new DogIdleState(),
			'bark': new DogBarkState(),
		};
	}

	bark() {
		this.fsm.transition('bark');

		this.play('dog_bark_anim');

		const barkSound = this.scene.sound.add('dog_bark_sound');
		barkSound.on('complete', () => { this.fsm.transition('idle'); }, this);

		const barkEffect = new Effect(this.scene, this.x, this.y, new BarkEffectDescriptor());

		barkSound.play();
	}

}

class DogIdleState extends State {
	enter(scene, dogObject) {}

	execute(scene, dogObject) {}
}

class DogBarkState extends State {
	enter(scene, dogObject) {}

	execute(scene, dogObject) {}
}

