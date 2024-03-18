import './style.css'

import resources from './src/Resources'
import { Sprite } from './src/Sprite'
import { Vector2 } from './src/Vector2'
import { GameLoop } from './src/GameLoop'
import { Input } from './src/Input'
import { Camera } from './src/Camera'

import { gridCells } from './src/helpers/grid'

import { GameObject } from './src/GameObject'
import { Hero } from './src/objects/Hero/Hero'
import { Rod } from './src/objects/Rod/Rod'

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

const mainScene = new GameObject({ position: new Vector2(0, 0) })

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
})

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
})
mainScene.addChild(groundSprite)

const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero)

const rod = new Rod(gridCells(7), gridCells(6))
mainScene.addChild(rod)

const camera = new Camera()
mainScene.addChild(camera)

mainScene.input = new Input()

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene)
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  skySprite.draw(ctx, 0, 0)

  ctx.save()

  ctx.translate(camera.position.x, camera.position.y)

  mainScene.draw(ctx, 0, 0)

  ctx.restore()
}

const gameLoop = new GameLoop(update, draw)
gameLoop.start()
