/**
 * 验证帮助类
 */
export default class RegExp
{
    /**
     * 判断数组类型
     *
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    static isArray = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * 判断Function类型
     *
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    static isFunction = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Function]';
    };

    /**
     * 判断对象类型，排除数组和函数
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    static isObject = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };

    /**
     * 判断字符串类型
     *
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    static isString = (obj) => {
        return Object.prototype.toString.call(obj) === '[object String]';
    };

    /**
     * 判断数字类型，包括NaN
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    static isNumber = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Number]';
    };

    /**
     * 判断布尔类型
     *
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    static isBoolean = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Boolean]';
    };

    /**
     * 判断Date类型
     *
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    static isDate = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Date]';
    };

    /**
     * 判断null、undefined或者空
     *
     * @param  {[type]}  value [description]
     * @return {Boolean}       [description]
     */
    static isNull = (value) => {
        return value === '' || value === undefined || value === null ? true : false;
    };

    /**
     * 如果object 不包含任何值，返回true。 对于字符串和数组对象，如果length属性为0，那么返回true。
     *
     * var a = {} => _.isEmpty(a) === true
     * var a = '' => _.isEmpty(a) === true
     * var a = [] => _.isEmpty(a) === true
     */
    static isEmpty = (obj) => {
        let flag = true;
        if(this.isArray(obj) || this.isNumber(obj) || this.isString(obj)) {
            flag = obj.length === 0 ? true : false;
        }
        if(this.isObject(obj)) {
            for(var p in obj) {
                if(obj.hasOwnProperty(p)) {
                    flag = false;
                }
            }
        }
        return flag;
    };

    /**
     * 验证日期格式[yyyy-mm-dd]
     *
     * @param  {[type]}  text [description]
     * @return {Boolean}      [description]
     */
    static isDate = (text) => {
        var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
        return reg.test(text.toString());
    };
    
    /**
     * 验证url
     *
     * @param  {[type]}  text [description]
     * @return {Boolean}      [description]
     */
    static isURL = (text) => {
        var reg = /[a-zA-z]+:\/\/[^\s]/;
        return reg.test(text);
    };
    
    /**
     * 检测字符串中是否包含中文
     *
     * @param  {[type]} text [description]
     * @return {[type]}      [description]
     */
    static existCN = (text) => {
        var reg = /.*[\u4e00-\u9fa5]+.*$/;
        return reg.test(text);
    };

    /**
     * 判断obj是否为空
     *
     * @param  {Object} obj
     * @return {Boolean}
     */
    static isEmptyObject = (obj) => {
        if(!obj || typeof obj !== 'object' || Array.isArray(obj))
            return false
        return !Object.keys(obj).length
    }

    /**
     * 判断是否为邮箱地址
     *
     * @param  {String}  str
     * @return {Boolean} 
     */
    static isEmail = (str) => {
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
    }

    /**
     * 判断是否为身份证号
     *
     * @param  {String|Number} str 
     * @return {Boolean}
     */
    static isIdCard = (str) => {
        return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
    }

    /**
     * 判断是否为手机号
     *
     * @param  {String|Number} str 
     * @return {Boolean} 
     */
    static isMoble = (str) => {
        return /^[1][356789][0-9]{9}$/.test(str)
    }

    /**
     * 判断是否为电话号码
     *
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    static isTel = (str) => {
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    }

    /**
     * 判断是否为URL地址
     *
     * @param  {String} str 
     * @return {Boolean}
     */
    static isUrl = (str) => {
        return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
    }

    /**
     * 判断浏览器是否支持webP格式图片
     *
     * @return {Boolean} 
     */
    static isSupportWebP = () => {
        return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }

    /**
     * 是否为英语
     *
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    static isEnglish = (str) => {
        return /^[a-zA-Z]+$/.test(str);
    }

    /**
     * 是否为中文
     *
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    static isChinese = (str) =>　{
        return /^[\u4E00-\u9FA5]+$/.test(str);
    }

    /**
     * 是否为小写字母
     *
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    static isLower = (str) => {
        return /^[a-z]+$/.test(str);
    }

    /**
     * 是否为大写字母
     *
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    static isUpper = (str) => {
        return /^[A-Z]+$/.test(str);
    }

    /**
     * 检测密码强度，返回强度等级
     *
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    static checkPwd = (str) => {
        let nowLv = 0;
        if(str.length < 6) {
            return nowLv
        }
        if(/[0-9]/.test(str)) {
            nowLv++
        }
        if(/[a-z]/.test(str)) {
            nowLv++
        }
        if(/[A-Z]/.test(str)) {
            nowLv++
        }
        if(/[\.|-|_]/.test(str)) {
            nowLv++
        }
        return nowLv;
    }
}
