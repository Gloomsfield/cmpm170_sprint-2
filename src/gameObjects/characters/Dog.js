import { Enemy } from "./Enemy.js";
import { State } from "@lib/StateMachine.js"

export default class Dog extends Enemy {

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'dog_texture', 0, properties);

		this.fsm.transition('bark');
    }

	initializeStates() {
		return {
			'idle': new DogIdleState(),
			'bark': new DogBarkState(),
		};
	}

	bark() {
		this.play('dog_bark_anim');
		
		const barkSound = this.scene.sound.add('dog_bark_sound');
		barkSound.on('complete', () => { this.fsm.transition('idle'); }, this);

		barkSound.play();
	}

}

class DogIdleState extends State {
	enter(scene, dogObject) {

	}

	execute(scene, dogObject) {
		
	}
}

class DogBarkState extends State {
	enter(scene, dogObject) {
		dogObject.bark();
	}

	execute(scene, dogObject) { }
}

