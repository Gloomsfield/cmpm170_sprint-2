import { Enemy } from "./Enemy.js";

export default class Bear extends Enemy {

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'bear_texture', 0, properties);
    }

}
