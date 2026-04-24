import { Character } from "./Character.js";
import { State } from "@lib/StateMachine.js";

export default class Baby extends Character {

    constructor(scene, x, y) {
        super(scene, x, y, 'baby_spritesheet', 0);

		this.scene.anims.create({
			key: 'baby_walk-forward_anim',
			frames: this.scene.anims.generateFrameNumbers('baby_spritesheet', {
				frames: [ 0, 1, 2, 3 ]
			}),
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'baby_walk-left_anim',
			frames: this.scene.anims.generateFrameNumbers('baby_spritesheet', {
				frames: [ 4, 5, 6, 7 ]
			}),
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'baby_walk-right_anim',
			frames: this.scene.anims.generateFrameNumbers('baby_spritesheet', {
				frames: [ 4, 5, 6, 7 ]
			}),
			frameRate: 8,
			repeat: -1,
		});

		this.scene.anims.create({
			key: 'baby_walk-backward_anim',
			frames: this.scene.anims.generateFrameNumbers('baby_spritesheet', {
				frames: [ 8, 9, 8, 10, ],
			}),
			frameRate: 8,
			repeat: -1,
		});

		this.play('baby_walk-forward_anim');
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
