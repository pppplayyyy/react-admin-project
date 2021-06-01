import { message } from 'antd'
import axios from 'axios'
import qs from 'querystring'

const instance = axios.create({
    timeout: 4000
})

instance.interceptors.request.use((config) => {
    const {method, data} = config
    if(method.toLowerCase === "post"){
        if(data instanceof Object){
            config.data = qs.stringify(data)
        }
    }
    return config
})

instance.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        message.error(error.message, 2)
        return Promise.reject(error)
    }
)

export default instance