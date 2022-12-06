import { renderer } from "../lib/renderer.js"
import { cropImg, randomInRange, randomInRangeFloat } from "../lib/util.js"
import { art } from "../art.js"
import { animations } from "../lib/animations.js"
import { colisions } from "../lib/colisions.js"

export class Asteroid {
    constructor(x, y, xVelocity, yVelocity) {
        this.x = x
        this.y = y

        this.hp = 1
        this.dead = false

        this.asteroidHitCooldown = 10
        this.bulletHitCooldown = 10

        const randomAsteroid = randomInRange(0, art.textures.asteroids.length - 1)
        this.sprite = art.textures.asteroids[randomAsteroid]

        this.w = this.sprite.w
        this.h = this.sprite.h

        this.xVelocity = xVelocity
        this.yVelocity = yVelocity

        this.destruction = { sprites: art.animations.explosion.map(cropImg, this.w, this.h) }

        this.deleter = () => { }
    }

    setDeleter(deleter) {
        this.deleter = () => {
            for (let i = 0; i < 10; i += 1) {
                animations.animate(art.animations.particle, this.x + randomInRange(0, this.w), this.y + randomInRange(0, this.h), this.xVelocity, this.yVelocity, {
                    tickSpeed: 10,
                    moveSpeed: 1,
                })
            }


            deleter()
        }
    }

    tick() {
        if (this.asteroidHitCooldown > 0) {
            this.asteroidHitCooldown -= 1
        }
        if (this.bulletHitCooldown > 0) {
            this.bulletHitCooldown -= 1
        }

        this.x += this.xVelocity
        this.y += this.yVelocity

        if (this.x < -this.w || this.x > window.w + 20) {
            this.deleter()
        }

        const onColision = (reason) => {
            if (!this.asteroidHitCooldown) {
                this.hp -= 1
                this.asteroidHitCooldown = 20

                if (this.hp === 0) {
                    if (!this.dead) {
                        // animations.animate(this.destruction, this.x, this.y, this.xVelocity, this.yVelocity, {
                        //     tickSpeed: 900
                        // })
                        this.dead = true
                    }
                }

                if (reason !== 'bullet') {
                    // this.xVelocity *= 0.5
                    if (this.xVelocity < 0.05)
                        this.xVelocity = randomInRangeFloat(0.05, 0.1)

                    this.yVelocity = randomInRangeFloat(-0.08, 0.08)
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

            if (reason == 'bullet' && !this.bulletHitCooldown) {
                this.deleter()
                this.bulletHitCooldown = 100
                for (let i = 0; i < 15; i += 1) {
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