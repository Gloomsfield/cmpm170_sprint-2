import { Enemy } from "./Enemy.js";

export default class Doll extends Enemy {

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'doll_texture', 0, properties);
    }

}
