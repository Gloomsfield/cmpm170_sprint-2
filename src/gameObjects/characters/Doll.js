import { Enemy } from "./Enemy.js";

export default class Doll extends Enemy {

    constructor(scene, x, y) {
        super(scene, x, y, 'doll_texture', 0);
    }

}
