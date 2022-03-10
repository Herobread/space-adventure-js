import { renderer } from "../renderer.js"
import { art } from "../art.js"
import { center, checkIfPointInRectangle, cropImg, randomInRange } from "../util.js"

let menu = 1
// window.fps = 60
let player = {
    'x': 10,
    'y': 10,
    'hp': 3,
    'distance': 0,
    'hitCooldown': 0
}
let paused = 0
let pauseCooldown = 30

export function game() {
    input()

    if (paused) {
        pauseMenu()
    } else {
        ambient()

        if (alive)
            bullet()

        asteroid()

        ship()

        animation()

        checkColisions()

        clearColisions()

        ui()
    }
}

let bulletCooldown = 0

function pauseMenu() {
    let temp = 'Paused'

    renderer.drawObject(temp, center(temp.length), parseInt(window.h / 2) - 1)

    temp = 'f - main menu, esc - unpause'
    renderer.drawObject(temp, center(temp.length), parseInt(window.h / 2) + 1)
}

function ui() {
    // hotbar
    let temp = ' '

    if (!alive) {
        temp = `You died!`
        renderer.drawObject(temp, center(temp.length), window.h / 2 - 2)

        temp = `Your score is ${player.distance}`
        renderer.drawObject(temp, center(temp.length), window.h / 2)

        temp = `Enter - restart, esc - exit`
        renderer.drawObject(temp, center(temp.length), window.h - 1)
    } else {
        temp = `${player.distance}`
        renderer.drawObject(temp, center(temp.length), window.h - 3)

        temp = ' '
        if (player.hitCooldown > 0)
            temp = '**       **'
        renderer.drawObject(temp, center(temp.length), window.h - 1)

        if (player.hp === 3)
            temp = '# # #'
        else if (player.hp === 2)
            temp = '# # -'
        else if (player.hp === 1)
            temp = '# - -'
        else if (player.hp === 0)
            temp = '- - -'

        renderer.drawObjectWithoutSpace(temp, center(temp.length), window.h - 1)
    }
}

let alive = true

function ship() {
    if (player.hp <= 0 && alive) {
        addAnimation(art.animations.explosion, parseInt(player.x), parseInt(player.y), -2, 0, art.ship.width, art.ship.height)
        alive = false
    }
    if (alive) {
        player.distance += 1
        trail()
        renderer.drawObject(art.ship.img, parseInt(player.x), parseInt(player.y))
        addColisionObject(art.ship.img, parseInt(player.x), parseInt(player.y), 1)
    }
}

function input() {
    if (window.pressedKeys['w'] && player.y - 0.4 > 0) {
        if (!paused)
            player.y -= 0.5
    }
    if (window.pressedKeys['s'] && player.y + 0.4 < window.h - 6) {
        if (!paused)
            player.y += 0.5
    }
    if (window.pressedKeys['a'] && player.x - 0.5 > 0) {
        if (!paused)
            player.x -= 0.5
    }
    if (window.pressedKeys['d'] && player.x + 0.5 < window.w - 6) {
        if (!paused)
            player.x += 0.5
    }
    if (window.pressedKeys[' '] && bulletCooldown <= 0 && alive) {
        bullets.push({
            x: parseInt(player.x + 6),
            y: parseInt(player.y + 3)
        })
        bulletCooldown = 15
    }

    if (alive) {
        pauseCooldown -= 1
        if (window.pressedKeys['Escape'] && pauseCooldown < 0) {
            if (paused) {
                paused = false
            } else {
                paused = true
            }
            pauseCooldown = 10
        }
        if (window.pressedKeys['f'] && paused) {
            window.page = 'mainMenu'
        }
    } else {
        if (window.pressedKeys['Escape']) {
            reset()
            window.page = 'mainMenu'
        }
        if (window.pressedKeys['Enter']) {
            reset()
        }
    }

    bulletCooldown -= 1
}

function reset() {
    menu = 1
    player = {
        'x': 10,
        'y': window.h / 2 - 3,
        'hp': 3,
        'distance': 0,
        'hitCooldown': 100
    }
    paused = 0
    pauseCooldown = 0
    bulletCooldown = 0
    alive = true
    bullets = []
    asteroidCooldown = 0
    colisionsMap = []
    playerColisionsMap = []
    asteroidsColisions = []
    particleCooldown = 0
    trailList = [player.y, player.y, player.y, player.y, player.y]

    addAnimation(art.animations.explosion, parseInt(player.x) - 5, parseInt(player.y) - 1, -2, 0, art.ship.width + 5, art.ship.height + 2)
}

let bullets = []

