const state = {
    token: true, //getToken()
    name: '',
    avatar: '',
    introduction: '',
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // get user info
    getInfo({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            const { roles } = { roles: ['admin'] }
            commit('SET_ROLES', roles)
            resolve({ roles: ['admin'] })
        }).catch(error => {
            reject(error)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}