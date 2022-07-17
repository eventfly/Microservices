import express, { Request, Response } from 'express'
import { requireAuth } from '../../middlewares/require-auth'
import { currentUser } from '../../middlewares/current-user'
const router = express.Router()

router.get('/api/auth/users/currentuser', currentUser, (req: Request, res: Response) => {
    res.status(200).send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }