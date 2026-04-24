import { deserializeObjectLayer } from '@src/tiledImport.js';

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
		this.map = map;
		const tileset = map.addTilesetImage('toadzilla_dungeon', this.tilesetKey);

		const backgroundLayer = map.createLayer('background', tileset, 0.0, 0.0);
		const pitLayer = map.createLayer('pits', tileset, 0.0, 0.0);
		const wallLayer = map.createLayer('walls', tileset, 0.0, 0.0);

		pitLayer.setCollisionByProperty({ collides: true });
		wallLayer.setCollisionByProperty({ collides: true });

		// this.addLayerDebugGraphics(wallLayer);
		// this.addLayerDebugGraphics(pitLayer, { collidingTileColor: new Phaser.Display.Color(128, 0, 0, 255) });

		const collidableTileLayers = { pitLayer: pitLayer, wallLayer: wallLayer };

		this.spawnObjects(map, collidableTileLayers);

		this.initializeFinder(map, tileset, Object.values(collidableTileLayers));
	}

	spawnObjects(tilemap, collidableTileLayers) {
		for(const layerName of tilemap.getObjectLayerNames()) {
			this.spawnObjectsOnLayer(tilemap, layerName, collidableTileLayers);
		}
	}

	spawnObjectsOnLayer(tilemap, layerName, collidableTileLayers) {
		for (const spawnData of deserializeObjectLayer(tilemap, layerName)) {
			this.spawnObject(layerName, spawnData, collidableTileLayers);
		}
	}

	spawnObject(classDirectory, spawnData, collidableTileLayers) {
		const formattedName = spawnData.name[0].toUpperCase() + spawnData.name.slice(1);

		// solution described by https://stackoverflow.com/a/67880017
		// shoutout eric for finding the SO post lol
		const modulePath = `@src/gameObjects/${classDirectory}/${formattedName}.js`;
		import(modulePath)
			.then(({ default: defaultModule }) => {
				spawnData.properties.collidableTileLayers = collidableTileLayers;
				const spawned = this.dispatchModule(defaultModule, spawnData);
			}).catch(error => {
				console.error(`Failed to initialize character class imported from '${modulePath}':\n\n${error}`);
			});
	}

	dispatchModule(defaultModule, spawnData) {
		// Check if the imported class contains a function called "staticInitialize" that is not inherited from a parent
		if (typeof defaultModule.staticInitialize === 'function' && Object.hasOwn(defaultModule, 'staticInitialize')) {
			return defaultModule.staticInitialize(this, spawnData.x, spawnData.y, spawnData.properties);
		}

		return new defaultModule(this, spawnData.x, spawnData.y, spawnData.properties);
	}
}

