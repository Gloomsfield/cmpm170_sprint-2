import { Character } from "./Character.js";
import { State } from "@lib/StateMachine.js";

export class Baby extends Character {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    initializeStates() {
        return {
            idle: new BabyIdleState(),
        };
    }

}

class BabyIdleState extends State {

    enter(scene, babyObject) {

    }

    execute(scene, babyObject) {

    }

}
