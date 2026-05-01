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
		obj.handleBark();
	}

}

class AggroZoneDescriptor extends EffectDescriptor {
	
	constructor(dog) {
		super(
			'aggroZone',
			EffectShape.createCircle(25),
			(_, obj) => { dog.bark(); obj.handleBark() },
			-1
		);
	}

}

export default class Dog extends Enemy {

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'dog_texture', 0, properties);

		this.stateStack.push('idle');

		scene.collisionGroups.getOrInsert('sawblade', new Phaser.GameObjects.Group()).add(this);

		this.aggroZone = new Effect(scene, this.x, this.y, new AggroZoneDescriptor(this));
    }

	initializeStates() {
		return {
			'idle': new DogIdleState(),
			'bark': new DogBarkState(),
		};
	}

	bark() {
		this.aggroZone.destroy();

		this.scene.time.delayedCall(
			4000,
			() => {
				this.aggroZone = new Effect(this.scene, this.x, this.y, new AggroZoneDescriptor(this));
			},
			null,
			this
		);

		this.fsm.transition('bark');

		this.play('dog_bark_anim');

		const barkSound = this.scene.sound.add('dog_bark_sound');
		barkSound.on('complete', () => { this.fsm.transition('idle'); }, this);

		const barkEffect = new Effect(this.scene, this.x, this.y, new BarkEffectDescriptor());

		barkSound.play();
	}

}

class DogIdleState extends State {
	enter(scene, dogObject) {
		dogObject.play('doggy-idle', true);
	}

	execute(scene, dogObject) {}
}

class DogBarkState extends State {
	enter(scene, dogObject) {}

	execute(scene, dogObject) {}
}

