/**
 * import worker from '../../worker'
 * let wk = worker()
 * wk.postMessage({
 *    data: this.data,
 *    index: index,
 *    callback: `
 *        e.data.data.forEach((item) => {
 *            item.selected = false
 *        })
 *        e.data.data[e.data.index].selected = true
 *    `
 * })
 * wk.onmessage = function (e) {
 *    _this.currentData = e.data
 *    _this.dropShow = false
 * }
 **/

export default function (option) {
    let blob = new Blob([
        `
            addEventListener('message', function (e) {
                let callback = new Function('e', e.data.callback)
                callback(e)
                self.close()
                console.log('close test')
            }, false)
        `
    ])
    let url = window.URL.createObjectURL(blob)
    return new Worker(url, option)
}
