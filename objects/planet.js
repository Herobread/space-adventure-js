import { art } from "../art.js"
import { renderer } from "../lib/renderer.js"
import { randomInRange } from "../lib/util.js"

export class Planet {
    constructor(x, y) {
        this.x = x

        this.xVelocity = -0.1
        this.yVelocity = 0

        const max = art.textures.planets.length
        let sprite = art.textures.planets[randomInRange(0, max)]

        this.w = sprite.w
        this.h = sprite.h
        this.sprite = sprite.img

        if (y !== 'auto')
            this.y = y
        else
            this.y = randomInRange(5, window.h - this.h)
    }

    setDeleter(deleter) {
        this.deleter = () => {
            deleter()
        }
    }

    tick() {
        this.x += this.xVelocity

        if (this.x < -this.w) {
            this.deleter()
        }
    }

    draw() {
        console.log(this.sprite, this.x, this.y)
        renderer.drawTransparentObject(this.sprite, this.x, this.y)
    }
}