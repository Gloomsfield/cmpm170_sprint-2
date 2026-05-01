export class MusicScene extends Phaser.Scene {
    constructor(){
        super({ key: 'MusicScene'});
    }

    create(){
        const mainTheme = this.sound.get('main_theme');
		
		if (!mainTheme){
			const mainTheme = this.sound.add('main_theme', {volume: 0.5});
			console.log("herro");
			mainTheme.addMarker({
				name: 'first',
				start: 0,
				duration: 56
			});
			mainTheme.addMarker({
				name: "loop",
				start: 18,
				duration: 38
			});
			mainTheme.play('first');	
			mainTheme.once('complete', () => {
        		mainTheme.play('loop', { loop: true });
    		});
		}
    }
}