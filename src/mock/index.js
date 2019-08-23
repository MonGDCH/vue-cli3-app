import Mock from 'mockjs'

/**
 * 统一成功返回
 */
const success = () => {
    return {
        code: 1,
        msg: 'ok',
        data: [],
    }
}

/**
 * 统一失败返回
 */
const error = () => {
    return {
        code: 0,
        msg: 'faile',
        data: [],
    }
}

// 登陆
Mock.mock('/admin/login', 'post', success);