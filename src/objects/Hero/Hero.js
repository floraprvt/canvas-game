import { GameObject } from '../../GameObject'
import { Vector2 } from '../../Vector2'
import { Sprite } from '../../Sprite'
import { DOWN, UP, LEFT, RIGHT } from '../../Input'
import { Animations } from '../../Animations'
import { FrameIndexPattern } from '../../FrameIndexPattern'
import resources from '../../Resources'
import events from '../../Events'

import { moveTowards } from '../../helpers/moveTowards'
import { isSpaceFree } from '../../helpers/grid'

import { walls } from '../../levels/level1'

import {
  WALK_DOWN,
  WALK_UP,
  WALK_LEFT,
  WALK_RIGHT,
  STAND_DOWN,
  STAND_UP,
  STAND_LEFT,
  STAND_RIGHT,
} from './heroAnimations'

export class Hero extends GameObject {
  constructor(x, y) {
    super({ position: new Vector2(x, y) })

    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    })
    this.addChild(shadow)

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      position: new Vector2(-8, -20),
      animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
      }),
    })
    this.addChild(this.body)

    this.facingDirection = DOWN
    this.destinationPosition = this.position.duplicate()
  }

  step(delta, root) {
    const distance = moveTowards(this.position, this.destinationPosition, 1)
    const hasArrived = distance <= 1
    if (hasArrived) this.tryMove(root)

    this.tryEmitPosition()
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) return
    this.lastX = this.position.x
    this.lastY = this.position.y

    events.emit('HERO_POSITION', this.position)
  }

  tryMove(root) {
    const { input } = root

    if (!input.direction) {
      switch (this.facingDirection) {
        case LEFT:
          this.body.animations.play('standLeft')
          break
        case RIGHT:
          this.body.animations.play('standRight')
          break
        case UP:
          this.body.animations.play('standUp')
          break
        case DOWN:
          this.body.animations.play('standDown')
          break
      }

      return
    }

    let nextX = this.destinationPosition.x
    let nextY = this.destinationPosition.y
    const gridSize = 16

    switch (input.direction) {
      case LEFT:
        nextX -= gridSize
        this.body.animations.play('walkLeft')
        break
      case RIGHT:
        nextX += gridSize
        this.body.animations.play('walkRight')
        break
      case UP:
        nextY -= gridSize
        this.body.animations.play('walkUp')
        break
      case DOWN:
        nextY += gridSize
        this.body.animations.play('walkDown')
        break
    }
    this.facingDirection = input.direction ?? this.facingDirection

    if (isSpaceFree(walls, nextX, nextY)) {
      this.destinationPosition.x = nextX
      this.destinationPosition.y = nextY
    }
  }
}
