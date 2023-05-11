import axios from 'axios'

class UploadsService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/upload`,
            withCredentials: true
        })
    }

    uploadImage = image => this.app.post('/image', image)
}

export default UploadsService