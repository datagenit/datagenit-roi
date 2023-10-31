import axios from 'axios';

export default axios.create({
    baseURL: 'https://authkey.io/',
    withCredentials: false,
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });