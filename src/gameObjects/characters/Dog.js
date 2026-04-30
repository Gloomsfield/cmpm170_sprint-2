import { Enemy } from "./Enemy.js";

import { EffectShape, EffectDescriptor, Effect } from "../effects/Effect.js";

import { State } from "@lib/StateMachine.js";

export default class Dog extends Enemy {

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'dog_texture', 0, properties);

		this.barkEffectDescriptor = new EffectDescriptor(
			'bark',
			EffectShape.createCircle(30),
			(object1, object2) => { console.log(`${object1} collided with ${object2}`); },
			100
		);

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

		const barkEffect = new Effect(this.scene, this.x, this.y, this.barkEffectDescriptor);

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

