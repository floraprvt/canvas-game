import './style.css'
import resources from './src/Resources'
import { Sprite } from './src/Sprite'
import { Vector2 } from './src/Vector2'
import { GameLoop } from './src/GameLoop'
import { Input, DOWN, UP, LEFT, RIGHT } from './src/Input'

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
})

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
})

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
})

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
})
const heroPos = new Vector2(16 * 6, 16 * 5)

const input = new Input()

const update = () => {
  if (input.direction) {
    switch (input.direction) {
      case LEFT:
        heroPos.x -= 1
        hero.frame = 9
        break
      case RIGHT:
        heroPos.x += 1
        hero.frame = 3
        break
      case UP:
        heroPos.y -= 1
        hero.frame = 6
        break
      case DOWN:
        heroPos.y += 1
        hero.frame = 0
        break
    }
  }
}

const draw = () => {
  skySprite.drawImage(ctx, 0, 0)
  groundSprite.drawImage(ctx, 0, 0)

  const heroOffset = new Vector2(-8, -21)
  const heroPosX = heroPos.x + heroOffset.x
  const heroPosY = heroPos.y + heroOffset.y

  shadow.drawImage(ctx, heroPosX, heroPosY)
  hero.drawImage(ctx, heroPosX, heroPosY)
}

const gameLoop = new GameLoop(update, draw)
gameLoop.start()
