'use strict'
import axios from 'axios'
import qs from 'qs';
import util from 'common/util'
import Router from 'vue-router'
import Toast from 'components/toast'

/**
 * 封装Axios请求服务
 *
 * @author Mon
 * @version v1.0
 */
export default class Curl
{
	/**
	 * 请求根路径
	 *
	 * @type {String}
	 */
	baseURL = '';

	/**
	 * 跳转登录页
	 *
	 * @type {String}
	 */
	loginPage = 'index'

	/**
	 * 请求token名称
	 *
	 * @type {String}
	 */
	token_name = 'Mon_curl_token';

  	/**
	 * 构造方法
	 *
	 * @param  {[type]} token token密钥
	 * @return {[type]}       [description]
	 */
 	constructor (baseURL, loginPage, token_name) {
 		if(typeof(baseURL) == 'string'){
 			this.baseURL = baseURL
 		}
 		if(typeof(loginPage) == 'string'){
 			this.loginPage = loginPage
 		}
 		if(typeof(token_name) == 'string'){
 			this.token_name = token_name
 		}
  	}

  	/**
	 * 创建实例
	 *
	 * @return {[type]} [description]
	 */
  	create () {
    	let config = {
	     	baseURL: this.baseURL,
	      	timeout: 3000,
	      	headers: {
	        	'Content-Type': 'application/json; charset=utf-8',
	      	}
	    }
	    return axios.create(config)
  	}

  	/**
	 * 拦截请求
	 *
	 * @param  {[type]} instance axios实例
	 * @param  {[type]} url      请求路径
	 * @return {[type]}          [description]
	 */
  	interceptors (instance, url, automatic) {
    	// 添加请求拦截器
	    instance.interceptors.request.use((config) => {
	    	let _conf = config
	    	// 判断post请求，修正请求
	    	if(config.method == 'post'){
	    		_conf.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	    		_conf.data = qs.stringify(config.data)
	    	}
	    	// GET请求，处理参数
	    	if(config.method == 'get' && config.data != '' && config.data != undefined){
	    		let uri = util.urlEncode(config.data)
	    		_conf.url = _conf.url +  (_conf.url.indexOf('?') == '-1' ? '?' +  uri.substr(1) :  uri)
	    	}

	    	// 注入请求token
	    	let token = util.getToken(this.token_name)
	    	if(token){
	    		_conf.headers['X-AUTH-TOKEN'] = token
	    	}

	    	// TODO 还可以处理下一下数据包装

	      	return _conf
	    }, error => {
	      	// 请求错误
	      	return Promise.reject(error)
	    })

	    // 添加响应拦截器
	    instance.interceptors.response.use((res) => {
		    let { data } = res
		    // 请求失败
		    if (Boolean(automatic) && data.code !== 1) {
		    	// 未登录,或登录无效
		        if (data.code === 401 || data.code === 403) {
		        	// 删除无效的token
		          	util.unsetToken(this.token_name);
		          	// 提示登录
		         	Toast({
						message: '未登录，或登录失效，请登录',
						position: 'bottom',
						duration: 3000
					});
					// 跳转登录页
		          	Router.push({
		          		name: this.loginPage
		          	})
		        }
		        else {
		        	// 上报错误信息
		          	if (data.msg) {
		          		Toast({
		          			message: data.msg,
							position: 'bottom',
							duration: 3000
		          		})
		          	}
		        }

		        // 拦截请求，不返回结果集
		        return false
		    }
		    // 请求成功返回数据
		    return data
	    }, (error) => {
	      	// 错误响应
	      	Toast({
				message: '网络异常，请稍后再试',
				position: 'bottom',
				duration: 3000
			});
	      	return Promise.reject(error)
	    })
  	}

  	/**
	 * 请求实例
	 *
	 * @return {[type]} [description]
	 */
  	query (options) {
    	let instance = this.create()
    	let automatic = typeof options.automatic == 'undefined' ? true : options.automatic
    	this.interceptors(instance, options.url, automatic)
    	options = Object.assign({}, options)
    	return instance(options)
  	}
}