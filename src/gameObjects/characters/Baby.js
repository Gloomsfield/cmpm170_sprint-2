import { Character } from "./Character.js";
import ExitTrigger from "@src/gameObjects/poi/ExitTrigger.js";
import { State, StateMachine } from "@lib/StateMachine.js";
import { offsetPolylinePath } from "@src/tiledImport.js"

export default class Baby extends Character {

	static staticInitialize(scene, x, y, properties) {
		const baby = new Baby(scene, x, y, properties);

        if (properties.exit) {
			ExitTrigger.init(scene, baby, properties.exit);
		} else {
			console.log('exit is missing from baby\'s custom properties');
		}

		return baby;
    }

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'baby_texture', 0, properties);

        this.pathGoals = properties.path ? offsetPolylinePath(properties.path) : [];

        this.pathGoals.shift(); // Remove first element since the baby spawns on it

        this.moveToNextGoal(); // TODO Add timer delay before this is called

        if (this.scene.baby) {
            console.error('There is already an instance of baby in the scene');
        } else {
            this.scene.baby = this;
            // SHOULD be called from DungeonLevel.create, but because this class is
            // loaded async the scene creating this baby will crash with null baby
		    this.scene.positionView();
        }

		this.stateStack.push('idle');
		this.stateStack.push('moving');

		scene.time.delayedCall(1000, () => this.stateStack.push('afraid', 999), null, this);
    }

    initializeStates() {
        return {
            idle: new BabyIdleState(),
			afraid: new BabyFearState(),
        };
    }

	initializeIdleSubStates() {
		return {
			seeking: new BabyIdleState.SeekingState(),
			scared: new BabyIdleState.ScaredState(),
		};
	}

	die() {
		// hacky way to prevent baby.die being called twice
		this.die = () => {};
		this.scene.scene.restart();
	}

    setDirection(direction) {
        super.setDirection(direction);
        this.play(`baby-walk-${direction}`, true);
    }

}

class BabyIdleState extends State {

    enter(scene, babyObject) {}
    execute(scene, babyObject) {}
	exit() {}

}

class BabyFearState extends State {

	enter(scene, babyObject) {
		scene.time.delayedCall(
			100,
			() => babyObject.stateStack.delete('afraid'),
			null,
			this
		);
	}

	execute() {}
	exit() {}
}

