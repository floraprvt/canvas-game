import './style.css'
import resources from './src/Resources'
import { Sprite } from './src/Sprite'
import { Vector2 } from './src/Vector2'
import { GameLoop } from './src/GameLoop'
import { Input, DOWN, UP, LEFT, RIGHT } from './src/Input'

import { gridCells, isSpaceFree } from './src/helpers/grid'
import { moveTowards } from './src/helpers/moveTowards'

import { walls } from './src/levels/level1'

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
  position: new Vector2(gridCells(6), gridCells(5)),
})

const heroDestinationPosition = hero.position.duplicate()

const input = new Input()

const update = () => {
  const distance = moveTowards(hero.position, heroDestinationPosition, 1)
  const hasArrived = distance <= 1
  if (hasArrived) tryMove()
}

const tryMove = () => {
  if (!input.direction) return

  let nextX = heroDestinationPosition.x
  let nextY = heroDestinationPosition.y
  const gridSize = 16

  switch (input.direction) {
    case LEFT:
      nextX -= gridSize
      hero.frame = 9
      break
    case RIGHT:
      nextX += gridSize
      hero.frame = 3
      break
    case UP:
      nextY -= gridSize
      hero.frame = 6
      break
    case DOWN:
      nextY += gridSize
      hero.frame = 0
      break
  }

  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestinationPosition.x = nextX
    heroDestinationPosition.y = nextY
  }
}

const draw = () => {
  skySprite.drawImage(ctx, 0, 0)
  groundSprite.drawImage(ctx, 0, 0)

  const heroOffset = new Vector2(-8, -21)
  const heroPosX = hero.position.x + heroOffset.x
  const heroPosY = hero.position.y + heroOffset.y

  shadow.drawImage(ctx, heroPosX, heroPosY)
  hero.drawImage(ctx, heroPosX, heroPosY)
}

const gameLoop = new GameLoop(update, draw)
gameLoop.start()
