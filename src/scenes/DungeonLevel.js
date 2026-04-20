// http://127.0.0.1:5500/?mode=dungeonLevelScene
// https://gloomsfield.github.io/cmpm170_sprint-2/?mode=dungeonLevelScene

export class DungeonLevel extends Phaser.Scene {
	constructor() {
		super('dungeonLevelScene');
	}

	create(tilemapInfo) {
		tilemapInfo = {
			tilemapKey: 'tutorial_tilemap',
			tilesetKey: 'dungeon_tileset',
			// If same key name is bound, above default value will be overwritten through below spread operator
			...tilemapInfo,
		};

		this.tilemapKey = tilemapInfo.tilemapKey;
		this.tilesetKey = tilemapInfo.tilesetKey;

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
		const formattedName = spawnData.name[0].toUpperCase() + spawnData.name.slice(1);

		// solution described by https://stackoverflow.com/a/67880017
		// shoutout eric for finding the SO post lol
		import(`@src/gameObjects/characters/${formattedName}.js`)
			.then(({ default: spawnConstructor }) => {
				let spawned = new spawnConstructor(this, spawnData.x, spawnData.y);
				if(!spawned) { console.error(`failed to spawn ${formattedName}!!`); }
			}
		).catch((error) => {
			console.error(error + `\n\n(${formattedName}.js probably doesn't exist!!)`);
		});
	}
}

