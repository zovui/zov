/**
 * 获取目标节点
 * @param node 支持DOM Node和CSS selector
 * @returns {*}
 */
function getTarget(node) {
	if (node === void 0) {
		node = document.body
	}
	return node instanceof window.Node ? node : document.querySelector(node)
}

/**
 * 设置节点的overflow属性
 * @param node
 * @param overflow
 */
function setOverflow(node, overflow) {
	let target = getTarget(node)
	if (target) {
		target.style.overflow = overflow
	}
}

/**
 * 设置节点滚动条锁定
 * @param node
 */
export function scrollLock(node) {
	setOverflow(node, 'hidden')
}

/**
 * 设置节点滚动条解锁
 * @param node
 */
export function scrollUnlock(node) {
	setOverflow(node, '')
}
