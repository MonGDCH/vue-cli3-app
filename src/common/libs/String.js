/**
 * 字符串辅助类
 */
export default class String
{
    /*
     * 判断字符串是否为空
     *
     * @param str 传入的字符串
     * @returns {Boolean}
     */
    static isEmpty = (str) => {
        return (str == null || typeof(str) == 'undefined' || (str == '' && typeof(str) != 'number')) ? true : false
    }

    /**
     * 是否包含str
     *
     * @param  {[type]} str1 [description]
     * @param  {[type]} str1 [description]
     * @return {[type]}     [description]
     */
    static hasStr = (str1, str2) => {
        return (str1.indexOf(str2) > -1) ? true : false;
    }

    /*
     * 忽略大小写判断字符串是否相同
     *
     * @param str1
     * @param str2
     * @returns {Boolean}
     */
    static isEqualsIgnorecase = (str1, str2) => {
        return (str1.toUpperCase() == str2.toUpperCase()) ? true : false
    }

    /**
     * 判断是否是数字
     *
     * @param value
     * @returns {Boolean}
     */
    static isNum = (str) => {
        return !isNaN(str) ? true : false
    }

    /**
     * 判断是否是中文
     *
     * @param str
     * @returns {Boolean}
     */
    static isChina = (str) => {
        let reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
        return reg.test(str) ? false : true
    }

    /**
     * 字符串反转
     *
     * @param str
     * @returns {str}
     */
    static reverse = (str) => {
        return str.split("").reverse().join("");
    }
    /**
     * 判断是否为整数
     *
     * @param target
     */
    static isInt = function(target) {
        return typeof target === "number" && target % 1 === 0;
    };

    /**
     * 数组是否包含元素
     */
    static arrayIndexOf = (arr = [], str) => {
        return (arr.indexOf(str) > -1) ? true : false
    }

    /**
     * 除去左边空白
     *
     * @param str
     * @returns {str}
     */
    static lTrim = (str) => {
        return str.replace(/(^\s*)/g, "");
    }

    /**
     * 除去右边空白
     *
     * @param str
     * @returns {str}
     */
    static rTrim = (str) => {
        return str.replace(/(\s*$)/g, "");
    }

    /**
     * 除去两边空白
     *
     * @param str
     * @returns {str}
     */
    static Trim = (str) => {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }

    /**
     * 除去所有空白
     *
     * @param str
     * @returns {str}
     */
    static allTrim = (str) => {
        return str.replace(/\s+/g, "");
    }

    /**
     * Json转换成字符串
     * @param json
     * @returns {str}
     */
    static json2str = (str) => {
        return (!strUtil.isEmpty(str)) ? JSON.parse(str) : null
    }

    /**
     * 字符串转换成Json
     *
     * @param str
     * @returns {json}
     */
    static str2json = (str) => {
        return JSON.stringify(str);
    }

    /**
     * 截取小数点,四舍五入
     */
    static toFixed = (str, number) => {
        return parseFloat(str).toFixed(number);
    }

    /**
     * 截取小数点,不进行四舍五入
     */
    static toDecimal = (str, number) => {
        let item = '1';
        for(let i = 0; i < number; i++)
        {
            item += '0';
        }
        return Math.floor(parseFloat(str) * item) / item;
    }

    /**
     * 字符串-获取以ASCII编码字节数 英文占1字节 中文占2字节
     *
     * @param str
     * @returns {json}
     */
    static lenASCII = (str) => {
        // 将所有非\x00-\xff字符换为xx两个字符,再计算字符串
        return str.replace(/[^\x00-\xff]/g, 'xx').length;
    }

    /**
     * 格式化百分比
     *
     * @param str
     * @returns {str}
     */
    static formatPercent = (str) => {
        let reg = /\%/g;
        return str.toString().replace(reg, '');
    }

    /**
     * 格式化千分位
     *
     * @param str
     * @returns {str}
     */
    static formatKilo = (str) => {
        str = str.toString();
        if(/[^0-9\.]/.test(str)){
            return "invalid value";
        }
        str = str.replace(/^(\d*)$/, "$1.");
        str = str.replace(/(\d*\.\d\d)\d*/, "$1");
        str = str.replace(".", ",");
        let re = /(\d)(\d{3},)/;
        while(re.test(str)){
            str = str.replace(re, "$1,$2");
        }
        str = str.replace(/.(\d*)$/, ".$1");
        str = str.substr(str.length - 1, 1) == '.' ? str.substring(0, str.length - 1) : str;
        if(!(/\./.test(str))){
            str += '.00';
        }
        return str.replace(/^\./, "0.");
    }

    /**
     * 获取唯一机器码
     *
     * @return {[type]} [description]
     */
    static getGuid = () => {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * 格式化字符串
     *
     * @param  {[type]} str [description]
     * @param  {[type]} type[格式化的类型 name telephone identity]
     * @param  {[type]} punctuation [用来格式化的符号]
     * @return {[type]} [description]
     */
    static formatStr = (str, type = 'name', punctuation = '*') => {
        str = str.split('');
        let newStr = [];
        for(let i = 0; i < str.length; i++)
        {
            if(type == 'name'){
                if(i == 0) {
                    newStr.push(str[i]);
                }
                else {
                    newStr.push(punctuation);
                }
            }
            else if(type == 'telephone'){
                if(i > 2 && i < 7) {
                    newStr.push(punctuation);
                }
                else{
                    newStr.push(str[i]);
                }
            }
            else if(type == 'identity'){
                if(i > 5 && i < 14){
                    newStr.push(punctuation);
                }
                else{
                    newStr.push(str[i]);
                }
            }
        }
        return newStr.join('');
    }
    
    /**
     * 清除Html标签文本
     *
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    static clearHtml = (str) => {
        let reg = /<[^<>]+>/g;
        return str.replace(reg, '');
    }

    /**
     * 随机生成颜色
     *
     * @return {String} 
     */
    static randomColor = () => {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    }

    /**
     * 过滤字符串中的空格
     *
     * let a = 'a b c';
     * _.clearSpace(a) => 'abc'
     *
     */
    static clearSpace = function(text) {
        return text.replace(/[ ]/g, "");
    };

    /**
     * 对象序列化
     *
     * @param  {Object} obj 
     * @return {String}
     */
    static stringfyQueryString = (obj) => {
        if(!obj) return '';
        let pairs = [];

        for(let key in obj)
        {
            let value = obj[key];
            if(value instanceof Array){
                for(let i = 0; i < value.length; ++i)
                {
                    pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
                }
                continue;
            }

            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }

        return pairs.join('&');
    }

    /**
     * 查找字符串出现次数
     *
     * @param  {[type]} str      [description]
     * @param  {[type]} strSplit [description]
     * @return {[type]}          [description]
     */
    static countStr = (str, strSplit) => {
        return str.split(strSplit).length - 1
    }
}
