import { Enemy } from "./Enemy.js";

export default class Moth extends Enemy {

    constructor(scene, x, y) {
        super(scene, x, y, 'moth_texture', 0);
    }

}
