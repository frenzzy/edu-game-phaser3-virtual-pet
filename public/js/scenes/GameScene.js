export class GameScene extends Phaser.Scene {
    pet;
    appleBtn;
    candyBtn;
    toyBtn;
    rotateBtn;
    buttons;
    stats;
    uiBlocked = false;
    selectedItem = null;
    healthText;
    funText;
    timedEventStats;
    decayRates;
    constructor() {
        super('Game');
    }
    init() {
        this.stats = {
            health: 100,
            fun: 100,
        };
        this.decayRates = {
            health: -5,
            fun: -2,
        };
    }
    create() {
        const bg = this.add.sprite(0, 0, 'backyard').setOrigin(0, 0).setInteractive();
        bg.on('pointerdown', this.placeItem, this);
        this.pet = this.add.sprite(100, 200, 'pet', 0).setInteractive();
        this.pet.depth = 1;
        this.input.setDraggable(this.pet);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.createUi();
        this.createHud();
        this.refreshHud();
        this.timedEventStats = this.time.addEvent({
            delay: 1000,
            repeat: -1,
            callback: () => {
                this.updateStats(this.decayRates);
            },
        });
    }
    createUi() {
        this.appleBtn = this.add.sprite(72, 570, 'apple').setInteractive();
        this.appleBtn.customStatus = { health: 20, fun: 0 };
        this.appleBtn.on('pointerdown', this.pickItem);
        this.candyBtn = this.add.sprite(144, 570, 'candy').setInteractive();
        this.candyBtn.customStatus = { health: -10, fun: 10 };
        this.candyBtn.on('pointerdown', this.pickItem);
        this.toyBtn = this.add.sprite(216, 570, 'toy').setInteractive();
        this.toyBtn.customStatus = { health: 0, fun: 15 };
        this.toyBtn.on('pointerdown', this.pickItem);
        this.rotateBtn = this.add.sprite(288, 570, 'rotate').setInteractive();
        this.rotateBtn.customStatus = { health: 0, fun: 20 };
        this.rotateBtn.on('pointerdown', this.rotatePet);
        this.buttons = [this.appleBtn, this.candyBtn, this.toyBtn, this.rotateBtn];
        this.uiReady();
    }
    rotatePet(pointer) {
        const scene = this.scene;
        if (scene.uiBlocked)
            return;
        scene.uiReady();
        scene.uiBlocked = true;
        this.alpha = 0.5;
        const rotateTween = scene.tweens.add({
            targets: scene.pet,
            duration: 600,
            angle: 720,
            pause: false,
            onComplete: (tween, sprites) => {
                scene.updateStats(this.customStatus);
                scene.uiReady();
            },
        });
    }
    pickItem(pointer) {
        const scene = this.scene;
        if (scene.uiBlocked)
            return;
        scene.uiReady();
        scene.selectedItem = this;
        this.alpha = 0.5;
    }
    uiReady() {
        this.selectedItem = null;
        for (const btn of this.buttons) {
            btn.alpha = 1;
        }
        this.uiBlocked = false;
    }
    placeItem(pointer, localX, localY) {
        if (!this.selectedItem)
            return;
        if (this.uiBlocked)
            return;
        this.uiBlocked = true;
        const newItem = this.add.sprite(localX, localY, this.selectedItem.texture.key);
        const petTween = this.tweens.add({
            targets: this.pet,
            duration: 500,
            x: newItem.x,
            y: newItem.y,
            paused: false,
            onComplete: (tween, sprites) => {
                newItem.destroy();
                this.pet.on('animationcomplete', () => {
                    this.pet.setFrame(0);
                    this.uiReady();
                });
                this.pet.play('funnyFaces');
                this.updateStats(this.selectedItem.customStatus);
            },
        });
    }
    updateStats(statDiff) {
        let isGameOver = false;
        for (const stat of Object.keys(statDiff)) {
            this.stats[stat] += statDiff[stat];
            if (this.stats[stat] < 0) {
                this.stats[stat] = 0;
                isGameOver = true;
            }
        }
        this.refreshHud();
        if (isGameOver) {
            this.gameOver();
        }
    }
    createHud() {
        this.healthText = this.add.text(20, 20, 'Health: ', {
            font: '24px Arial',
            color: '#fff',
        });
        this.funText = this.add.text(170, 20, 'Fun: ', {
            font: '24px Arial',
            color: '#fff',
        });
    }
    refreshHud() {
        this.healthText.setText(`Health: ${this.stats.health}`);
        this.funText.setText(`Fun: ${this.stats.fun}`);
    }
    gameOver() {
        this.uiBlocked = true;
        this.pet.setFrame(4);
        this.time.addEvent({
            delay: 2000,
            repeat: 0,
            callback: () => {
                this.scene.start('Home');
            },
        });
    }
}
