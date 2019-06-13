'use strict';
/**
 * 验证器工具组件
 *
 * @author Mon <985558837@qq.com>
 * @version v1.1 采用 Promise 处理验证事务
 */
export default class Validate
{
    /**
     * 构造方法
     *
     * @return {[type]}       [description]
     */
    constructor(){
        /**
         * 内置验证规则
         *
         * @type {Array}
         */
        this.rule = {
            'required': this.required,
            'number': this.number,
            'integer': this.integer,
            'max': this.max,
            'min': this.min,
            'lengths': this.lengths,
            'maxLengths': this.maxLengths,
            'minLengths': this.minLengths,
            'in': this.in,
            'notIn': this.notIn,
            'ip': this.ip,
            'moble': this.moble,
            'email': this.email,
            'language': this.language,
            'alpha': this.alpha,
            'account': this.account,
            'moble': this.moble,
            'regex': this.regex
        }
    }

    /**
     * 设置验证规则
     *
     * @param {[type]}   name     [description]
     * @param {Function} callback [description]
     */
    setRule(name, callback){
        this.rule[name] = callback
    }

    /**
     * 批量验证
     *
     * @param  {[type]} ruleArr  [description]
     * @param  {[type]} valueArr [description]
     * @param  {[type]} msgArr   [description]
     * @return {[type]}          [description]
     */
    check(ruleArr, valueArr, msgArr){
        return new Promise((resolve, reject) => {
            for(let item in ruleArr)
            {
                // 判断是否存在验证字段
                if(typeof valueArr[item] == 'undefined'){
                    return reject('验证字段不存在: '+item)
                }
                // 获取验证规则
                let rules = ruleArr[item].split('|')
                for(let rule of rules)
                {
                    let check = this.checkItem(rule, valueArr[item], msgArr[item]);
                    // 验证失败，直接放回
                    if(check !== true){
                        return reject(check)
                    }      
                }
            }
            // 成功返回
            return resolve(true)
        })
    }

    /**
     * 当个字段验证
     *
     * @param  {[type]} rules 验证数据
     * @param  {[type]} value 验证规则
     * @param  {[type]} msg   错误信息
     * @return {[type]}       [description]
     */
    checkItem(rules, value, msgs){
        // 获取验证规则
        let rule = rules.split(':')
        let msg = this._getCheckErr(msgs, rule[0])
        if(typeof this.rule[ rule[0] ] !== 'function'){
            throw new Error('未定义验证规则 => '+rule);
        }

        // 调用验证方法
        let res = this.rule[ rule[0] ](value, msg, rule[1]);
        if(res !== true){
            return res
        }
        return true
    }

    /**
     * 获取错误提示
     *
     * @param  {[type]} msg  [description]
     * @param  {[type]} rule [description]
     * @return {[type]}      [description]
     */
    _getCheckErr(msg, rule){
        if(typeof msg == 'string'){
            return msg
        }
        return msg[rule]
    }

    /**
     * 必须
     * @param  {[type]} value [description]
     * @param  {[type]} msg   [description]
     * @return {[type]}       [description]
     */
    required(value, msg){
        if(!value && value !== 0){
            let error = (typeof msg == 'undefined') ? '字段必须' : msg
            return error 
        }
        return true
    }

    /**
     * 数字
     *
     * @param  {[type]} value [description]
     * @param  {[type]} msg   [description]
     * @return {[type]}       [description]
     */
    number(value, msg){
        if(typeof value !== 'number'){
            let error = (typeof msg == 'undefined') ? '必须为数字' : msg
            return error
        }
        return true
    }

    /**
     * 整数
     *
     * @param  {[type]} value [description]
     * @param  {[type]} msg   [description]
     * @return {[type]}       [description]
     */
    integer(value, msg){
        if(this.number(value, msg) !== true || (value % 1 !== 0)){
            let error = (typeof msg == 'undefined') ? '必须为整数' : msg
            return error
        }
        return true
    }

