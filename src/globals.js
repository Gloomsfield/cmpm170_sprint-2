import { game } from './main.js'

export const buttonTextStyle = {
    fontFamily: 'Helvetica', // FIXME customize font
    color: '#000',
    align: 'center',
    padding: 4
};

export const menuTextStyle = {
    fontFamily: 'Helvetica', // FIXME customize font
    color: '#FFF',
    align: 'center'
};

export const tilemapSettings = {
	layers: {
		floor: {
			name: 'floor'
		},
		staticCollision: {
			name: 'walls'
		},
		spawns: {
			name: 'spawns',
		},
	}
};

export function canvasX(fractX) {
    return game.config.width * (fractX ?? 1.0);
}

export function canvasY(fractY) {
    return game.config.height * (fractY ?? 1.0);
}

export function canvasPos(fractX, fractY) {
    if (fractY == null) {
        fractY = fractX;
    }

    return [canvasX(fractX), canvasY(fractY)]
}

const characterConstructorMap = new Map();

export function registerCharacterName(name, constructor) {
	characterConstructorMap.set(name, constructor);
}

export function spawnCharacter(name, scene, x, y, texture, frame, data) {
	let characterConstructor = characterConstructorMap.get(name);
	if(!characterConstructor) { return false; }

	characterConstructor.call(scene, x, y, texture, frame, data);
}

