import tinycolor from 'tinycolor2'
function setAlpha(data, alpha) {
	const color = tinycolor(data)
	const { _a } = color
	if (_a === undefined || _a === null) {
		color.setAlpha(alpha || 1)
	}
	return color
}

function getColor(data, colorData) {
	const alpha = colorData && colorData.a
	if (colorData) {
		// 在转换之间，hsl比hex更好
		if (colorData.hsl) {
			return setAlpha(colorData.hsl, alpha)
		}
		if (colorData.hex && colorData.hex.length > 0) {
			return setAlpha(colorData.hex, alpha)
		}
	}
	return setAlpha(colorData, alpha)
}

export function changeColor(data, oldHue) {
	const colorData = data
	const color = getColor(data, colorData)
	const hsl = color.toHsl()
	const hsv = color.toHsv()
	if (hsl.s === 0) {
		hsl.h = colorData.h || (colorData.hsl && colorData.hsl.h) || oldHue || 0
		hsv.h = hsl.h
	}
	// 当hsv.v小于0.0164时（基于测试）
	// 因为可能会失去精度
	// 色调和饱和度的结果计算错误
	if (hsv.v < 0.0164) {
		hsv.h = colorData.h || (colorData.hsv && colorData.hsv.h) || 0
		hsv.s = colorData.s || (colorData.hsv && colorData.hsv.s) || 0
	}
	if (hsl.l < 0.01) {
		hsl.h = colorData.h || (colorData.hsl && colorData.hsl.h) || 0
		hsl.s = colorData.s || (colorData.hsl && colorData.hsl.s) || 0
	}
	return {
		hsl,
		hex:
			colorData.a === 1 || colorData.a === undefined
				? color.toHexString().toUpperCase()
				: color.toHex8String().toUpperCase(),
		rgb: color.toRgb(),
		hsv,
		oldHue: colorData.h || oldHue || hsl.h,
		a: colorData.a || color.getAlpha()
	}
}

export function toRGBAString(rgba) {
	const { r, g, b, a } = rgba
	return `rgba(${[r, g, b, a].join(',')})`
}

export function toColorModelNum(str) {
	if (str.substr(0, 1) === '#') {
		return str
	}
	const title = str.match(/(.*)\(/)[1]
	const nums = str.match(/\((.*)\)/)[1].split(',')
	return {
		[title.substr(0, 1)]: nums[0].trim(),
		[title.substr(1, 1)]: nums[1].trim(),
		[title.substr(2, 1)]: nums[2].trim(),
		a: nums[3] || 1
	}
}
