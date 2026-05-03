import api from './axios'

const AuthApi= {
    login : (email, password) =>{
        return api.post('/login', {email,password})
    },

    logout : () => {
        return api.post('/logout')
    },
    me: () => {
        return api.get('/me')
    }
}

export default AuthApi