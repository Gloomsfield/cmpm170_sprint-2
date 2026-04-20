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

