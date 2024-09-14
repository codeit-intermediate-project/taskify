import axios from 'axios';

const localInstance = axios.create({
  baseURL: process.env.LOCAL_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default localInstance;
