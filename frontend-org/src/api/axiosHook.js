import axios from 'axios'

const authApi = axios.create({
    baseURL: `http://localhost:3000/api/auth`,
    headers: {
      authorization: ' xxxxxxxxxx' ,
      'Content-Type': 'application/json',
      'withCredentials': true,
      'x-access-token': 'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall5WkdWaU5qUTVObU0yTnpCa1pqa3dNbU13WXpKalpDSXNJbVZ0WVdsc0lqb2ljbTl0Wld3dWNtTnpRR2R0WVdsc0xtTnZiU0lzSW01aGJXVWlPaUpVWVc1NmFXMGdTRzl6YzJGcGJpQlNiMjFsYkNJc0ltbGhkQ0k2TVRZMU9Ea3hOVFEyTm4wLjBwakl5eFNLR2xPN1N6R2hFTWpYMkMzbzFfdUhrRWZyX1ZsNGZUWEJpODQifQ==; path=/; samesite=none; httponly'
    },
    timeout: 5000
})


const orgApi = axios.create({
    baseURL: `http://localhost:3001/api/org`,
    headers: {
      authorization: ' xxxxxxxxxx' ,
      'Content-Type': 'application/json',
      'withCredentials': true, 
      'x-access-token': 'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall5WkdWaU5qUTVObU0yTnpCa1pqa3dNbU13WXpKalpDSXNJbVZ0WVdsc0lqb2ljbTl0Wld3dWNtTnpRR2R0WVdsc0xtTnZiU0lzSW01aGJXVWlPaUpVWVc1NmFXMGdTRzl6YzJGcGJpQlNiMjFsYkNJc0ltbGhkQ0k2TVRZMU9Ea3hOVFEyTm4wLjBwakl5eFNLR2xPN1N6R2hFTWpYMkMzbzFfdUhrRWZyX1ZsNGZUWEJpODQifQ==; path=/; samesite=none; httponly'
    },
    timeout: 5000
})

export {authApi, orgApi}