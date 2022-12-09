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
import { Ufo } from '../objects/ufo.js'
import { gamepad } from '../lib/gamepad.js'
import { Planet } from '../objects/planet.js'

let isPaused = false

let asteroids = []
let particles = []
let enemies = []
let planets = []

let player

let str = ''

let difficultyStart = 0.7
let difficulty = difficultyStart

let ufoSpawnCooldown = 6000
let planetSpawnCooldown = 1000

export function initGame() {
    player = new Player(window.w / 3, window.h / 2)
}

export function game() {
    const pointer = mouse.info()
    const keyboard = kb.info()
    let pad = gamepad.info()

    if (Object.keys(keyboard.down).length) {
        pad = null
    }

    if (!isPaused) {
        if (ufoSpawnCooldown > 0) {
            ufoSpawnCooldown -= 1
        }

        if (planetSpawnCooldown > 0) {
            planetSpawnCooldown -= 1
        } else {
            planets.push(new Planet(window.w, 'auto'))
            planetSpawnCooldown = 9000
        }

        if (difficulty <= 1.3) {
            difficulty += 0.00004
        }
    }


    planets.forEach((planet, i) => {
        if (!isPaused) {
            planet.setDeleter(() => {
                planets.splice(i, 1)
                planetSpawnCooldown = 1400
            })
            planet.tick()
        }
        planet.draw()
    })

    asteroids.forEach((asteroid, i) => {
        if (!isPaused) {

            asteroid.setDeleter(() => {
                asteroids.splice(i, 1)
            })
            asteroid.tick()
        }
        asteroid.draw()
    })

    if (!isPaused) {
        if (window.clock % parseInt(201 / difficulty) == 0) {
            asteroids.push(new Asteroid(window.w, randomInRange(0, window.h - 6), randomInRangeFloat(-0.5, -0.2) * difficulty, 0))
        }
    }

    enemies.forEach((enemy, i) => {
        if (!isPaused) {
            enemy.setDeleter(() => {
                enemies.splice(i, 1)
                ufoSpawnCooldown = 8000
            })
            enemy.tick(player)
        }
        enemy.draw()
    })

    if (!ufoSpawnCooldown && !enemies.length) {
        enemies.push(new Ufo(window.w, randomInRange(0, window.h)))
    }

    particles.forEach(particle => {
        if (!isPaused)
            particle.tick()

        particle.draw()
    })

    if (!isPaused) {
        if (window.clock % 40 == 0) {
            particles.push(new Particle(window.w, randomInRange(0, window.h), randomInRangeFloat(-0.4, -0.2) * difficulty, 0))
        }
        if (window.clock % 40 - 20 == 0) {
            particles.push(new Particle(window.w, randomInRange(0, window.h), randomInRangeFloat(-0.7, -0.4) * difficulty, 0))
        }

        player.tick(pointer, keyboard, pad)
    }

    player.draw(isPaused)

    if (player.dead) {
        str = 'You died!'
        renderer.drawObject(`${str}`, window.w / 2 - str.length / 2, window.h / 2 - 2)
        str = `Score: ${player.score}`
        renderer.drawObject(`${str}`, window.w / 2 - str.length / 2, window.h / 2)
        str = 'Press Enter to respawn'
        if (pad) {
            str = 'Press triangle to respawn'
        }
        renderer.drawObject(`${str}`, window.w / 2 - str.length / 2, window.h / 2 + 2)

        if (keyboard.new['Enter'] || pad?.buttons.triangle) {
            player = new Player(window.w / 3, window.h / 2)
            difficulty = difficultyStart
        }
    } else {
        if (keyboard.new['Escape']) {// todo: add option button from controller
            isPaused = !isPaused
        }

        str = `${player.score}`
        renderer.drawObject(`${str}`, window.w / 2 - str.length / 2, window.h - 3)
    }

    if (isPaused) {
        str = `Game is paused`
        renderer.drawObject(`${str}`, window.w / 2 - str.length / 2, window.h / 2 - 1)
        str = `Press escape to unpause`
        renderer.drawObject(`${str}`, window.w / 2 - str.length / 2, window.h / 2 + 1)
    }

    tick()
    mouse.showCursor()
}

function tick() {
    colisions.check()

    if (!isPaused) {
        animations.move()
        animations.tick()
    }
    animations.render()
}