import { oneOf } from '../../utils'
export function getTouches (e, prop) {
    return e.touches ? e.touches[0][prop] : 0
}
export function clamp (value, min, max) {
    if (value < min) {
        return min
    }
    if (value > max) {
        return max
    }
    return value
}
export function getIncrement (key, keys, increment) {
    return oneOf(key, keys) ? increment : 0
}
