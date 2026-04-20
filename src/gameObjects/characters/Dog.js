import { Enemy } from "./Enemy.js";

export default class Dog extends Enemy {

    constructor(scene, x, y) {
        super(scene, x, y, 'dog_texture', 0);
    }

}
