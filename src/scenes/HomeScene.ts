export class HomeScene extends Phaser.Scene {
  constructor() {
    super('Home')
  }
  create() {
    const gameW = Number(this.sys.game.config.width)
    const gameH = Number(this.sys.game.config.height)
    const bg = this.add.sprite(0, 0, 'backyard').setOrigin(0, 0).setInteractive()
    const text = this.add.text(gameW / 2, gameH / 2, '🐶 VIRTUAL PET', {
      font: '40px Arial',
      color: '#fff',
    })
    text.setOrigin(0.5, 0.5)
    text.depth = 1
    const textsBg = this.add.graphics()
    const padding = 10
    textsBg.fillStyle(0x000000, 0.7),
      textsBg.fillRect(
        gameW / 2 - text.width / 2 - padding,
        gameH / 2 - text.height / 2 - padding,
        text.width + padding * 2,
        text.height + padding * 2,
      )
    bg.on('pointerdown', () => {
      this.scene.start('Game')
    })
  }
}
