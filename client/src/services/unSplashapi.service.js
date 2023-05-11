import axios from 'axios'


class UnSplashApiService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }


    getUnsplash = () => this.app.get('/unsplash')

}


export default UnSplashApiService