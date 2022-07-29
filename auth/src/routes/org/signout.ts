import express from 'express'

const router = express.Router()

router.post('/api/auth/org/signout', (req, res) => {
    req.session = null
    res.send({ message: 'Successfully signed out' })
})


export { router as OrgSignoutRouter }