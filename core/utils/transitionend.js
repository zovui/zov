let	transitionEnd = (() => {
    let body = document.body || document.documentElement
    let transEndEventNames = {
        WebkitTransition : 'webkitTransitionEnd',
        MozTransition    : 'transitionend',
        OTransition      : 'oTransitionEnd otransitionend',
        transition       : 'transitionend'
    }
    for (let name in transEndEventNames) {
        if (typeof body.style[name] === "string") {
            return transEndEventNames[name]
        }
    }
})()
export default (el,fn,duration) => {
    var called = false
    // 在每次transitionEnd的事件后执行该函数
    var callback = function(){
        if (!called) {
            fn()
            called=true
        }
    };
    el.addEventListener(transitionEnd, function(){
        callback()
        //通过setTimeout来补救windowphone中不触发事件的问题
        setTimeout(callback,duration)
    },false)
}