function bullet() {
    if (bullets) {
        for (let i = 0; i < bullets.length; i += 1) {
            renderer.draw('=', bullets[i].x, bullets[i].y)

            bullets[i].x += 2

            if (bullets[i].x > window.w)
                bullets.splice(i, 1)
        }
    }
}

/////////////////////////////////////////////////// asteroids

let asteroids = []
let asteroidCooldown = 0

function asteroid() {
    if (asteroidCooldown <= 0) {
        asteroids.push({
            x: window.w,
            y: randomInRange(0, window.h - 8),
            xVelocity: 2,
            yVelocity: 0,
            type: randomInRange(0, art.asteroids.length - 1)
        })

        let previousYVeloity = 0
        if (asteroids[asteroids.length - 2]) {
            previousYVeloity = (asteroids[asteroids.length - 2].yVelocity === 0)
        }
        if (asteroids[asteroids.length - 1].y < 20 && previousYVeloity) {
            asteroids[asteroids.length - 1].yVelocity = 0.1
        } else if (asteroids[asteroids.length - 1].y > window.h - 20 && previousYVeloity) {
            asteroids[asteroids.length - 1].yVelocity = -0.1
        } else if (randomInRange(0, 5) === 0) {
            asteroids[asteroids.length - 1].xVelocity = 3
        }

        asteroidCooldown = 60
    }


    if (asteroids)
        for (let i = 0; i < asteroids.length; i += 1) {
            asteroids[i].x -= asteroids[i].xVelocity
            asteroids[i].y += asteroids[i].yVelocity
            const asteroidImg = art.asteroids[asteroids[i].type].img

            renderer.drawObject(asteroidImg, parseInt(asteroids[i].x), parseInt(asteroids[i].y))
            addColisionObject(asteroidImg, parseInt(asteroids[i].x), parseInt(asteroids[i].y))


            const asteroid = asteroids[i]

            addAsteroidColision(art.asteroids[asteroid.type], asteroid.x, asteroid.y)

            const asteroidWidth = art.asteroids[asteroids[i].type].width

            if (asteroids[i].x < 0 - asteroidWidth) {
                asteroids.splice(i, 1)
            }
        }

    asteroidCooldown -= 1
}

/////////////////////////////////////////////////// animations

let animations = []
let animationCooldown = 20

function animation() {
    if (animationCooldown <= 0) {

        for (let i = 0; i < animations.length; i += 1) {
            if (animations[i].state < animations[i].img.length - 1) {
                animations[i].state += 1
                animations[i].x += animations[i].xSpeed
            } else {
                animations.splice(i, 1)
            }
        }

        animationCooldown = 5
    }

    for (let i = 0; i < animations.length; i += 1) {
        const pos = animations[i].state
        const texture = animations[i].img[pos]

        renderer.drawObjectWithoutSpace(cropImg(texture, animations[i].cropX, animations[i].cropY), animations[i].x, animations[i].y)
    }

    animationCooldown -= 1
}

function addAnimation(img, x, y, xSpeed, ySpeed, cropX, cropY) {
    xSpeed ??= 0
    ySpeed ??= 0
    cropX ??= -1
    cropY ??= -1

    animations.push({
        img: img,
        x: parseInt(x),
        y: parseInt(y),
        state: 0,
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        cropX: cropX,
        cropY: cropY,
    })
}

/////////////////////////////////////////////////// colisions

let colisionsMap = [] // for player
let playerColisionsMap = []

function addColisionObject(object, x, y, isPlayer = 0) {
    let _y = 0;
    let _x = 0;

    for (var i = 0; i < object.length; i++) {
        if (object.charAt(i) != '\n') {
            if (object.charAt(i) != ' ')
                if (isPlayer) {
                    playerColisionsMap.push({
                        x: x + _x,
                        y: y + _y
                    })
                } else {
                    colisionsMap.push({
                        x: x + _x,
                        y: y + _y
                    })
                }
            _x++
        } else {
            _x = 0
            _y++
        }
    }
}

function checkColisions() {
    if (player.hitCooldown < 0)
        checkPlayerColisions()

    player.hitCooldown -= 1

    checkAsteroidColisions()
}

let asteroidsColisions = [] // for bullets that destroy asteroids

function checkAsteroidColisions() {
    for (let i = 0; i < asteroidsColisions.length; i += 1) {
        const ast = asteroidsColisions[i]

        bullets.forEach((bullet, bI) => {
            if (checkIfPointInRectangle(bullet.x, bullet.y, ast.x, ast.y, ast.x + ast.width, ast.y + ast.height)) {

                addAnimation(art.animations.hit, bullets[bI].x - 1, bullets[bI].y - 1, 3, 0)

                addAnimation(art.animations.explosion, ast.x, ast.y, -3, 0, ast.width, ast.height)

                asteroids.splice(i, 1)
                bullets.splice(bI, 1)
            }
        })

    }
}

