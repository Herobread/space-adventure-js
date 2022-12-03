import { animations } from '../lib/animations.js'
import { kb } from '../lib/keyboard.js'
import { mouse } from '../lib/mouse.js'
import { randomInRange, randomInRangeFloat } from '../lib/util.js'
import { Block } from '../objects/block.js'
import { colisions } from '../lib/colisions.js'
import { Player } from '../objects/player.js'
import { Asteroid } from '../objects/asteroid.js'
import { Particle } from '../objects/particle.js'
import { renderer } from '../lib/renderer.js'

let asteroids = []
let particles = []

let player

let difficultyStart = 0.7
let difficulty = difficultyStart

export function initGame() {
    player = new Player(window.w / 3, window.h / 2)
}

export function game() {
    const pointer = mouse.info()
    const keyboard = kb.info()

    let str = ''

    if (difficulty <= 1.3) {
        difficulty += 0.00004
    }

    player.tick(pointer, keyboard)
    player.draw()

    asteroids.forEach((asteroid, i) => {
        asteroid.setDeleter(() => {
            asteroids.splice(i, 1)
            console.log('deleting', i)
        })
        asteroid.tick()
        asteroid.draw()
    })

    if (window.clock % parseInt(201 / difficulty) == 0) {
        asteroids.push(new Asteroid(window.w, randomInRange(0, window.h - 6), randomInRangeFloat(-0.5, -0.2) * difficulty, 0))
    }

    particles.forEach(particle => {
        particle.tick()
        particle.draw()
    })

    if (window.clock % 40 == 0) {
        particles.push(new Particle(window.w, randomInRange(0, window.h), randomInRangeFloat(-0.4, -0.2) * difficulty, 0))
    }
    if (window.clock % 40 - 20 == 0) {
        particles.push(new Particle(window.w, randomInRange(0, window.h), randomInRangeFloat(-0.7, -0.4) * difficulty, 0))
    }

    if (player.dead) {
        str = 'You died!'
        renderer.drawObject(`${str}`, window.w / 2 - str.length / 2, window.h / 2 - 2)
        str = `Score: ${player.score}`
        renderer.drawObject(`${str}`, window.w / 2 - str.length / 2, window.h / 2)
        str = 'Press Enter to respawn'
        renderer.drawObject(`${str}`, window.w / 2 - str.length / 2, window.h / 2 + 2)

        if (keyboard.new['Enter']) {
            player = new Player(window.w / 3, window.h / 2)
            difficulty = difficultyStart
        }
    } else {
        str = `${player.score}`
        renderer.drawObject(`${str}`, window.w / 2 - str.length / 2, window.h - 3)
    }

    tick()
    mouse.showCursor()
}

function tick() {
    colisions.check()

    animations.move()
    animations.tick()
    animations.render()
}