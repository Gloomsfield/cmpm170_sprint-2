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

		const idleStates = this.initializeIdleSubStates();
		const idleFsmPersistParameters = [scene, this];

		this.idleFsm = new StateMachine('seeking', idleStates, idleFsmPersistParameters);

        if (this.scene.baby) {
            console.error('There is already an instance of baby in the scene');
        } else {
            this.scene.baby = this;
            // SHOULD be called from DungeonLevel.create, but because this class is
            // loaded async the scene creating this baby will crash with null baby
		    this.scene.positionView();
        }
    }

    initializeStates() {
        return {
            idle: new BabyIdleState(),
        };
    }

	initializeIdleSubStates() {
		return {
			seeking: new BabyIdleState.SeekingState(),
			scared: new BabyIdleState.ScaredState(),
		};
	}

}

class BabyIdleState extends State {

	static SeekingState = class extends State {
		enter(scene, babyObject) { console.log('entering seeking sub-state'); }
		execute(scene, babyObject) {}
	};

	static ScaredState = class extends State {
		enter(scene, babyObject) { console.log('entering scared sub-state'); }
		execute(scene, babyObject) {}
	};

    enter(scene, babyObject) {
		babyObject.idleFsm.transition('seeking');
	}

    execute(scene, babyObject) {
		babyObject.idleFsm.step();
	}

}

class BabyScaredState extends State {
	
	enter(scene, babyObject) {}
	execute(scene, babyObject) {}

}

