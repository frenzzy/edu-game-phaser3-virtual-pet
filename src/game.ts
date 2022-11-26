import { BootScene } from './scenes/BootScene.js'
import { LoadingScene } from './scenes/LoadingScene.js'
import { HomeScene } from './scenes/HomeScene.js'
import { GameScene } from './scenes/GameScene.js'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: [BootScene, LoadingScene, HomeScene, GameScene],
  title: 'Virtual Pet',
  pixelArt: false,
  backgroundColor: 'fff',
})
