import { Enemy } from "./Enemy.js";
import { State } from "@lib/StateMachine.js";
import { offsetPolylinePath } from "@src/tiledImport.js";

export default class Puppet extends Enemy {

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'puppet_texture', 0, properties);

		this.pathGoals = properties.path ? offsetPolylinePath(properties.path) : [];
		this.pathGoals.shift();
		this.moveToNextGoal();
    }

	initializeStates() {
		return {
			idle: new PuppetIdleState(),
		};
	}

}

class PuppetIdleState extends State {
	
	enter(scene, puppetObject) {}
	execute(scene, puppetObject) {}

}

