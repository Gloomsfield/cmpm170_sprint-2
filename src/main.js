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

    useTicker: true,
    physics: {
        default: 'arcade'
    },
    scene: [ ]
};

const game = new Phaser.Game(config);

game.events.once('ready', () => Object.assign(window, game.scene.keys));
