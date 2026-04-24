import { StateMachine } from '@lib/StateMachine.js';

export class Character extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame); // call Sprite parent class
        scene.add.existing(this);           // add npc to existing scene
        scene.physics.add.existing(this);   // add physics body to scene

        this.body.setSize(this.width * 0.5, this.height * 0.5);
        this.body.setCollideWorldBounds(true);
        this.body.setFriction(1.0);

        const states = this.initializeStates();
        if (states['idle'] == null) {
            console.warn(`Missing 'idle' default state in class ${this.constructor.name}.`);
        }
        const fsmPersistParameters = [scene, this];
        this.fsm = new StateMachine('idle', states, fsmPersistParameters);

		scene.events.on('update', this.update, this);

		this.scene = scene;
    }

	update(time, delta) {
		this.fsm.step();
	}

    /**
     * Called by the constructor to initialize states for this given character.
     * @returns A map of key-strings to FSM states. The one named idle is run as default.
     */
    initializeStates() {
        return {};
    }

}
