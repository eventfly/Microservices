import axios from 'axios'

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

const getNewsfeedApi = (token) => {
  const api = axios.create({
    baseURL: `http://localhost:3003/api/newsfeed`,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      'withCredentials': true
    },
    timeout: 5000
  })

  return api
}


const getParticipantApi = (token) => {
  const api = axios.create({
    baseURL: `http://localhost:3004/api/participant`,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      'withCredentials': true
    },
    timeout: 5000
  })

  return api
}

const getPaymentApi = (token) => {
  const api = axios.create({
    baseURL: `http://localhost:3005/api/payment`,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      'withCredentials': true
    },
    timeout: 5000
  })

  return api
}


const getAnalyticsApi = (token) => {
  const api = axios.create({
    baseURL: `http://localhost:3006/api/analytics`,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      'withCredentials': true
    },
    timeout: 5000
  })

  return api
}

const getMailApi = (token) => {
  const api = axios.create({
    baseURL: `http://localhost:8000`,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    timeout: 5000
  })

  return api
}




export {getAuthApi, getOrgApi, getEventApi, getNewsfeedApi, getParticipantApi, getPaymentApi, getAnalyticsApi, getMailApi}

