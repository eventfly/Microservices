import axios from 'axios'

const authApi = axios.create({
    baseURL: `http://localhost:3000/api/auth`,
    headers: {
      'Authorization': window.localStorage.getItem('token') ,
      'Content-Type': 'application/json',
      'withCredentials': true
    },
    timeout: 5000
})


const orgApi = axios.create({
    baseURL: `http://localhost:3001/api/org`,
    headers: {
      'Authorization': window.localStorage.getItem('token'),
      'Content-Type': 'application/json',
      'withCredentials': true
    },
    timeout: 5000
})

const eventApi = axios.create({
  baseURL: `http://localhost:3002/api/event`,
  headers: {
    'Authorization': window.localStorage.getItem('token'),
    'Content-Type': 'application/json',
    'withCredentials': true
  },
  timeout: 5000
})


export {authApi, orgApi, eventApi}