import { Enemy } from "./Enemy.js";

export class Puppet extends Enemy {

    constructor(scene, x, y) {
        super(scene, x, y, 'puppet_texture', 0);
    }

}
