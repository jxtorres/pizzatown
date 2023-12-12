import * as Phaser from 'phaser';
import * as levels from '../levels';

const dialogLines = [
    "Hello, adventurer!",
    "Welcome to the world of Pizza City.",
    "Your journey is about to begin.",
    "I just moved here from Florida and opened this shop",
    "Business is good, people really like pizza here",
    "But....",
    "I can't get enough ingredients here..",
    "The government has put congestion pricing blockades on the tunnels",
    "Now there is no way to get produce, so..",
    "Let's make a deal....",
    "Walk South to 55th street where my other Florida friend has another pizza shop.",
    "Your Quest lies there... Good Luck!"
];

export default class MainScene extends Phaser.Scene {
    public hero: Phaser.Physics.Arcade.Sprite;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private startPoint: {x: integer, y: integer};
    private endPoint: {x: integer, y: integer};
    private images: any;
    public levelBounds: any[];
    public exit: any;
    public levelName: string;
    public bg: any;
    private hasTriggeredDialog: boolean;
    private dialogIndex: number;
    private dialogText: any;
    private ribbon: any;

    constructor() {
        super('main-scene');
    }

    importAllImages(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }
    
    

    preload() {
        this.levelBounds = [];
        this.images = this.importAllImages(require.context('../../assets', false, /\.(png|mp3|jpe?g|svg)$/));

        this.load.audio('gameSound', 'assets/8bit-music-for-game-68698.mp3');
        this.load.image('hero', 'assets/hero0.png');
        this.load.image('title', 'assets/titlescreen.png');

        this.load.path = 'assets/';
        this.load.image('framer1', 'heror1.png');
        this.load.image('framer2', 'heror2.png');
        this.load.image('framer3', 'heror3.png');
        this.load.image('framel1', 'herol1.png');
        this.load.image('framel2', 'herol2.png');
        this.load.image('framel3', 'herol3.png');

        this.load.image('street', 'pizzastreet2.png');
        this.load.image('shop', 'pizzashop2.png');

        this.load.image('white', 'alarm.png');


        console.log(this.images);
    }

    handleSwipe() {


        const swipeThreshold = 0; // Minimum distance for a swipe
        const xDist = this.endPoint.x - this.startPoint.x;
        const yDist = this.endPoint.y - this.startPoint.y;
      
        //if (Math.abs(xDist) > swipeThreshold || Math.abs(yDist) > swipeThreshold) {
          if (Math.abs(xDist) > Math.abs(yDist)) {
            // Horizontal swipe
            if (Math.abs(xDist) > 100) {
              // move character right
              //this.hero.setX(this.hero.x + 0.2*xDist);
              this.hero.setVelocityX((xDist > 0) ? 60 : -60);
              if(xDist > 0)
              {
                this.hero.play('walkright');
              }
              else
              {
                this.hero.play('walkleft');
              }
            } else {
              // move character left
              this.hero.setVelocityX(0);
              this.hero.setVelocityY(0);
              this.hero.anims.stop();

            }
          } else {
            // Vertical swipe
            if (Math.abs(yDist) > 100) {
              // move character down
              this.hero.setVelocityY((yDist > 0) ? 60 : -60);
              //this.hero.setY(this.hero.y + (0.2*yDist));
              if(yDist > 0)
              {
                if(!this.hero.anims.isPlaying)
                    this.hero.play('walkright');
              }
              else
              {
                if(!this.hero.anims.isPlaying)
                    this.hero.play('walkright');
              }

            } else {
              // move character up
              //this.hero.setY(this.hero.y + (0.2*yDist));
              this.hero.setVelocityY(0);
              this.hero.setVelocityX(0);
              this.hero.anims.stop();
            }
          }
        }
      //}
      

    startWatchingMobileSwipes() {
        this.input.on('pointerdown', (pointer) => {
            this.startPoint = { x: pointer.x, y: pointer.y };
            console.log(`x, ${pointer.x}    y, ${pointer.y}`);
        });
        
        this.input.on('pointerup', (pointer) => {
            this.endPoint = { x: pointer.x, y: pointer.y };
            this.handleSwipe();
        });
    }

    create() {
        let sound = this.sound.add('gameSound', { loop: true });

        // Play the sound
        sound.play();

        this.dialogIndex = 0;
        this.dialogText = this.add.text(300, this.cameras.main.centerY, '', { font: '60px Arial', color: '#ffffff', wordWrap: {width: 700} });

        this.hero = this.physics.add.sprite(720, 720, 'hero');


        // Desired size
        const desiredWidth = 50;
        const desiredHeight = 75;

        // Calculate scale factors
        const scaleX = desiredWidth / this.hero.width;
        const scaleY = desiredHeight / this.hero.height;

        // Set the scale
        this.hero.setScale(scaleX, scaleY);

        this.hero.body.setSize(30, 30);


        this.cursors = this.input.keyboard.createCursorKeys();

        this.startWatchingMobileSwipes();

        this.anims.create({
            key: 'walkright', //name of animation
            frames: [
              { key: 'framer1' },
              { key: 'framer2' },
              { key: 'framer3' }
              // Add more frames as needed
            ],
            frameRate: 10, // Adjust the frame rate as needed
            repeat: -1, // -1 means loop indefinitely
          });
          this.anims.create({
            key: 'walkleft', //name of animation
            frames: [
              { key: 'framel1' },
              { key: 'framel2' },
              { key: 'framel3' }
              // Add more frames as needed
            ],
            frameRate: 10, // Adjust the frame rate as needed
            repeat: -1, // -1 means loop indefinitely
          });
        
          //this.hero.play('walkright');

        levels.loadStreetLevel(this);

        this.hero.setX(700);
        this.hero.setY(700);
    }

    update() {
        // Handle hero movement and actions

        if(Phaser.Math.Distance.Between(this.exit[0], this.exit[1], this.hero.x, this.hero.y) < 30)
        {
            levels.swapLevel(this);
        }

        if(this.levelName === "shop" && Phaser.Math.Distance.Between(711, 571, this.hero.x, this.hero.y) < 30)
        {
            //spawn dialog and set flag
            if(!this.hasTriggeredDialog)
            {
                this.hasTriggeredDialog = true;
                this.startDialog();
            }
            
        }
    }



    startDialog() {
            // Create a graphics object
        this.ribbon = this.add.graphics();

        // Set the fill style (e.g., black color)
        this.ribbon.fillStyle(0x000000, 0.8); // The second parameter is the alpha (transparency)

        // Draw the rectangle (ribbon)
        this.ribbon.fillRect(0, this.cameras.main.centerY - 30, this.cameras.main.width, 300);
        this.ribbon.setDepth(0);
        this.dialogText.setDepth(1);
        this.dialogText.setText(dialogLines[this.dialogIndex]);
        this.input.on('pointerdown', this.advanceDialog, this);
    }

    advanceDialog() {
        this.dialogIndex++;
        if (this.dialogIndex < dialogLines.length) {
            this.dialogText.setText(dialogLines[this.dialogIndex]);
        } else {
            // End of dialog
            this.dialogText.setVisible(false);
            this.input.off('pointerdown', this.advanceDialog, this);
            this.ribbon.destroy();
            // Handle end of dialog scenario
        }
    }
}