function addAsteroidColision(asteroid, x, y) {
    asteroidsColisions.push(
        {
            width: asteroid.width,
            height: asteroid.height,
            x: x,
            y: y
        }
    )
}

function checkPlayerColisions() {
    playerColisionsMap.forEach(coordinates => {
        let playerColided = colisionsMap.findIndex(element => {
            if (element.x === coordinates.x && element.y === coordinates.y) {
                return true
            }
        })

        playerColided -= 1
        if (playerColided > -1) {
            const x = playerColisionsMap[playerColided].x
            const y = playerColisionsMap[playerColided].y

            if (player.hitCooldown < 0) {
                player.hp -= 1
                addAnimation(art.animations.hit, x - 1, y - 1)
            }
            player.hitCooldown = 30

            return playerColisionsMap[playerColided]
        }
    })
}

function clearColisions() {
    colisionsMap = []
    playerColisionsMap = []
    asteroidsColisions = []
}

/////////////////////////////////////////////////// ambient

let particles = []
let particleCooldown = 0

function ambient() {
    smallParticles()
}

let trailList = [player.y, player.y, player.y, player.y, player.y]

function trail() {
    // - --=%%
    // sorry for that(

    trailList.push(parseInt(player.y))
    trailList.shift()

    // 1 
    renderer.draw('%', parseInt(player.x - 1), parseInt(player.y + 1))
    renderer.draw('%', parseInt(player.x - 1), parseInt(player.y + 3))
    renderer.draw('%', parseInt(player.x - 1), parseInt(player.y + 5))

    // 2
    renderer.draw('%', parseInt(player.x - 2), parseInt(player.y + 1))
    renderer.draw('%', parseInt(player.x - 2), parseInt(player.y + 3))
    renderer.draw('%', parseInt(player.x - 2), parseInt(player.y + 5))

    // 3
    renderer.draw('=', parseInt(player.x - 3), parseInt(trailList[3] + 1))
    renderer.draw('=', parseInt(player.x - 3), parseInt(trailList[3] + 3))
    renderer.draw('=', parseInt(player.x - 3), parseInt(trailList[3] + 5))

    // 4
    renderer.draw('=', parseInt(player.x - 4), parseInt(trailList[3] + 1))
    renderer.draw('=', parseInt(player.x - 4), parseInt(trailList[3] + 3))
    renderer.draw('=', parseInt(player.x - 4), parseInt(trailList[3] + 5))

    // 5
    renderer.draw('-', parseInt(player.x - 5), parseInt(trailList[1] + 1))
    renderer.draw('-', parseInt(player.x - 5), parseInt(trailList[1] + 3))
    renderer.draw('-', parseInt(player.x - 5), parseInt(trailList[1] + 5))

    // 7
    let temp
    temp = randomInRange(0, 1) ? ' ' : '-'
    renderer.draw(temp, parseInt(player.x - 6), parseInt(trailList[1] + 1))
    temp = randomInRange(0, 1) ? ' ' : '-'
    renderer.draw(temp, parseInt(player.x - 6), parseInt(trailList[1] + 3))
    temp = randomInRange(0, 1) ? ' ' : '-'
    renderer.draw(temp, parseInt(player.x - 6), parseInt(trailList[1] + 5))

    // 7
    temp = randomInRange(0, 1) ? ' ' : '-'
    renderer.draw(temp, parseInt(player.x - 7), parseInt(trailList[1] + 1))
    temp = randomInRange(0, 1) ? ' ' : '-'
    renderer.draw(temp, parseInt(player.x - 7), parseInt(trailList[1] + 3))
    temp = randomInRange(0, 1) ? ' ' : '-'
    renderer.draw(temp, parseInt(player.x - 7), parseInt(trailList[1] + 5))
}

function smallParticles() {
    if (particleCooldown == 15) {
        particleCooldown = 0

        particles.push({
            x: window.w,
            y: parseInt(randomInRange(0, window.h)),
            speed: 1
        })
        particles.push({
            x: window.w,
            y: parseInt(randomInRange(0, window.h)),
            speed: 2
        })
    }

    particleCooldown += 1

    for (let i = 0; i < particles.length; i += 1) {
        renderer.draw('-', parseInt(particles[i].x), parseInt(particles[i].y))
        particles[i].x -= particles[i].speed


        if (particles[i].x < 0) {
            particles.splice(i, 1)
        }
    }
}