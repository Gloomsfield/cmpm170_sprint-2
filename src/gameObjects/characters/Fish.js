import { Enemy } from "./Enemy.js";

export default class Fish extends Enemy {

    constructor(scene, x, y) {
        super(scene, x, y, 'fish_texture', 0);
    }

}
