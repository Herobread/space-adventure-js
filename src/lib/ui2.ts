import { colisions } from "lib/colisions"
import { renderer } from "../renderer"
import { shapes } from "lib/shapes"
import { repeatSymbol } from "./util"

interface basicComponent {
	x: number
	y: number
	pointer: any
}

interface buttonOptions extends basicComponent {
	content: string
	// style: undefined | 'default' | 'big' | 'underlined',
	onClick: Function
}

interface dropDownOption {
	content: string
	onClick: Function
	split?: boolean
}

interface openedDropdowns {
	[key: string]: boolean
}
let openedDropdowns: openedDropdowns = {}

export const ui2 = {
	button: function (button: buttonOptions) {
		let { content, x, y, onClick, pointer } = button

		const width = content.length + 2
		const height = 3

		const isHovered = colisions.checkIfPointInSquare(
			{ x: pointer.x, y: pointer.y },
			{ x: x - 1, y: y - 1, w: width, h: height }
		)
		const isClicked = isHovered && pointer.click

		if (isHovered) {
			content = content.toUpperCase()
		}
		if (isClicked) {
			onClick()
		}

		renderer.drawObject(content, x, y)

		return {
			x: x,
			y: y,
			w: width,
			h: height,
		}
	},
	dropDown: function (
		name: string,
		options: dropDownOption[],
		x: number,
		y: number,
		pointer: any,
		onOpen: Function = () => {},
		onClose: Function = () => {}
	) {
		let totalX = name.length + 3
		let totalY = 1

		onOpen ??= () => {}
		onClose ??= () => {}

		if (openedDropdowns[name]) {
			shapes.line(":", x, y, x, y + options.length * 2)
			renderer.drawObject("+ " + name, x, y)
		} else {
			renderer.drawObject("- " + name, x, y)
		}

		let maxWidth = 0

		options.forEach((option) => {
			if (maxWidth < option.content.length) {
				maxWidth = option.content.length
			}
		})

		if (openedDropdowns[name]) {
			options.forEach((option, i) => {
				let x_ = x + 2
				let y_ = y + 2 + i * 2

				if (option.split) {
					renderer.drawObject(
						"=" + repeatSymbol("-", maxWidth + 1),
						x,
						y + 2 + i * 2
					)
				} else {
					renderer.drawObject(option.content, x + 2, y + 2 + i * 2)
					if (
						colisions.checkIfPointInSquare(
							{ x: pointer.x, y: pointer.y },
							{
								x: x_,
								y: y_,
								w: option.content.length,
								h: 1,
							}
						)
					) {
						renderer.drawObject("+>", x_ - 2, y_)
						if (pointer.click) {
							openedDropdowns[name] = false
							option.onClick()
							onClose()
						}
					}
				}
			})
		}

		if (pointer.click) {
			if (
				colisions.checkIfPointInSquare(
					{ x: pointer.x, y: pointer.y },
					{ x: x, y: y, w: name.length + 2, h: 2 }
				)
			) {
				onOpen()
				// console.log('first')
				openedDropdowns[name] = !openedDropdowns[name]
			} else if (openedDropdowns[name]) {
				onClose()
				openedDropdowns[name] = false
			}
		}

		return {
			width: totalX,
			height: totalY,
		}
	},
}
