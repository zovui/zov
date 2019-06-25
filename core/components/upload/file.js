const STATUS = {
	LOADING: 'loading',
	FINISHED: 'finished',
	FAIL: 'fail'
}

let index = 0

export default class FileObject {
	constructor({ name, url, status, percent, file }) {
		this.name = name || ''
		this.url = url || ''
		this.status = status || STATUS.FINISHED
		this._percent = typeof percent === 'number' ? percent : 100
		this.file = file
		this.id = +new Date() + '' + index++
	}

	get percent() {
		return this._percent
	}

	set percent(percent) {
		this._percent = percent
		if (percent >= 100) {
			setTimeout(() => {
				this.status = STATUS.FINISHED
			}, 500)
		}
	}
}
