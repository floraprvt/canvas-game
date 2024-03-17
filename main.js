import './style.css'

import resources from './src/Resources'
import { Sprite } from './src/Sprite'
import { Vector2 } from './src/Vector2'
import { GameLoop } from './src/GameLoop'
import { Input } from './src/Input'

import { gridCells } from './src/helpers/grid'

import { GameObject } from './src/GameObject'
import { Hero } from './src/objects/Hero/Hero'

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

const mainScene = new GameObject({ position: new Vector2(0, 0) })

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
})
mainScene.addChild(skySprite)

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
})
mainScene.addChild(groundSprite)

const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero)

mainScene.input = new Input()

const update = (delta) => {
  mainScene.stepEntry(delta, mainScene)
}

const draw = () => {
  mainScene.draw(ctx, 0, 0)
}

const gameLoop = new GameLoop(update, draw)
gameLoop.start()
