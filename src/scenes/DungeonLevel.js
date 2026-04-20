import { spawnCharacter } from '@src/globals.js';

export class DungeonLevel extends Phaser.Scene {
	constructor() {
		super('dungeonLevelScene');
	}

	create(tilemapInfo) {
		this.tilemapKey = 'tutorial_tilemap';
		this.tilesetKey = 'dungeon_tileset';

		if(tilemapInfo && tilemapInfo.tilemapKey) { this.tilemapKey = tilemapInfo.tilemapKey; }
		if(tilemapInfo && tilemapInfo.tilesetKey) { this.tilesetKey = tilemapInfo.tilesetKey; }

		const map = this.add.tilemap(this.tilemapKey);
		const tileset = map.addTilesetImage('toadzilla_dungeon', this.tilesetKey);

		const backgroundLayer = map.createLayer('background', tileset, 0.0, 0.0);
		const pitLayer = map.createLayer('pits', tileset, 0.0, 0.0);
		const wallLayer = map.createLayer('walls', tileset, 0.0, 0.0);

		this.spawnObjects(map);
	}

	spawnObjects(tilemap) {
		for(let obj of tilemap.getObjectLayer('spawns').objects) {
			let spawnData = { name: obj.name, x: obj.x, y: obj.y };
			this.trySpawn(spawnData);
		}
	}

	trySpawn(spawnData) {
		let spawned = spawnCharacter(spawnData.name, this, spawnData.x, spawnData.y);
		if(!spawned) { console.error(`failed to spawn ${spawnData.name}!`); }
	}
}

