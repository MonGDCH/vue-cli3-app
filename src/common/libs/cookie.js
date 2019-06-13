/**
 * Coolie操作类
 */
export default class Cookie
{
	/**
	 * 写cookies
	 * @param  {[type]} name  [description]
	 * @param  {[type]} value [description]
	 * @return {[type]}       [description]
	 */
	static setCookie = (name, value) => {
		let Days = 30;
		let exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	}
	
	/**
	 * 读取cookies
	 *
	 * @param  {[type]} name    [description]
	 * @param  {[type]} default [description]
	 * @return {[type]}         [description]
	 */
	static getCookie = (name, default = null) => {
		let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : default;
	}

	/**
	 * 删除cookies
	 *
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	static delCookie = (name) => {
		let exp = new Date();
		exp.setTime(exp.getTime() - 1);
		let cval = getCookie(name);
		if(cval != null){
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}
	}
}