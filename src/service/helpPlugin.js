/*
 *  字数限制
 */
export const wordsL = (content, limtnum) => { // 总共两个字content为要测算的字符串长度，limtnum为需要限制的长度
    return content.length > limtnum ? content.substr(0, limtnum) + '...' : content
}

/*
 * 全部页数计算 
 */
export const pageCal = (count, Rows) => { // 获取两个值第一个总条数第二个每页条数
    return count % Rows != 0 ? parseInt(((count - count % Rows) / Rows + 1) * 10) : parseInt((count / Rows) * 10)
}
/**
 * 防抖函数
 * fn 延时调用的函数
 * delay 延时时间
 */
export const debounce = (fn, delay) => {
    let time = delay || 500
    let timer
    return function () {
        let args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, time)
    }
}
/**
 * 节流函数
 * fn 延时调用的函数
 * wait 延时时间
 */
export const throttle = (fn, wait) => {
    var lastTime = 0
    return function (...args) {
        var now = Date.now()
        var coolingDown = now - lastTime < wait
        // ↑ 距离上次执行的间隔，小于设定的间隔时间 => 则处于冷却时间
        // 冷却时间，禁止放大招
        if (coolingDown) {
            return
        }
        // 记录本次执行的时刻
        lastTime = Date.now()  
        // 冷却好了就要放大招
        fn.apply(this, args)
    }
}
/**
 * deepClone
 * @param {*} Origin 
 * @param {*} Target 
 */
export const deepClone = (Origin, Target) => {
    var target = Target || {}
    var toStr = Object.prototype.toString
    var arrStr = '[object Array]'
    for (var prop in Origin) {
        if (Origin.hasOwnProperty(prop)) {
            if (Origin[prop] !== null && typeof(Origin[prop]) == 'object') {
                if (toStr.call(Origin[prop]) == arrStr) {
                    target[prop] = [];
                } else {
                    target[prop] = {};
                }
                target[prop] = (toStr.call(Origin[prop] == arrStr) ? [] : {});
                deepClone(Origin[prop], target[prop])
            } else {
                target[prop] = Origin[prop]
            }
        }
    }
    return target;
} 
