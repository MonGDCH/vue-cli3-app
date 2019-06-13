/**
 * 格式化时间戳
 *
 * @param  int     timeStamp 时间戳
 * @param  String  format    格式化标准
 * @return {[type]}          [description]
 */
const formatDate = (timeStamp, format = 'Y-m-d') => {
    let date =  new Date(parseInt(timeStamp) * 1000);
    let array_format = format.split('-');
    let dates = [];
    let times = [];
    array_format.forEach((v) => {
        switch(v){
            case 'Y':
                dates.push(date.getFullYear());
                break;
            case 'm':
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                dates.push(m);
                break;
            case 'd':
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                dates.push(d);
                break;
            case 'H':
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                times.push(h);
                break;
            case 'i':
                let i = date.getMinutes();
                   i = i < 10 ? ('0' + i) : i;
                   times.push(i);
                   break;
            case 's':
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                times.push(s);
                break;
        }
    });
    let res = dates.join('-');
    return (times.length > 0) ? res + ' ' + times.join(':') : res;
}

/**
 * 格式化数字
 *
 * @param  {[type]} number        数字
 * @param  {Number} decimals      保留小数位数
 * @param  {String} dec_point     小数点符号
 * @param  {String} thousands_sep 千分位符号
 * @return {[type]}               [description]
 */
const formatNum = (number, decimals = 2, dec_point = '.', thousands_sep = ',') => {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    let n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        res = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

    let regexp = /(-?\d+)(\d{3})/;
    while(regexp.test(res[0])){
        res[0] = res[0].replace(regexp, "$1" + sep + "$2");
    }
 
    if((res[1] || '').length < prec){
        res[1] = res[1] || '';
        res[1] += new Array(prec - res[1].length + 1).join('0');
    }
    return res.join(dec);
}

/**
 * 保留小数位
 *
 * @param  {[type]} number [description]
 * @param  {[type]} prec   [description]
 * @return {[type]}        [description]
 */
const toFixedFix = (number, prec = 2) =>{
    let k = Math.pow(10, prec);
    return '' + Math.ceil(number * k) / k;
}

/**
 * 金额转大写
 *
 * @param  string   num 数额 
 * @return {[type]}     [description]
 */
const money2Chinese = (num) => {
    let strOutput = ""
    let strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分'
    num += "00"
    const intPos = num.indexOf('.')
    if(intPos >= 0) {
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2)
    }
    strUnit = strUnit.substr(strUnit.length - num.length)
    for(let i = 0; i < num.length; i++) {
        strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1)
    }

    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
}
export default {
    formatDate,
    formatNum,
    toFixedFix,
    money2Chinese
}