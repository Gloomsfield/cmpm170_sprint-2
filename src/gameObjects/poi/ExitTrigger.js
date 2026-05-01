import { deserializeCustomProperties } from '@src/tiledImport.js';

export default class ExitTrigger {
    static staticInitialize(scene, x, y, properties) {
        // No-op, constructed in Baby.js instead
    }

    static init(scene, baby, { x, y, width, height, properties: propertiesArr }) {
        const properties = deserializeCustomProperties({}, propertiesArr);

        if (!properties.next) {
            console.error('ExitTrigger is missing "next" property for level transition', propertiesArr);
        }

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
                if (properties.next === 'win') {
                    console.log('TODO: u winner deserve a win screen dude');
                } else {
                    scene.scene.start('dungeonLevelScene', { tilemapKey: properties.next });
                }
            }
        });
    }

    constructor() {
    }
}
