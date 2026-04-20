import { Enemy } from "./Enemy.js";

export class Fish extends Enemy {

    constructor(scene, x, y) {
        super(scene, x, y, 'fish_texture', 0);
    }

}
