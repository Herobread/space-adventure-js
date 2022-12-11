import { animations } from '../lib/animations.js'
import { kb } from '../lib/keyboard.js'
import { mouse } from '../lib/mouse.js'
import { randomInRange } from '../lib/util.js'
import { Block } from '../objects/block.js'
import { colisions } from '../lib/colisions.js'
import { renderer } from '../lib/renderer.js'
import { art } from '../art.js'
import { ui } from '../lib/ui.js'
import { gamepad } from '../lib/gamepad.js'
import { getBestScores, getScores, submitScore } from '../firebase/scoreboard.js'

export async function initScores() {
    const scores = await getScores()

    console.log('first')

    console.log(scores)
}

export function scores() {
    const pointer = mouse.info()
    const keyboard = kb.info()
    const pad = gamepad.info()

    const onClick = async () => {
        await submitScore(`player${randomInRange(0, 100)}`, randomInRange(0, 3000))
    }

    ui.button({
        content: 'add random score record',
        x: 10,
        y: 30,
        pointer: pointer,
        onClick: onClick
    })

    ui.button({
        content: 'get all',
        x: 10,
        y: 20,
        pointer: pointer,
        onClick: async () => {
            const scores = await getScores()
            console.log(scores)
        }
    })

    ui.button({
        content: 'get query',
        x: 10,
        y: 40,
        pointer: pointer,
        onClick: async () => {
            const scores = await getBestScores()
            console.log(scores)
        }
    })

    renderer.drawObject('aaaaaaa', 10, 10)

    tick()
    mouse.showCursor()
}

function tick() {
    colisions.check()

    animations.move()
    animations.tick()
    animations.render()
}