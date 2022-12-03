import { renderer } from "../lib/renderer.js"
import { randomInRange, randomInRangeFloat } from "../lib/util.js"
import { art } from "../art.js"
import { animations } from "../lib/animations.js"
import { colisions } from "../lib/colisions.js"

export class Asteroid {
    constructor(x, y, xVelocity, yVelocity) {
        this.x = x
        this.y = y

        this.hp = 3

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
        this.deleter = () => {
            animations.animate(art.animations.particle, this.x + randomInRange(0, this.w), this.y + randomInRange(0, this.h))

            deleter()
        }
    }

    tick() {
        if (this.hitCooldown > 0) {
            this.hitCooldown -= 1
        }
        this.x += this.xVelocity
        this.y += this.yVelocity

        if (this.x < -this.w || this.x > window.w + 20) {
            this.deleter()
        }

        const onColision = (reason) => {
            if (!this.hitCooldown) {
                this.hp -= 1
                this.hitCooldown = 20

                if (reason == 'ship' || reason == 'asteroid') {
                    // this.xVelocity *= 0.5
                    if (this.xVelocity < 0.05)
                        this.xVelocity = randomInRangeFloat(0.05, 0.1)

                    this.yVelocity = randomInRangeFloat(-0.08, 0.08)
                }

                if (reason == 'bullet') {
                    this.deleter()
                    for (let i = 0; i < 10; i += 1) {
                        animations.animate(art.animations.particle,
                            this.x + randomInRange(0, this.w),
                            this.y + randomInRange(0, this.h),
                            randomInRangeFloat(-0.6, 0.6) + this.xVelocity,
                            randomInRangeFloat(-0.6, 0.6) + this.yVelocity,
                            {
                                moveSpeed: 10,
                                tickSpeed: 30
                            }
                        )
                    }
                }

                if (reason == 'asteroid') {
                    animations.animate(art.animations.particle,
                        this.x + randomInRange(0, this.w),
                        this.y + randomInRange(0, this.h),
                        randomInRangeFloat(-0.6, 0.6) + this.xVelocity,
                        randomInRangeFloat(-0.6, 0.6) + this.yVelocity,
                        {
                            moveSpeed: 10,
                            tickSpeed: 30
                        }
                    )
                }
            }
        }

        colisions.addRectangleColision(this, 'asteroid', onColision)
    }

    draw() {
        renderer.drawObject(this.sprite.img, this.x, this.y)
    }
}