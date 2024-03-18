import { GameObject } from '../../GameObject.js'
import { Sprite } from '../../Sprite.js'
import { Vector2 } from '../../Vector2.js'
import resources from '../../Resources.js'
import events from '../../Events.js'

export class Rod extends GameObject {
  constructor(x, y) {
    super({ position: new Vector2(x, y) })

    const sprite = new Sprite({
      resource: resources.images.rod,
      position: new Vector2(0, -5),
    })
    this.addChild(sprite)
  }

  ready() {
    events.on('HERO_POSITION', this, (heroPosition) => {
      const roundedHeroX = Math.round(heroPosition.x)
      const roundedHeroY = Math.round(heroPosition.y)
      if (
        roundedHeroX === this.position.x &&
        roundedHeroY === this.position.y
      ) {
        this.onCollideWithHero()
      }
    })
  }

  onCollideWithHero() {
    this.destroy()

    events.emit('HERO_PICKS_UP_ITEM', {
      image: resources.images.rod,
      position: this.position,
    })
  }
}
