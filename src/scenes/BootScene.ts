export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot')
  }
  preload() {
    this.load.image('logo', 'assets/images/rubber_duck.png')
  }

  create() {
    this.scene.start('Loading')
  }
}
