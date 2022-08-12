import axios from 'axios'

// const authApi = axios.create({
//     baseURL: `http://localhost:3000/api/auth`,
//     headers: {
//       'Authorization': window.localStorage.getItem('token') ,
//       'Content-Type': 'application/json',
//       'withCredentials': true
//     },
//     timeout: 5000
// })


// const orgApi = axios.create({
//     baseURL: `http://localhost:3001/api/org`,
//     headers: {
//       'Authorization': window.localStorage.getItem('token'),
//       'Content-Type': 'application/json',
//       'withCredentials': true
//     },
//     timeout: 5000
// })

// const eventApi = axios.create({
//   baseURL: `http://localhost:3002/api/event`,
//   headers: {
//     'Authorization': window.localStorage.getItem('token'),
//     'Content-Type': 'application/json',
//     'withCredentials': true
//   },
//   timeout: 5000
// })

const getAuthApi = (token) => {
  const api = axios.create({
    baseURL: `http://localhost:3000/api/auth`,
    headers: {
      'Authorization': token ,
      'Content-Type': 'application/json',
      'withCredentials': true
    },
    timeout: 5000
  })

  return api
}

const getOrgApi = (token) => {
  const api = axios.create({
    baseURL: `http://localhost:3001/api/org`,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      'withCredentials': true
    },
    timeout: 5000
  })

  return api
}

const getEventApi = (token) => {
  const api = axios.create({
    baseURL: `http://localhost:3002/api/event`,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      'withCredentials': true
    },
    timeout: 5000
  })

  return api
}


export {getAuthApi, getOrgApi, getEventApi}