/**
 * Draggable
 * 创建可拖拽元素
 */
import EventEmitter from './event-emitter'
import { on, off } from './dom'
/**
 * 拖拽自定义事件
 * @type {{DRAGGING: string, DRAG_START: string, DRAG_END: string}}
 */
const Events = {
    DRAG_START: 'dragstart',
    DRAGGING: 'dragging',
    DRAG_END: 'dragend'
}

function handleDragstart (e) {
    if (this.isDragging) {
        return
    }
    this.isDragging = true
    const { handleDragging, handleDragend } = this
    let state = this.state = {
        // 开始位置x
        startX: e.clientX,
        // 开始位置y
        startY: e.clientY,
        // 拖拽当前的位置x
        currentX: e.clientX,
        // 拖拽当前的位置y
        currentY: e.clientY,
        // 当前x位置相对于开始x位置的增量
        increasedX: 0,
        // 当前y位置相对于开始y位置的增量
        increasedY: 0,
        // 拖拽结束时的x位置
        endX: e.clientX,
        // 拖拽结束时的y位置
        endY: e.clientY,
        // 原始的event对象
        originEvent: e
    }
    on(document, 'mousemove', handleDragging)
    on(document, 'mouseup', handleDragend)
    this.emit(Events.DRAG_START, state)
}

function handleDragging (e) {
    if (!this.isDragging) {
        return
    }
    e.preventDefault()
    const { state } = this
    state.currentX = e.clientX
    state.currentY = e.clientY
    state.increasedX = e.clientX - state.startX
    state.increasedY = e.clientY - state.startY
    state.endX = e.clientX
    state.endY = e.clientY
    state.originEvent = e
    this.emit(Events.DRAGGING, state)
}

function handleDragend (e) {
    e.preventDefault()
    if (!this.isDragging) {
        return
    }
    const { state, handleDragging, handleDragend } = this
    state.currentX = e.clientX
    state.currentY = e.clientY
    state.increasedX = e.clientX - state.startX
    state.increasedY = e.clientY - state.startY
    state.endX = e.clientX
    state.endY = e.clientY
    state.originEvent = e
    this.emit(Events.DRAGGING, state)
    off(document, 'mousemove', handleDragging)
    off(document, 'mouseup', handleDragend)
    this.isDragging = false
    this.state = null
    this.emit(Events.DRAG_END, state)
}

class Draggable extends EventEmitter {
    constructor (el, options = {}) {
        super()
        this.el = typeof el === 'string' ? document.querySelector(el) : el
        this.isDragging = false
        this.state = null

        this.on(Events.DRAG_START, options[Events.DRAG_START])
        this.on(Events.DRAGGING, options[Events.DRAGGING])
        this.on(Events.DRAG_END, options[Events.DRAG_END])

        this.handleDragstart = handleDragstart.bind(this)
        this.handleDragging = handleDragging.bind(this)
        this.handleDragend = handleDragend.bind(this)
        on(this.el, 'mousedown', this.handleDragstart)
    }
    destroyed () {
        this.isDragging = false
        this.state = null
        off(this.el, 'mousedown', this.handleDragstart)
    }
}

Draggable.Events = Events

export default Draggable
