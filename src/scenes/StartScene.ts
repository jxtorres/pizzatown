// StartScene.js or StartScene.ts if you are using TypeScript
//export default class MainScene extends Phaser.Scene {
export default class StartScene extends Phaser.Scene {
    private images: any;

    constructor() {
        super({ key: 'StartScene' });
    }

    importAllImages(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    preload() {
        this.images = this.importAllImages(require.context('../../assets', false, /\.(png|mp3|jpe?g|svg)$/));


        this.load.audio('gameSound', 'assets/8-bit-heaven-26287.mp3');

        

        this.load.image('hero', 'assets/hero0.png');
        this.load.image('title', 'assets/titlescreen2.png');
    }

    create() {
        // Start screen setup goes here
        // ...

        // Create the start button
        // const startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Start', { font: '32px Arial', color: '#ffffff' })
        //     .setInteractive()
        //     .setOrigin(0.5);
        let sound = this.sound.add('gameSound', { loop: true });

        // Play the sound
        sound.play();

        let bg = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'title');
        
        const scaleX = Number(this.sys.game.config.width) / bg.width;
        const scaleY = Number(this.sys.game.config.height) / bg.height;
        const scale = Math.min(scaleX, scaleY);
        bg.setScale(scale);
        bg.setInteractive();
        bg.on('pointerdown', () => {
            // Start the game when the button is clicked
            sound.stop();
            this.scene.start('main-scene');
        });
    }
}
