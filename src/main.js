import { Initialize } from "./scenes/Initialize.js";
import { MainMenu } from "./scenes/MainMenu.js";
import { Credits } from "./scenes/Credits.js";

'use strict';

const urlQueryParams = new URLSearchParams(window.location.search);

const config = {
    type: Phaser.WEBGL,
    parent: 'phasergame',
    canvasStyle: 'display: block;', // Set to block, as otherwise it will have a 6-pixel gap underneath
    pixelArt: true,

    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    backgroundColor: '#FACADE',

    useTicker: true,
    physics: {
        default: 'arcade'
    },
    scene: [ new Initialize(urlQueryParams.get('mode')), MainMenu, Credits ]
};

export const game = new Phaser.Game(config);

// Allow all scenes to be accessible via browser console
game.events.once('ready', () => Object.assign(window, game.scene.keys));

// Add the phaser game object to window as well, so that it can be accessed despite js moding for modules instead of globals
window.game = game;
