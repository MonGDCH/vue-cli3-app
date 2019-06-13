/**
 * 事件工厂
 *
 * @version v1.0
 */
class EventBus {

    /**
     * 构造方法
     *
     * @return {[type]} [description]
     */
    constructor() {
        this.events = {};
    }

    /**
     * 实现on方法
     *
     * @param {string} eventName 订阅事件名
     * @param {function} callback 回调函数
     * @param {boolean} flag 是否添加到函数列表的第一位（是否第一次执行）
     */
    on(type, callback, scope, ...args) {
        if (typeof this.events[type] == "undefined") {
            this.events[type] = [];
        }
        this.events[type].push({scope: scope, callback: callback, args: args});
    }

    /**
     * 移除某个事件下的执行函数
     *
     * @param {string} eventName 
     * @param {function} callback 
     */
    off(type, callback, scope) {
        if (typeof this.events[type] == "undefined") {
            return;
        }
        let numOfCallbacks = this.events[type].length;
        let newArray = [];
        for (let i = 0; i < numOfCallbacks; i++) {
            let event = this.events[type][i];
            if (event.scope == scope && event.callback == callback) {

            } else {
                newArray.push(event);
            }
        }
        this.events[type] = newArray;
    }

    /**
     * 判断是否存在订阅事件
     *
     * @param  {[type]}   type     [description]
     * @param  {Function} callback [description]
     * @param  {[type]}   scope    [description]
     * @return {Boolean}           [description]
     */
    has(type, callback, scope) {
        if (typeof this.events[type] == "undefined") {
            return false;
        }
        let numOfCallbacks = this.events[type].length;
        if (callback === undefined && scope === undefined) {
            return numOfCallbacks > 0;
        }
        for (let i = 0; i < numOfCallbacks; i++) {
            let event = this.events[type][i];
            if ((scope ? event.scope == scope : true) && event.callback == callback) {
                return true;
            }
        }
        return false;
    }

    /**
     * 触发事件
     *
     * @param {string} eventName 
     */
    emit(type, target, ...args) {
        if (typeof this.events[type] == "undefined") {
            return;
        }
        let bag = {
            type: type,
            target: target
        };
        args = [bag].concat(args);
        let events = this.events[type].slice();
        let numOfCallbacks = events.length;
        for (let i = 0; i < numOfCallbacks; i++) {
            let event = events[i];
            if (event && event.callback) {
                let concatArgs = args.concat(event.args);
                event.callback.apply(event.scope, concatArgs);
            }
        }
    }

    /**
     * 调试
     *
     * @return {[type]} [description]
     */
    debug() {
        let str = "";
        for (let type in this.events) {
            let numOfCallbacks = this.events[type].length;
            for (let i = 0; i < numOfCallbacks; i++) {
                let event = this.events[type][i];
                let className = "Anonymous";
                if (event.scope) {
                    if (event.scope.constructor.name) {
                        className = event.scope.constructor.name;
                    }
                }
                str += `${className} listening for "${type}"\n`;
            }
        }
        return str;
    }
};

export default new EventBus();