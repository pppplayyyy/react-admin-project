import myAxios from './myAxios'
import {BASE_URL} from '../config'

//登录请求
export const reqLogin = (username, password) => myAxios.post(`${BASE_URL}/login`, {username, password})
//获取商品列表请求
export const reqCategoryList = () => myAxios.get(`${BASE_URL}/manage/category/list`)