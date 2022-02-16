import axios from 'axios';

// const url = 'http://localhost:5000';

const url = 'https://guas.herokuapp.com';
//User related connection
export const createUser = (data, uid) => axios.post(url + `/user/signup/${uid}`, data);
export const createUser2 = (data) => axios.post(url + `/user/signup2`, data)
export const verifyUser = (data) => axios.post(url + `/user/login`,{data});
export const finalVerifyUser = (data) => axios.post(url + `/user/login/verify`,{ data});
export const fetchOptions = () => axios.get(url + `/user/signupOptions`);
export const checkLogin = () => axios.get(url + `/user/check`);
export const userLogout = () => axios.get(url + `/user/logout`);