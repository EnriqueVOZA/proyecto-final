import axios from 'axios'


class AuthService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    signup = (data) => this.app.post('/register', data)
    login = (email, password) => this.app.post('/login', { email, password })
    logout = () => this.app.get('/logout')
    isLoggedIn = () => this.app.post('/isLoggedIn')
}


export default AuthService