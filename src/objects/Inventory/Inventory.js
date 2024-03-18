import { GameObject } from '../../GameObject.js'
import { Vector2 } from '../../Vector2.js'
import { Sprite } from '../../Sprite.js'
import resources from '../../Resources.js'
import events from '../../Events.js'

export class Inventory extends GameObject {
  constructor() {
    super({ position: new Vector2(0, 1) })

    this.items = [
      { id: 0, resource: resources.images.rod },
      { id: 1, resource: resources.images.rod },
    ]

    events.on('HERO_PICKS_UP_ITEM', this, () => {
      this.items.push({
        id: this.items.length,
        resource: resources.images.rod,
      })
      this.renderInventory()
    })

    this.renderInventory()
  }

  renderInventory() {
    this.children.forEach((child) => child.destroy())

    this.items.forEach((item, index) => {
      const sprite = new Sprite({
        resource: item.resource,
        position: new Vector2(index * 12, 0),
      })
      this.addChild(sprite)
    })
  }
}
