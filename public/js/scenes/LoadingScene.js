export class LoadingScene extends Phaser.Scene {
    constructor() {
        super('Loading');
    }
    preload() {
        const gameW = Number(this.sys.game.config.width);
        const gameH = Number(this.sys.game.config.height);
        const logo = this.add.sprite(gameW / 2, 250, 'logo');
        const bgBar = this.add.graphics();
        const barW = 150;
        const barH = 30;
        bgBar.setPosition(gameW / 2 - barW / 2, gameH / 2 - barH / 2);
        bgBar.fillStyle(0xf5f5f5, 1);
        bgBar.fillRect(0, 0, barW, barH);
        const progressBar = this.add.graphics();
        progressBar.setPosition(gameW / 2 - barW / 2, gameH / 2 - barH / 2);
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x9ad98d, 1);
            progressBar.fillRect(0, 0, value * barW, barH);
        });
        this.load.image('backyard', 'assets/images/backyard.png');
        this.load.image('apple', 'assets/images/apple.png');
        this.load.image('candy', 'assets/images/candy.png');
        this.load.image('rotate', 'assets/images/rotate.png');
        this.load.image('toy', 'assets/images/rubber_duck.png');
        this.load.spritesheet('pet', 'assets/images/pet.png', {
            frameWidth: 97,
            frameHeight: 83,
            margin: 1,
            spacing: 1,
        });
    }
    create() {
        this.anims.create({
            key: 'funnyFaces',
            frames: this.anims.generateFrameNames('pet', { frames: [1, 2, 3] }),
            frameRate: 7,
            yoyo: true,
            repeat: 0,
        });
        this.scene.start('Home');
    }
}
