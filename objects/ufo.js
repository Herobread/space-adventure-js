import { art } from "../art.js"

export class Ufo {
    constructor(x, y) {
        this.x = x
        this.y = y

        this.invincibility = 400
        this.hp = 3

        this.sprite = art.textures.ufo
    }

    tick() {

    }

    draw() {

    }
}