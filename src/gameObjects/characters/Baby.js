import { Character } from "./Character.js";
import { State } from "@lib/StateMachine.js";

export default class Baby extends Character {

    constructor(scene, x, y) {
        super(scene, x, y, 'baby_texture', 0);
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
