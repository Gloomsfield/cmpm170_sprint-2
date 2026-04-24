import { Enemy } from "./Enemy.js";

export default class Clown extends Enemy {

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'clown_texture', 0, properties);
    }

}
