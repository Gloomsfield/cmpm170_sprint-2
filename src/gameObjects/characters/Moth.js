import { Enemy } from "./Enemy.js";

export default class Moth extends Enemy {

    constructor(scene, x, y, properties) {
        super(scene, x, y, 'moth_texture', 0, properties);
    }

}
