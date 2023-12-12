import * as Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import StartScene from './scenes/StartScene';

new Phaser.Game({
    type: Phaser.AUTO,
    width: 1600,
    height: 1200,
    scene: [StartScene, MainScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
        
    },
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game-container', // The ID of the DOM element in which Phaser will add the canvas
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
});
