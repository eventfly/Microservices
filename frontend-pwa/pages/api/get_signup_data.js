export default async function handler(req, res) {
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": 'GET, POST, PUT, PATCH, DELETE',
            "Access-Control-Allow-Headers": 'X-Requested-With,content-type',
            "Access-Control-Allow-Credentials": true
        }


    try{
       const data = await axios.post('http://localhost:3000/api/auth/users/signup' , {param: req.body.param}, headers)
        res.status(200).json(data)
     } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
      }
    }