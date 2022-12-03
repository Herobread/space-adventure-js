import { renderer } from "../lib/renderer.js"
import { randomInRange, randomInRangeFloat } from "../lib/util.js"
import { art } from "../art.js"
import { animations } from "../lib/animations.js"
import { colisions } from "../lib/colisions.js"

export class Asteroid {
    constructor(x, y, xVelocity, yVelocity) {
        this.x = x
        this.y = y

        this.hitCooldown = 100

        const randomAsteroid = randomInRange(0, art.textures.asteroids.length - 1)
        this.sprite = art.textures.asteroids[randomAsteroid]

        this.w = this.sprite.w
        this.h = this.sprite.h

        this.xVelocity = xVelocity
        this.yVelocity = yVelocity

        this.deleter = () => { }
    }

    setDeleter(deleter) {
        this.deleter = deleter
    }

    tick() {
        if (this.hitCooldown > 0) {
            this.hitCooldown -= 1
        }
        this.x += this.xVelocity
        this.y += this.yVelocity

        if (this.x < -this.w) {
            this.deleter()
        }

        const onColision = (reason) => {
            if (this.hitCooldown > 0) {
                this.yVelocity = randomInRangeFloat(-0.5, 0.5)

                if (reason == 'ship') {
                    this.xVelocity *= 0.2
                }

                if (reason == 'asteroid') {
                    this.xVelocity += 0.02
                }

                if (reason == 'bullet') {
                    this.xVelocity = -this.xVelocity
                }
            }
        }

        colisions.addRectangleColision(this, 'asteroid', onColision)
    }

    draw() {
        // if (window.clock % 100 === 0) {
        //     animations.animate(art.animations.smallParticle,
        //         this.x + randomInRange(0, this.w),
        //         this.y + randomInRange(1, this.h - 1),
        //         randomInRangeFloat(0.1, 0.2),
        //         randomInRangeFloat(-0.1, 0.1),
        //         {
        //             tickSpeed: 50,
        //             moveSpeed: 20
        //         }
        //     )
        // }

        renderer.drawObject(this.sprite.img, this.x, this.y)
    }
}