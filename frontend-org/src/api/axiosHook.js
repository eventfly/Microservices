import axios from 'axios'

const authApi = axios.create({
    baseURL: `http://localhost:3000/api/auth`,
    headers: {
      authorization: ' xxxxxxxxxx' ,
      'Content-Type': 'application/json',
      'withCredentials': true
    },
    timeout: 5000
})


const orgApi = axios.create({
    baseURL: `http://localhost:3001/api/org`,
    headers: {
      authorization: ' xxxxxxxxxx' ,
      'Content-Type': 'application/json',
      'withCredentials': true
    },
    timeout: 5000
})

export {authApi, orgApi}