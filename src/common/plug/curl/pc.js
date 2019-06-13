'use strict'
import axios from 'axios'
import util from 'common/util'
import qs from 'qs';
import LoadingModal from 'components/loadingmodal';
import Toastr from 'components/toastr'
import store from '@/store/index'

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
	loginPage = '/#/'

  	/**
	 * 构造方法
	 *
	 * @param  {[type]} token token密钥
	 * @return {[type]}       [description]
	 */
 	constructor (baseURL, loginPage) {
 		if(typeof(baseURL) == 'string'){
 			this.baseURL = baseURL
 		}
 		if(typeof(loginPage) == 'string'){
 			this.loginPage = loginPage
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
	      	},
	      	// before请求
	      	transformRequest: (data) => {
	      		LoadingModal.start();
	      		return data;
	      	},
	      	// after请求
	      	transformResponse: (data) => {
	      		LoadingModal.finish();
	      		return data;
	      	}
	    }
	    return axios.create(config)
  	}

  	/**
	 * 拦截请求
	 *
	 * @param  {[type]} instance   axios实例
	 * @param  {[type]} url        请求路径
	 * @param  {[type]} automatic  自动处理响应结果
	 * @return {[type]}            [description]
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
	    	let token = store.getters.token
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
		    let {data} = res
		    if(typeof data == 'string'){
		    	data = JSON.parse(data)
		    }
		    // 请求失败
		    if (Boolean(automatic) && data.code !== 1) {
		    	// 未登录,或登录无效
		        if (data.code == 403) {
		          	// 提示登录
					Toastr.send('未登录，或登录失效，请登录')
					// 登出
		          	store.dispatch('logout')
		        }
		        else {
		        	// 上报错误信息
		          	if (data.msg) {
		          		Toastr.send(data.msg)
		          	}
		        }

		        // 拦截请求，不返回结果集
		        return false
		    }
		    // 请求成功返回数据
		    return data
	    }, (error) => {
	      	// 错误响应
			Toastr.send('网络异常，请稍后再试')
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
