import { Character } from "./Character.js";
import { State } from "@lib/StateMachine.js";
import { offsetPolylinePath } from "@src/tiledImport.js"

export default class Baby extends Character {

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'baby_texture', 0, properties);

        this.pathGoals = properties.path ? offsetPolylinePath(properties.path) : [];

        this.pathGoals.shift(); // Remove first element since the baby spawns on it

        this.moveToNextGoal(); // TODO Add timer delay before this is called

        if (this.scene.baby) {
            console.error('There is already an instance of baby in the scene');
        } else {
            console.log('setting baby in level');
            this.scene.baby = this;
            // SHOULD be called from DungeonLevel.create, but because this class is
            // loaded async the scene creating this baby will crash with null baby
		    this.scene.positionView();
        }
    }

    initializeStates() {
        return {
            idle: new BabyIdleState(),
            moving: new BabyMovingState()
        };
    }

}

class BabyIdleState extends State {

    enter(scene, babyObject) {

    }

    execute(scene, babyObject) {

    }

}

class BabyMovingState extends State {

    enter(scene, babyObject) {

    }

    execute(scene, babyObject) {

    }

}
