import { Enemy } from "./Enemy.js";

export default class Fish extends Enemy {

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'fish_texture', 0, properties);
    }

}
