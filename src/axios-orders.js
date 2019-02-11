import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-e398e.firebaseio.com/'
});


export default instance;
