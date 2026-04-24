import { Enemy } from "./Enemy.js";

export default class Puppet extends Enemy {

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'puppet_texture', 0, properties);
    }

}