    /**
     * 最大值
     *
     * @param  {[type]} value  [description]
     * @param  {[type]} msg    [description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    max(value, msg, params){
        let max = (params - 0)
        if(this.number(value, msg) !== true || (value > max)){
            let error = (typeof msg == 'undefined') ? '数值不能大于'+max : msg
            return error
        }
        return true
    }

    /**
     * 最小值
     *
     * @param  {[type]} value  [description]
     * @param  {[type]} msg    [description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    min(value, msg, params){
        let min = (params - 0)
        if(this.number(value, msg) !== true || (value < min)){
            let error = (typeof msg == 'undefined') ? '数值不能小于'+min : msg
            return error
        }
        return true
    }

    /**
     * 指定长度
     *
     * @param  {[type]} value  [description]
     * @param  {[type]} msg   [description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    lengths(value, msg, params){
        let len = value.length
        let checkLength = (params - 0)
        if(len != checkLength){
            let error = (typeof msg == 'undefined') ? '长度必须为'+checkLength : msg
            return error
        }
        return true
    }

    /**
     * 最大长度
     *
     * @param  {[type]} value  [description]
     * @param  {[type]} msg    [description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    maxLengths(value, msg, params){
        let len = value.length
        let checkLength = (params - 0)
        if(len > checkLength){
            let error = (typeof msg == 'undefined') ? '长度不能大于'+checkLength : msg
            return error
        }
        return true
    }

    /**
     * 最小长度
     *
     * @param  {[type]} value  [description]
     * @param  {[type]} msg    [description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    minLengths(value, msg, params){
        let len = value.length
        let checkLength = (params - 0)
        if(len < checkLength){
            let error = (typeof msg == 'undefined') ? '长度不能小于'+checkLength : msg
            return error
        }
        return true
    }

    /**
     * 指定某些值
     *
     * @param  {[type]} value  [description]
     * @param  {[type]} msg    [description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    in(value, msg, params){
        let ins = params.split(',')
        if(ins.indexOf(value) == -1){
            let error = (typeof msg == 'undefined') ? '必须存在于'+params : msg
            return error
        }
        return true
    }

    /**
     * 指定非某些值
     *
     * @param  {[type]} value  [description]
     * @param  {[type]} msg    [description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    notIn(value, msg, params){
        let ins = params.split(',')
        if(ins.indexOf(value) != -1){
            let error = (typeof msg == 'undefined') ? '不能存在于'+params : msg
            return error
        }
        return true
    }


    /**
     * IP
     *
     * @param  {[type]} value [description]
     * @param  {[type]} msg   [description]
     * @return {[type]}       [description]
     */
    ip(value, msg){
        const regex = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/
        if(!regex.test(value)){
            let error = (typeof msg == 'undefined') ? '必须为IP' : msg
            return error
        }
        return true
    }

    /**
     * 手机号
     *
     * @param  {[type]} value [description]
     * @param  {[type]} msg   [description]
     * @return {[type]}       [description]
     */
    moble(value, msg){
        const regex = /^[1][34589][0-9]{9}$/
        if(!regex.test(value)){
            let error = (typeof msg == 'undefined') ? '必须为手机号' : msg
            return error
        }
        return true
    }

    /**
     * 英文或数字
     *
     * @param  {[type]} value [description]
     * @param  {[type]} msg   [description]
     * @return {[type]}       [description]
     */
    language(value, msg){
        const regex = /^\w*$/
        if(!regex.test(value)){
            let error = (typeof msg == 'undefined') ? '必须为英文或数字' : msg
            return error
        }
        return true
    }

    /**
     * 英文
     *
     * @param  {[type]} value [description]
     * @param  {[type]} msg   [description]
     * @return {[type]}       [description]
     */
    alpha(value, msg){
        const regex = /^[A-Za-z]+$/
        if(!regex.test(value)){
            let error = (typeof msg == 'undefined') ? '必须为英文' : msg
            return error
        }
        return true
    }

    /**
     * 字母、数字和下划线
     *
     * @param  {[type]} value [description]
     * @param  {[type]} msg   [description]
     * @return {[type]}       [description]
     */
    account(value, msg){
        const regex = /^[A-Za-z0-9\_]+$/
        if(!regex.test(value)){
            let error = (typeof msg == 'undefined') ? '只允许字母、数字和下划线' : msg
            return error
        }
        return true
    }

    /**
     * 邮箱
     *
     * @param  {[type]} value [description]
     * @param  {[type]} msg   [description]
     * @return {[type]}       [description]
     */
    email(value, msg){
        const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        if(!regex.test(value)){
            let error = (typeof msg == 'undefined') ? '必须为邮箱' : msg
            return error
        }
        return true
    }

    /**
     * 手机号
     *
     * @param  {[type]} value [description]
     * @param  {[type]} $msg  [description]
     * @return {[type]}       [description]
     */
    moble(value, msg){
        const regex = /^[1][35678][0-9]{9}$/
        if(!regex.test(value)){
            let error = (typeof msg == 'undefined') ? '必须为手机号' : msg
            return error
        }
        return true
    }

    /**
     * 手机号
     *
     * @param  {[type]} value [description]
     * @param  {[type]} $msg  [description]
     * @return {[type]}       [description]
     */
    regex(value, msg, regex){
        let regexs = new RegExp(regex)
        if(!regexs.test(value)){
            let error = (typeof msg == 'undefined') ? '正则验证失败' : msg
            return error
        }
        return true
    }

}