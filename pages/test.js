import { art } from '../art.js'
import { animations } from '../lib/animations.js'
import { colisions } from '../lib/colisions.js'
import { gamepad } from '../lib/gamepad.js'
import { mouse } from '../lib/mouse.js'
import { renderer } from '../lib/renderer.js'
import { shapes } from '../lib/shapes.js'
import { ui } from '../lib/ui.js'
import { randomInRange, randomInRangeFloat } from '../lib/util.js'

export async function test() {
    renderer.drawObject(`Page test.js h=${window.h} w=${window.w}, Frame render time = ${window.frt.toFixed(2)}(${(1000 / window.frt).toFixed(2)})`, 5, 5)
    const pointer = mouse.info()

    if (pointer.down) {
        for (let i = 0; i < 20; i += 1) {
            animations.animate(
                art.animations.particle,
                pointer.x,
                pointer.y,
                randomInRangeFloat(-2, 2),
                randomInRangeFloat(-1, 1),
                {
                    loop: true,
                    tickSpeed: 5,
                    moveSpeed: 1
                }
            )
        }
    } else {
        renderer.drawObject('Click to create a lot of particles!', pointer.x + 3, pointer.y)
    }


    animations.move()
    animations.tick()

    animations.render()

    mouse.showCursor()
}