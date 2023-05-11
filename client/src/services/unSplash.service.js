import axios from 'axios'


class UnSplashService {

    constructor() {
        this.app = axios.create({
            baseURL: 'https://api.unsplash.com/search/photos',
        })
    }


    magicSplash = url => this.app.get(`/${url}`)

}


export default UnSplashService