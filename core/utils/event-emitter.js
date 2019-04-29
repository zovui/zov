/**
 * EventEmitter
 * 事件发射器
 * 用于处理自定义事件
 */

/**
 * 是否定义了事件
 * @param listeners
 * @param event
 * @return {boolean}
 */
function isDef (listeners, event) {
    return listeners.hasOwnProperty(event) || Array.isArray(listeners[event])
}

/**
 * 是否是函数
 * @param val
 * @return {boolean}
 */
function isFunction (val) {
    return typeof val === 'function'
}

class EventEmitter {
    constructor () {
        this.listeners = {}
    }
    /**
     * 绑定事件
     * @param event
     * @param handler
     */
    on (event, handler) {
        if (!isFunction(handler)) {
            return this
        }
        if (!isDef(this.listeners, event)) {
            this.listeners[event] = []
        }
        this.listeners[event].push(handler)
        return this
    }
    /**
     * 绑定一次性事件
     * @param event
     * @param handler
     */
    once (event, handler) {
        handler.__isOnce = true
        this.on(event, handler)
        return this
    }
    /**
     * 解绑事件
     * @param event
     * @param handler
     */
    off (event, handler) {
        if (!isFunction(handler) || !isDef(this.listeners, event)) {
            return this
        }
        let listeners = this.listeners[event]
        let index = listeners.indexOf(handler)
        if (index !== -1) {
            listeners.splice(index, 1)
        }
        return this
    }
    /**
     * 触发事件
     * @param event
     * @param data
     * @return {EventEmitter}
     */
    emit (event, ...data) {
        if (!isDef(this.listeners, event)) {
            return this
        }
        const listeners = this.listeners[event]
        let i = 0
        let len = listeners.length
        let handler = null

        while (i < len) {
            handler = listeners[i]
            handler.apply(null, data)
            if (handler.__isOnce) {
                listeners.splice(i, 1)
                len--
            } else {
                i++
            }
        }

        return this
    }
}

export default EventEmitter
