import { game } from './main.js'

const radiansSixth = Math.PI / 3.0; // 1/6th of a circle

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

/** True modulo, as JS's % remainder operator can make negatives. https://stackoverflow.com/a/4467559 */
function mod(a, b) {
    return ((a % b) + b) % b;
}

export function getFacingDirection(originPoint, pointFaceTowards) {
    const angle = Phaser.Math.Angle.BetweenPoints(originPoint, pointFaceTowards);
    const rotationIndex = mod(Math.round(angle / radiansSixth), 6);
    switch (rotationIndex) {
        case 0:
            return 'right';
        case 4:
        case 5:
            return 'up';
        case 3:
            return 'left';
        case 1:
        case 2:
            return 'down';
    }
}

