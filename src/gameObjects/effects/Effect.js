export class EffectShape {

	// you should not invoke the constructor of this
	// class by itself. please use the `create${Shape}`
	// methods instead.
	constructor(type, p1, p2) {
		switch(type) {
			case 'circle':
				this.setShapeFunction = (body) => { body.setCircle(p1, -p1, -p1); };

				break;
			case 'rectangle':
				this.setShapeFunction = (body) => {
					body.setSize(p1, p2);
					body.setOffset(-p1 / 2.0, -p2 / 2.0);
				};

				break;
			default:
				console.error('invalid EffectShape type!');
				break;
		}
	}

	static createCircle(radius) {
		return new EffectShape('circle', radius);
	}

	static createRectangle(width, height) {
		return new EffectShape('rectangle', width, height);
	}

	static createSquare(sideLength) {
		return new EffectShape('rectangle', sideLength, sideLength);
	}

}

export class EffectDescriptor {
	
	constructor(name, shape, onOverlapCallback, lingerDuration) {
		this.name = name;
		this.shape = shape;
		this.onOverlapCallback = onOverlapCallback;
		this.lingerDuration = lingerDuration;
	}

}

export let Effect = new Phaser.Class({

	Extends: Phaser.GameObjects.GameObject,
	Mixins: [
		Phaser.GameObjects.Components.Origin,
		Phaser.GameObjects.Components.Size,
		Phaser.GameObjects.Components.TextureCrop,
		Phaser.GameObjects.Components.Transform
	],

	initialize: function Effect(scene, x, y, effectDescriptor) {
		Phaser.GameObjects.GameObject.call(this, scene, 'Effect');
		
		// we need to set this.frame.realWidth or Phaser
		// complains. there must be a better workaround
		// for this, but Phaser REALLY wants collidable
		// objects to be rendered, so i'm not sure if there
		// actually is.
		this.frame = { realWidth: 0 };

		this.setPosition(x, y);

		scene.add.existing(this);
		scene.physics.add.existing(this);

		effectDescriptor.shape.setShapeFunction(this.body);

		scene.physics.add.overlap(this, scene.getCollisionGroup(effectDescriptor.name), effectDescriptor.onOverlapCallback);

		if(effectDescriptor.lingerDuration < 0) { return; }
		scene.time.delayedCall(effectDescriptor.lingerDuration, () => { this.destroy(); }, null, this);
	}

});

