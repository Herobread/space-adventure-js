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

export function initMainMenu() {

}

export function mainMenu() {
    const pointer = mouse.info()
    const keyboard = kb.info()
    const pad = gamepad.info()

    const logo = art.textures.logo
    renderer.drawObject(logo.img, window.w / 2 - logo.w / 2, window.h / 3)

    const start = () => {
        window.page = 'game'
    }

    if (pad?.buttons.cross || keyboard.new['Enter'] || keyboard.new[' ']) {
        start()
    }


    ui.button({
        content: 'Play',
        x: window.w / 2 - 3,
        y: window.h / 3 + 8,
        pointer: pointer,
        onClick: start
    })

    tick()
    mouse.showCursor()
}

function tick() {
    colisions.check()

    animations.move()
    animations.tick()
    animations.render()
}