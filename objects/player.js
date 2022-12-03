import { art } from "../art.js"
import { animations } from "../lib/animations.js"
import { colisions } from "../lib/colisions.js"
import { renderer } from "../lib/renderer.js"
import { isBetween, randomInRange, randomInRangeFloat } from "../lib/util.js"

export class Player {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.score = 0

        this.dead = false
        this.hp = 3

        this.bullets = []
        this.shootCooldown = 0

        this.hitCooldown = 0
        this.invincibility = 400
        this.hitAnimation = 0
        this.deathAnimation = 0
        this.regenerationCooldownMax = 4000
        this.regenerationCooldown = this.regenerationCooldownMax / 5

        this.sprite = art.textures.ship

        this.w = this.sprite.w
        this.h = this.sprite.h

        this.xVelocity = 0
        this.xAcceleration = 0.003
        this.maxForwardXVelocity = 0.12
        this.maxBackwardsXVelocity = -0.1

        this.yVelocity = 0
        this.yAcceleration = 0.0025
        this.maxYVelocity = 0.2

        // slow the ship acceleration down when it goes from negative speed
        this.stopper = 0.6

        this.loss = 0.99
    }

    shoot() {
        // if (this.shootCooldown > 0) {
        //     this.shootCooldown -= 1
        // }
        if (!this.shootCooldown) {
            // this.shootCooldown = 100

            this.bullets.push({
                x: this.x + this.w,
                y: this.y + this.h / 2,
                xVelocity: 1,
                yVelocity: this.yVelocity * 0.5
            })
        }
    }

    handleBullets() {
        this.bullets.map((bullet, i) => {
            renderer.drawObject('=', bullet.x, bullet.y)

            if (window.clock % 2 == 0) {
                animations.animate(art.animations.particle, bullet.x, bullet.y)
            }

            bullet.x += bullet.xVelocity
            bullet.y += bullet.yVelocity

            if (bullet.x > window.w + 10)
                this.bullets.splice(i, 1)

            colisions.addRectangleColision({ w: 2, h: 2, x: bullet.x, y: bullet.y }, 'bullet', () => {
                this.bullets.splice(i, 1)
            })
        })
    }

    tick(pointer, keyboard) {
        this.handleBullets()
        if (this.y > window.h) {
            this.y = -this.h
        }
        if (this.y < -this.h) {
            this.y = window.h
        }

        if (this.hitCooldown > 0) {
            this.hitCooldown -= 1
        }
        if (this.hitAnimation > 0) {
            this.hitAnimation -= 1
        }
        if (this.deathAnimation > 0) {
            this.deathAnimation -= 1
        }
        if (this.regenerationCooldown > 0 && this.hp < 3) {
            this.regenerationCooldown -= 1
        }
        if (this.invincibility > 0) {
            this.invincibility -= 1
        }

        this.isTopEngineWorking = false
        this.isBottomEngineWorking = false

        if (this.hp > 0) {
            this.score += 1
            if (this.regenerationCooldown === 0) {
                if (this.hp < 3) {
                    this.hp += 1
                    this.regenerationCooldown = this.regenerationCooldownMax / 5
                }
            }

            if (this.hitAnimation <= 0) {
                if (keyboard.down['w']) {
                    const stopper = this.yVelocity < 0 ? this.stopper : 1

                    if (this.yVelocity > -this.maxYVelocity) {
                        this.isBottomEngineWorking = true
                        this.yVelocity -= this.yAcceleration * stopper
                    }
                }
                if (keyboard.down['s']) {
                    const stopper = this.yVelocity > 0 ? this.stopper : 1

                    if (this.yVelocity < this.maxYVelocity) {
                        this.isTopEngineWorking = true
                        this.yVelocity += this.yAcceleration * stopper
                    }
                }

                if (keyboard.down['a']) {
                    if (this.xVelocity > this.maxBackwardsXVelocity)
                        this.xVelocity -= this.xAcceleration
                }
                if (keyboard.down['d']) {
                    if (this.xVelocity < this.maxForwardXVelocity)
                        this.xVelocity += this.xAcceleration
                }


                // if (keyboard.new[' ']) {
                //     this.shoot()
                // }
            }

            // if very small velocity set it to 0
            if (isBetween(this.xVelocity * 2, -this.xAcceleration, this.xAcceleration))
                this.xVelocity = 0
            if (isBetween(this.yVelocity * 2, -this.yAcceleration, this.yAcceleration))
                this.yVelocity = 0

            // "friction"
            this.xVelocity *= this.loss
            this.yVelocity *= this.loss

            const onColision = (name) => {
                if (this.hitCooldown <= 0 && !this.invincibility) {
                    this.hp -= 1
                    this.regenerationCooldown += this.regenerationCooldownMax / 5

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

                    this.xVelocity *= 0.8
                    this.yVelocity *= 0.8
                }

                this.hitCooldown = 100
                this.hitAnimation = 100
            }

            colisions.addRectangleColision(this, 'ship', onColision)
        }
        if (this.hp === 0 && !this.dead) {
            this.deathAnimation = 10000
            this.dead = true

            for (let i = 0; i < 10; i += 1) {
                animations.animate(art.animations.particle,
                    this.x + randomInRange(0, this.w),
                    this.y + randomInRange(0, this.h),
                    randomInRangeFloat(-1, 1) + this.xVelocity,
                    randomInRangeFloat(-1, 1) + this.yVelocity,
                    {
                        moveSpeed: 10,
                        tickSpeed: 30
                    }
                )
            }
        }

        this.x += this.xVelocity
        this.y += this.yVelocity

        if (this.dead) {
            this.xVelocity = -0.2
        }
    }

    draw() {
        // ship texture + particles
        renderer.drawObject(this.sprite.img, this.x, this.y)

        if (window.clock % 3 == 0 && !this.dead) {
            if (this.isTopEngineWorking)
                animations.animate(art.animations.particle, this.x, this.y + 0, randomInRangeFloat(-2.5, -0.2), randomInRangeFloat(-0.2, 0.2), { tickSpeed: 8, moveSpeed: 10 })
            else
                animations.animate(art.animations.fire, this.x, this.y + 0, randomInRangeFloat(-2.5, -0.2), 0, { tickSpeed: 1, moveSpeed: 2 })

            if (this.hitAnimation > 1) {
                if (window.clock % 10 == 0)
                    animations.animate(art.animations.particle, this.x, this.y + 2, randomInRangeFloat(-2.5, -0.2), randomInRangeFloat(-0.01, 0.01), { tickSpeed: 8, moveSpeed: 5 })
            } else {
                animations.animate(art.animations.particle, this.x, this.y + 2, randomInRangeFloat(-2.5, -0.2), randomInRangeFloat(-0.01, 0.01), { tickSpeed: 8, moveSpeed: 5 })
            }

            if (this.isBottomEngineWorking)
                animations.animate(art.animations.particle, this.x, this.y + 4, randomInRangeFloat(-2.5, -0.2), randomInRangeFloat(-0.2, 0.2), { tickSpeed: 8, moveSpeed: 10 })
            else
                animations.animate(art.animations.fire, this.x, this.y + 4, randomInRangeFloat(-2.5, -0.2), 0, { tickSpeed: 1, moveSpeed: 2 })
        }

        if (this.dead && window.clock % 20 == 0) {
            animations.animate(art.animations.fire, this.x + randomInRange(0, this.w), this.y + randomInRange(0, this.h), randomInRangeFloat(-1, 1), randomInRangeFloat(-1, 1), { tickSpeed: 10, moveSpeed: 20 })
        }

        // ui(hp)

        const hp = ['- - -', '# - -', '# # -', '# # #']

        const healPercentage = (this.regenerationCooldown / this.regenerationCooldownMax * 100)

        let healPercentageStr = ''
        // if (this.hp < 3)
        // healPercentageStr = `${healPercentage.toFixed(1)}%`

        renderer.drawObject(`${hp[this.hp]} ${healPercentageStr}`, this.x, this.y + this.h + 2)


    }
}