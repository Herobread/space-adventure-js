import { animations } from "../lib/animations"
import { kb } from "../lib/keyboard"
import { mouse } from "../lib/mouse"
import { randomInRange, randomInRangeFloat } from "../lib/util"
import { colisions } from "../lib/colisions"
import { Player } from "../objects/player"
import { Asteroid } from "../objects/asteroid"
import { Particle } from "../objects/particle"
import { renderer } from "../renderer"
import { Ufo } from "../objects/ufo"
import { gamepad } from "../lib/gamepad"
import { Planet } from "../objects/planet"
import { sounds } from "../lib/sounds"

window.formatedScores = "Loading scores"

let isPaused = false

let asteroids: Asteroid[] = []
let particles: Particle[] = []
let enemies: Ufo[] = []
let planets: Planet[] = []

let player: Player

let str = ""

let difficultyStart = 0.7
let difficulty = difficultyStart

let ufoSpawnCooldown = 6000
let planetSpawnCooldown = 1000

let asteroidBeltSpawnCooldown = 3000
let asteroidBeltSpawnCooldownMax = 15000
let asteroidBeltCooldown = 0
let asteroidBeltCooldownMax = 3000

export function initGame() {
	player = new Player(window.w / 3, window.h / 2)
}

export async function game() {
	const pointer = mouse.info()
	const keyboard = kb.info()
	let pad = gamepad.info()

	if (Object.keys(keyboard.down).length) {
		pad = null
	}

	if (!isPaused) {
		if (player.score % 2500 === 0) {
			sounds.play("bigScore")
		}

		if (asteroidBeltSpawnCooldown > 0) {
			asteroidBeltSpawnCooldown -= 1
		} else {
			sounds.play("asteroidBeltAlert")
			asteroidBeltCooldown = asteroidBeltCooldownMax
			asteroidBeltSpawnCooldown = asteroidBeltSpawnCooldownMax
		}

		if (asteroidBeltCooldown > 0) {
			asteroidBeltCooldown -= 1
		}

		if (ufoSpawnCooldown > 0) {
			ufoSpawnCooldown -= 1
		}

		if (planetSpawnCooldown > 0) {
			planetSpawnCooldown -= 1
		} else {
			planets.push(new Planet(window.w, "auto"))
			planetSpawnCooldown = 60000
		}

		if (difficulty <= 1.4) {
			difficulty += 0.00004
		}
	}

	particles.forEach((particle, i) => {
		if (!isPaused) {
			particle.setDeleter(() => {
				particles.splice(i, 1)
			})
			particle.tick()
		}

		particle.draw()
	})

	planets.forEach((planet, i) => {
		if (!isPaused) {
			planet.setDeleter(() => {
				planets.splice(i, 1)
				planetSpawnCooldown = 6000
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
		if (window.clock % Math.floor(201 / difficulty) == 0) {
			asteroids.push(
				new Asteroid(
					window.w,
					randomInRange(0, window.h - 6),
					randomInRangeFloat(-0.5, -0.2) * difficulty,
					0
				)
			)
		}
		if (asteroidBeltCooldown) {
			if ((window.clock % Math.floor(201 / difficulty)) - 100 == 0) {
				asteroids.push(
					new Asteroid(
						window.w,
						randomInRange(0, window.h - 6),
						randomInRangeFloat(-0.5, -0.2) * difficulty,
						0
					)
				)
				asteroids.push(
					new Asteroid(
						window.w,
						randomInRange(0, window.h - 6),
						randomInRangeFloat(-0.5, -0.2) * difficulty,
						0
					)
				)
			}
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

	if (!isPaused) {
		if (window.clock % 40 == 0) {
			const particle = new Particle(
				window.w,
				randomInRange(0, window.h),
				randomInRangeFloat(-0.4, -0.2) * difficulty,
				0
			)

			particles.push(particle)
		}
		if ((window.clock % 40) - 20 == 0) {
			const particle = new Particle(
				window.w,
				randomInRange(0, window.h),
				randomInRangeFloat(-0.7, -0.4) * difficulty,
				0
			)

			particles.push(particle)
		}

		player.tick(pointer, keyboard, pad)
	}

	player.draw(isPaused)

	if (player.dead) {
		str = "You died!"
		renderer.drawObject(
			`${str}`,
			window.w / 2 - str.length / 2,
			window.h / 2 - 2
		)
		str = `Score: ${player.score}`
		renderer.drawObject(
			`${str}`,
			window.w / 2 - str.length / 2,
			window.h / 2
		)
		str = "Press Enter to respawn"
		if (pad) {
			str = "Press triangle to respawn"
		}
		renderer.drawObject(
			`${str}`,
			window.w / 2 - str.length / 2,
			window.h / 2 + 2
		)

		if (keyboard.new["Enter"] || pad?.buttons.triangle) {
			player = new Player(window.w / 3, window.h / 2)
			difficulty = difficultyStart
		}

		renderer.drawObject(window.formatedScores, 10, 10)
	} else {
		if (keyboard.new["Escape"]) {
			// todo: add option button from controller
			isPaused = !isPaused
		}

		str = `${player.score}`
		renderer.drawObject(
			`${str}`,
			window.w / 2 - str.length / 2,
			window.h - 3
		)
	}

	if (isPaused) {
		str = `Game is paused`
		renderer.drawObject(
			`${str}`,
			window.w / 2 - str.length / 2,
			window.h / 2 - 1
		)
		str = `Press escape to unpause`
		renderer.drawObject(
			`${str}`,
			window.w / 2 - str.length / 2,
			window.h / 2 + 1
		)
	}

	if (asteroidBeltCooldown) {
		str = "Asteroid cluster detected!"
		renderer.drawObject(str, window.w / 2 - str.length / 2, window.h - 1)
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
