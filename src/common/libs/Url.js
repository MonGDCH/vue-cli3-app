/**
 * url辅助类
 */
export default class URL
{
    /**
     * 获取对应的url
     *
     * @return {[type]} [description]
     */
    static getUrl = () => {
        return decodeURI(window.location.pathname + window.location.search + window.location.hash);
    }

    /**
     * 获取浏览器hash
     *
     * @return {[type]} [description]
     */
    static getHash = () => {
        return window.location.hash;
    }

    /**
     * 获取对应下标的hash值
     *
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    static getHashParts = (index) => {
        let hash = urlUtil.getHash().split("/");
        hash.shift();
        return index !== undefined ? hash[index] : hash;
    }

    /**
     * 设置hash
     *
     * @param  {[type]} hashList [description]
     * @return {[type]}          [description]
     */
    static setHash = (hashList) => {
        hashList.unshift(config.baseHash);
        window.location.hash = hashList.join('/');
    }

    /**
     * 获取浏览器中可能会传递过来带有?的页面地址,获取url参数
     */
    static getFromUrl = (param = url) => {
        let param1 = urlUtil.getSearch(param);
        let url = urlUtil.getUrl();
        let param2;
        if(url.split("?").length == 3){
            param2 = url.split("?")[2];
            return param1 + '?' + param2;
        }
        else if(url.split("?").length == 2){
            return param1;
        }
        else{
            return '';
        }

    }

    /**
     * 根据option获取对应的值
     */
    static getSearch = (option) => {
        let paraStr, paras, url = urlUtil.getUrl();
        if(url){
            paraStr = url.split("?")[1];
            if(paraStr){
                paras = {};
                paraStr = paraStr.split("&");
                for(let n in paraStr)
                {
                    let name = paraStr[n].split("=")[0];
                    let value = paraStr[n].split("=")[1];
                    paras[name] = value;
                }
            }
            else{
                return '';
            }
            if(!option){
                return paras;
            }
            else{
                return paras[option] ? paras[option] : "";
            }
        }
    }

    /**
     * 重设url参数取值，若无此参数则进行创建,若参数赋值为null则进行删除
     */
    static setSearch = (option) => {
        let paras = urlUtil.getSearch();
        let i, name, val;
        if(arguments.length == 2){
            name = arguments[0];
            val = arguments[1];
            option = {
                name: val
            };
        }
        if("string" === typeof option){
            paras[option] = "";
        }
        else if("object" === typeof option){
            for(i in option)
            {
                if(option[i] === null){
                    delete paras[i];
                }
                else{
                    paras[i] = option[i];
                }
            }
        }
        else{

        }
        return urlUtil.build(paras);
    }

    /**
     * 删除url中指定参数返回新url
     */
    static removeSearch = (option) => {
        let paras = urlUtil.getSearch();
        let i;
        if("string" === typeof option){
            option = option.split(",");
            for(i in option)
            {
                delete paras[option[i]]
            }

        }
        return urlUtil.build(paras);
    }

    /**
     * 根据url和处理过的paras重新构件url
     *
     * @return {[type]} [description]
     */
    static build = (paras) => {
        let url = urlUtil.getUrl();
        let str = url.split("?");
        let pathname = str.length > 0 ? str[0] : '';
        let i, newUrl = pathname + "?";

        for(i in paras){
            newUrl += (i + "=" + paras[i] + "&");
        }

        return newUrl.substr(0, newUrl.length - 1);
    }

    /**
     * 跳转
     *
     * @param  {[type]} url  [description]
     * @param  {[type]} falg [description]
     * @return {[type]}      [description]
     */
    static Jump = (url, falg) => {
        if(falg){
            window.location.replace(url)
        }
        else{
            window.location.hash = url
        }
    }

    /**
     * url参数转对象
     *
     * @param  {String} url  default: window.location.href
     * @return {Object} 
     */
    static parseQueryString = (url) => {
        url = url == null ? window.location.href : url
        let search = url.substring(url.lastIndexOf('?') + 1)
        return (!search) ? {} : JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    }

    /**
     * 获取url中的文件名
     *
     * @return {[type]} [description]
     */
    static getHtmlDocName = () => {
        let str = window.location.href;
        str = str.substring(str.lastIndexOf("/") + 1);
        str = str.substring(0, str.lastIndexOf("."));
        return str;
    }

    /**
     * 获取url中的某个参数
     *
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    static getUrlParam = (name, default = null) => {
        //构造一个含有目标参数的正则表达式对象
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //匹配目标参数
        let r = window.location.search.substr(1).match(reg);
        //返回参数值
        return (r != null) ? unescape(r[2]) : default;
    }

    /**
     * 设置url参数
     *
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    static setUrlPrmt = (obj) => {
        let _rs = [];
        for(let p in obj){
            if(obj[p] != null && obj[p] != ''){
                _rs.push(p + '=' + obj[p])
            }
        }
        return _rs.join('&');
    }

    /**
     * 获取url参数
     *
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    static getUrlPrmt = (url) => {
        url = url ? url : window.location.href;
        let _pa = url.substring(url.indexOf('?') + 1),
            _arrS = _pa.split('&'),
            _rs = {};
        for(let i = 0, _len = _arrS.length; i < _len; i++) {
            let pos = _arrS[i].indexOf('=');
            if(pos == -1) {
                continue;
            }
            let name = _arrS[i].substring(0, pos),
                value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
            _rs[name] = value;
        }
        return _rs;
    }
    
    /**
     * js实现php urlencode
     *
     * @param {[type]} clearString [description]
     */
    static URLEncode = (clearString) => {
        let output = '';
        let x = 0;
        clearString = clearString.toString();
        let regex = /(^[a-zA-Z0-9-_.\-]*)/;
        while(x < clearString.length){
            let match = regex.exec(clearString.substr(x));
            if(match != null && match.length > 1 && match[1] != ''){
                output += match[1];
                x += match[1].length;
            }
            else{
                if(clearString.substr(x, 1) == ' '){
                    //原文在此用 clearString[x] == ' ' 做判断, 但ie不支持把字符串当作数组来访问, 
                    //修改后两种浏览器都可兼容 
                    output += '+';
                }
                else{
                    let charCode = clearString.charCodeAt(x);
                    let hexVal = charCode.toString(16);
                    output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
                }
                x++;
            }
        }
        return output;
    }

    /**
     * 数组对象转uri参数
     *
     * @param  {[type]} param  [description]
     * @param  {[type]} key    [description]
     * @param  {[type]} encode [description]
     * @return {[type]}        [description]
     */
    static formatUri = (param, key = null, encode = true) => {
        if(param == null){
            return '';
        }
        let paramStr = '';
        let t = typeof(param);
        if(t == 'string' || t == 'number' || t == 'boolean'){
            paramStr += '&' + key + '='  + ((encode == true) ? encodeURIComponent(param) : param); 
        }
        else{
            for(let i in param)
            {
                let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
                paramStr += urlEncode(param[i], k, encode)
            }
        }
        return paramStr;
    }
}