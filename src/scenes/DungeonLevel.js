import * as globals from '@src/globals.js';

export class DungeonLevel extends Phaser.Scene {
	constructor() {
		super('dungeonLevelScene');
	}

	create(tilemapInfo) {
		const map = this.add.tilemap(tilemapInfo.tilemapKey);
		const tileset = map.addTilesetImage(tilemapInfo.tilesetKey);

		const floorLayer = map.createLayer(globals.tilemapSettings.layerName.floor);
		const wallLayer = map.createLayer(globals.tilemapSettings.layerName.staticCollision);

		// this feels a little sloppy.
		// TODO standardize NPC spawning
		const babySpawn = map.findObject(
			globals.tilemapSettings.layers.spawns.name,
			(objectProperties) => { return (
				objectProperties.name == globals.tilemapSettings.layers.spawns.babySpawn
			); }
		);
	}
}

