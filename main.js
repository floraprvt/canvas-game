import './style.css'
import resources from './src/resources'

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

const draw = () => {
  const sky = resources.images.sky
  if (sky.isLoaded) {
    ctx.drawImage(sky.image, 0, 0)
  }

  const hero = resources.images.hero
  if (hero.isLoaded) {
    ctx.drawImage(hero.image, 0, 0)
  }

  const ground = resources.images.ground
  if (ground.isLoaded) {
    ctx.drawImage(ground.image, 0, 0)
  }

  const shadow = resources.images.shadow
  if (shadow.isLoaded) {
    ctx.drawImage(shadow.image, 0, 0)
  }
}

setInterval(draw, 300)
