export const LEFT = 'LEFT'
export const RIGHT = 'RIGHT'
export const UP = 'UP'
export const DOWN = 'DOWN'

export class Input {
  constructor() {
    this.heldDirections = []

    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.onArrowPressed(UP)
          break
        case 'ArrowDown':
        case 'KeyS':
          this.onArrowPressed(DOWN)
          break
        case 'ArrowLeft':
        case 'KeyA':
          this.onArrowPressed(LEFT)
          break
        case 'ArrowRight':
        case 'KeyD':
          this.onArrowPressed(RIGHT)
          break
      }
    })

    document.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          this.onArrowReleased(UP)
          break
        case 'ArrowDown':
        case 'KeyS':
          this.onArrowReleased(DOWN)
          break
        case 'ArrowLeft':
        case 'KeyA':
          this.onArrowReleased(LEFT)
          break
        case 'ArrowRight':
        case 'KeyD':
          this.onArrowReleased(RIGHT)
          break
      }
    })
  }

  get direction() {
    return this.heldDirections[0]
  }

  onArrowPressed(direction) {
    if (!this.heldDirections.includes(direction)) {
      this.heldDirections.unshift(direction)
    }
  }

  onArrowReleased(direction) {
    if (this.heldDirections.includes(direction)) {
      this.heldDirections = this.heldDirections.filter((d) => d !== direction)
    }
  }
}
