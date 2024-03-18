class Resources {
  constructor() {
    this.toLoad = {
      sky: '/sprites/sky.png',
      hero: '/sprites/hero-sheet.png',
      ground: '/sprites/ground.png',
      shadow: '/sprites/shadow.png',
      rod: '/sprites/rod.png',
    }

    this.images = {}

    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image()
      img.src = this.toLoad[key]
      this.images[key] = {
        image: img,
        isLoaded: false,
      }
      img.onload = () => {
        this.images[key].isLoaded = true
      }
    })
  }
}

export default new Resources()
