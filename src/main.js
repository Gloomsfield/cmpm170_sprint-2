import EasyStar from '@lib/easystar.js';

import { Initialize } from './scenes/Initialize.js';
import { MainMenu } from './scenes/MainMenu.js';
import { Credits } from './scenes/Credits.js';

import { DungeonLevel } from './scenes/DungeonLevel.js'

'use strict';

const urlQueryParams = new URLSearchParams(window.location.search);

const config = {
    type: Phaser.WEBGL,
    parent: 'phasergame',
    pixelArt: true,

    width: 400,
    height: 300,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    backgroundColor: '#FACADE',

    useTicker: true,
    physics: {
        default: 'arcade',
        // arcade: { debug: true }
    },
    scene: [ new Initialize(urlQueryParams.get('mode')), MainMenu, Credits, DungeonLevel ]
};

export const game = new Phaser.Game(config);
export const finder = new EasyStar.js();
finder.enableDiagonals();

// Allow all scenes to be accessible via browser console
game.events.once('ready', () => Object.assign(window, game.scene.keys));

// Add the phaser game object to window as well, so that it can be accessed despite js moding for modules instead of globals
window.game = game;
