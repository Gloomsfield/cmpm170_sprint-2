export default class ExitTrigger {
    static staticInitialize(scene, x, y, properties) {
        // No-op, constructed in Baby.js instead
    }

    static init(scene, baby, { x, y, width, height }) {
        // https://phaser.discourse.group/t/collision-enter-exit-event/1001/3
        const zone = scene.add.zone(x, y).setSize(width, height).setOrigin(0);
        scene.physics.world.enable(zone);
        zone.body.setAllowGravity(false);
        zone.body.moves = false;

        scene.physics.add.overlap(baby, zone);

        zone.body.onOverlap = true;

        const collisionFilter = new Set([baby, zone]);
        scene.physics.world.once('overlap', (gameObject1, gameObject2, body1, body2) => {
            if (collisionFilter.has(gameObject1) && collisionFilter.has(gameObject2)) {
                console.log('overlapped exit');
            }
        });
    }

    constructor() {
    }
}
