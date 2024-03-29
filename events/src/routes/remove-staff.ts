import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import express, { Request, Response } from 'express';
import { errorHandler } from '../middlewares/error-handler';
import { Event } from '../models/event';
import { natsWrapper } from '../nats-wrapper';
import { roleControl, permissionControl } from '../middlewares/access-control';

const router = express.Router();

router.post('/api/event/:id/remove-staff', [], 
  currentUser, 
  requireAuth, 
  errorHandler,
  permissionControl('Admin', 'Edit Role'), 

  async (req: Request, res:Response) => {
      console.log(req.params.id)
      console.log(req.body)
      
      const event = await Event.findOneAndUpdate({"ref_id": req.params.id}, {
          $pull: {
            staffs: {
              ref_id: req.body.staffId
            }
          }
        }, {
          new: true,
          runValidators: true
      })

      natsWrapper.client.publish('staff:removed', JSON.stringify(
          {
              eventId: req.params.id, 
              ref_id: req.body.staffId
          }
      ), () => {
          console.log('Removed Staff published')
      })

      res.status(201).send({ event })
  });

export { router as removeStaffRouter };