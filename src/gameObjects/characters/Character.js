import { State, StateMachine } from '@lib/StateMachine.js';

import { finder } from '@src/main.js';

export class Character extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, frame, properties) {
        super(scene, x, y, texture, frame); // call Sprite parent class
        scene.add.existing(this);           // add npc to existing scene
        scene.physics.add.existing(this);   // add physics body to scene

        this.controlVelocity = 50; // in pixels
        this.targetPos = new Phaser.Math.Vector2(x, y);
        this.pathNodes = [];
        this.pathGoals = [];
        this.debug = false;

        this.body.setSize(this.width * 0.5, this.height * 0.5);
        this.body.setCollideWorldBounds(true);
        this.body.setFriction(1.0);

        const states = this.initializeStates();

        if(states['idle'] == null) {
            console.warn(`Missing 'idle' default state in class ${this.constructor.name}.`);
        }

		if(states['moving']) {
			console.warn(`'moving' state will be overridden in ${this.constructor.name} by Character base class.`);
		}

		states['moving'] = new CharacterMovingState();

        const fsmPersistParameters = [scene, this];
        this.fsm = new StateMachine('idle', states, fsmPersistParameters);

        this.addTileCollision(properties.collidableTileLayers);

        scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    /**
     * Called by the constructor to initialize states for this given character.
     * @returns A map of key-strings to FSM states. The one named idle is run as default.
     */
    initializeStates() {
        return {};
    }

    addTileCollision(collidableTileLayers) {
        for (const layer of Object.values(collidableTileLayers)) {
            this.scene.physics.add.collider(this, layer);
        }
    }

    moveToNextGoal() {
        if (this.pathGoals.length > 0) {
            const { x: posTileX, y: posTileY } = this.getTilePos();
            const { x: pathfindWorldPosX, y: pathfindWorldPosY } = this.pathGoals[0];
            const { x: targetTileX, y: targetTileY } = this.scene.getPathfindTilePos(pathfindWorldPosX, pathfindWorldPosY);

            if (this.debug) console.log('moveToNextGoal before findPath:', `${posTileX}, ${posTileY}`, `${targetTileX}, ${targetTileY}`);

            finder.findPath(posTileX, posTileY, targetTileX, targetTileY, path => { this.startPathing(path); });
            finder.calculate();
        }
    }

    // Called when EasyStar async finds a path
    startPathing(path) {
        if (!path) {
            console.error('Pathfinder could not route.');
            return;
        }
        if (this.debug) console.log('startPathing', JSON.stringify(path));
        this.pathGoals.shift(); // Consume goal, now moving towards it
        path.shift(); // remove first node, on the tile already or else it may slightly backtrack
        this.pathNodes = path;

        this.shiftPathingNode();
    }

    // The character has reached its destination, poll next node
    shiftPathingNode() {
        if (this.debug) console.log('shiftPathingNode pre', JSON.stringify(this.pathNodes));

        const noNodes = this.pathNodes.length == 0;

        if (noNodes) {
            this.clearPathing();

            this.moveToNextGoal();

            return;
        }

        const tileNode = this.pathNodes.shift();
        const worldPos = this.scene.pathfinderLayer.tileToWorldXY(tileNode.x + 0.5, tileNode.y + 0.5, null, this.scene.cameras.main);
        this.setTargetPos(worldPos);

        // TODO this.anims.play('moving', true);
    }

    clearPathing() {
        // TODO this.anims.play('idle', true);
        this.pathNodes = [];

		this.fsm.transition('idle');
    }

    setTargetPos(pos) {
        if (this.debug) console.log("setTargetPos", JSON.stringify(pos));

        this.targetPos = pos;
        this.scene.physics.moveToObject(this, pos, this.controlVelocity);

		if(this.fsm.state != 'moving') {
			this.fsm.transition('moving');
		}
    }

    update() {
        this.fsm.step();
    }

    getTilePos(snapToGrid = true) {
        return this.scene.getPathfindTilePos(this.x, this.y, snapToGrid);
    }

}

class CharacterMovingState extends State {

	enter(scene, characterObject) {}

	execute(scene, characterObject) {
		const distanceToNode = Phaser.Math.Distance.BetweenPoints(
			characterObject,
			characterObject.targetPos
		);

		if(distanceToNode < 1) {
			characterObject.shiftPathingNode();
		}
	}

}

