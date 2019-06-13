export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') || '',
    },
    getters: {
        token(state) {
            return state.token
        },
    },
    mutations: {
        login(state, data){
            localStorage.setItem('token', data.token)
            state.token = data.token
        },
        logout(state, data){
            localStorage.removeItem('token')
            state.token = ''
        }
    },
    actions: {

    },
}