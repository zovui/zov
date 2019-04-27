/**
 * 查找组件的方法
 **/
// 向上查找目标组件
export function findComponentUpward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName]
    } else {
        componentNames = componentName
    }
    let parent = context.$parent
    let name = parent.$options.name
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
    }
    return parent
}

// 向下查找目标组件
export function findComponentDownward (context, componentName) {
    const childrens = context.$children
    let children = null

    if (childrens.length) {
        for (const child of childrens) {
            const name = child.$options.name
            if (name === componentName) {
                children = child
                break
            } else {
                children = findComponentDownward(child, componentName)
                if (children) break
            }
        }
    }
    return children
}

// 向下查找所有目标组件，返回数组
export function findComponentsDownward (context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child)
        const foundChilds = findComponentsDownward(child, componentName)
        return components.concat(foundChilds)
    }, [])
}

// 向上查找所有目标组件，返回数组
export function findComponentsUpward (context, componentName) {
    let parents = []
    const parent = context.$parent
    if (parent) {
        if (parent.$options.name === componentName) parents.push(parent)
        return parents.concat(findComponentsUpward(parent, componentName))
    } else {
        return []
    }
}

// 查找兄弟组件
export function findBrothersComponents (context, componentName, exceptMe = true) {
    let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName
    })
    let index = res.findIndex(item => item._uid === context._uid)
    if (exceptMe) res.splice(index, 1)
    return res
}

/**
* 深拷贝
**/
function typeOf (obj) {
    const toString = Object.prototype.toString
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    return map[toString.call(obj)]
}
export function deepCopy (data) {
    const t = typeOf(data)
    let o

    if (t === 'array') {
        o = []
    } else if (t === 'object') {
        o = {}
    } else {
        return data
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]))
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i])
        }
    }
    return o
}

// scrollTop 动画
export function scrollTop (el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60)
            }
        )
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)

    function scroll (start, end, step) {
        if (start === end) return

        let d = (start + step > end) ? end : start + step
        if (start > end) {
            d = (start - step < end) ? end : start - step
        }

        if (el === window) {
            window.scrollTo(d, d)
        } else {
            el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
}

// 判断参数是否是其中之一
export function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }
    return false
}

const trim = function (string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

// 判断是否已有此className
export function hasClass (el, cls) {
    if (!el || !cls) return false
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
    if (el.classList) {
        return el.classList.contains(cls)
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
    }
}

// 添加className
export function addClass (el, cls) {
    if (!el) return
    let curClass = el.className
    const classes = (cls || '').split(' ')

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i]
        if (!clsName) continue

        if (el.classList) {
            el.classList.add(clsName)
        } else {
            if (!hasClass(el, clsName)) {
                curClass += ' ' + clsName
            }
        }
    }
    if (!el.classList) {
        el.className = curClass
    }
}
// 删除className
export function removeClass (el, cls) {
    if (!el || !cls) return
    const classes = cls.split(' ')
    let curClass = ' ' + el.className + ' '

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i]
        if (!clsName) continue

        if (el.classList) {
            el.classList.remove(clsName)
        } else {
            if (hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ')
            }
        }
    }
    if (!el.classList) {
        el.className = trim(curClass)
    }
}
// 媒体查询容错函数
export const dimensionMap = {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1600px'
}
export function setMatchMedia () {
    if (typeof window !== 'undefined') {
        const matchMediaPolyfill = mediaQuery => {
            return {
                media: mediaQuery,
                matches: false,
                on () {},
                off () {}
            }
        }
        window.matchMedia = window.matchMedia || matchMediaPolyfill
    }
}

let prefix = ['webkit', 'moz', 'MS', 'o', '']
export function prefixedEventListener (element, type, callback) {
    for (let p = 0; p < prefix.length; p++) {
        if (!prefix[p]) type = type.toLowerCase()
        element.addEventListener(prefix[p] + type, callback, false)
    }
}

export function transitionEnd (element, callback) {
    let transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MsTransition': 'msTransitionEnd'
    }
    for (let t in transitions) {
        if (element.style[t] !== undefined) {
            element.addEventListener(transitions[t], callback, false)
        }
    }
}
export function animitionEnd (element, callback) {
    let animations = {
        'animation': 'animationend',
        'OAnimation': 'oAnimationEnd',
        'MozAnimation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd'
    }
    for (let t in animations) {
        if (element.style[t] !== undefined) {
            element.addEventListener(animations[t], callback, false)
        }
    }
}
export const sharpMatcherRegx = /#([^#]+)$/

export function isNumber (value) {
    return typeof value === 'number' && !isNaN(value)
}

export function isString (value) {
    return typeof value === 'string'
}

export function isObject (value) {
    return typeof value === 'object'
}

export function isDef (value) {
    return typeof value !== 'undefined'
}
