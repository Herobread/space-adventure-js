const asciicontainer = document.getElementById('asciicontainer')
window.fsize = 10
window.clock = 0

export const asciiMap = {
    map: [[]],
    putSymbol: function (char, x, y) {
        this.map[[x, y]] = char
    },
    init: function () {
        for (var x = 0; x <= window.width; x++) {
            for (var y = 0; y <= window.height; y++) {
                this.map[[x, y]] = null
            }
        }
    },
}

export const renderer = {
    map: asciiMap,
    int: function () {

    },
    put: function (text) {
        window.asciiScreen.textContent = text
    },
    draw: function (char, x, y) {
        asciiMap.putSymbol(char, x, y)
    },
    drawObject: function (object, x, y) {
        var _y = 0;
        var _x = 0;
        x = parseInt(x)
        y = parseInt(y)
        for (var i = 0; i < object.length; i++) {
            if (object.charAt(i) != '\n') {
                this.draw(object.charAt(i), x + _x, y + _y)
                _x++
            } else {
                _x = 0
                _y++
            }
        }
    },
    drawTransparentObject: function (object, x, y) {
        var _y = 0;
        var _x = 0;
        x = parseInt(x)
        y = parseInt(y)
        for (var i = 0; i < object.length; i++) {
            if (object.charAt(i) === ' ') {
                _x++
            } else if (object.charAt(i) !== '\n') {
                this.draw(object.charAt(i), x + _x, y + _y)
                _x++
            } else {
                _x = 0
                _y++
            }
        }
    },
    clear: function () {
        // this.map.clear()
        // const start = performance.now()
        for (let y = 0; y < window.h; y += 1) {
            for (let x = 0; x < window.w; x += 1) {
                this.map.map[[x, y]] = ' '
            }
        }
        // const end = performance.now()

        // console.log("clear time ", end - start)
    },
    render: function () {
        // const start = performance.now()

        window.clock += 1

        if (window.clock === 1000) {
            window.clock = 0
        }

        let res = ''

        for (let y = 0; y < window.h; y += 1) {
            for (let x = 0; x < window.w; x += 1) {
                if (this.map.map[[x, y]])
                    res += this.map.map[[x, y]]
                else
                    res += ' '
            }
            res += '\n'
        }

        asciicontainer.textContent = res

        // const end = performance.now()

        // console.log("render time ", end - start)

        this.clear()
    }
}