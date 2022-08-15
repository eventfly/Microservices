import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import express, { Request, Response } from 'express';
import { errorHandler } from '../middlewares/error-handler';
import { Staff } from '../models/staff';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/org/remove-staff', [], 
  currentUser, 
  requireAuth, 
  errorHandler, 
  
  async (req: Request, res:Response) => {
  
      const staff = await Staff.deleteOne({"_id": req.body.staffId})

      natsWrapper.client.publish('org-staff:removed', JSON.stringify(
          {
              ref_id: req.body.staffId
          }
      ), () => {
          console.log('Removed Org-Staff published')
      })

      natsWrapper.client.publish('org-staff:removed2', JSON.stringify(
        {
            organizer: req.body.orgId,
            staffId: req.body.staffId
        }
      ), () => {
          console.log('Removed Org-Staff published')
      })


      res.status(201).send({ "message" : "Staff is removed" })
  });


export { router as removeStaffRouter };