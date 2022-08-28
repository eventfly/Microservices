import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import express, { Request, Response } from 'express';
import { errorHandler } from '../middlewares/error-handler';
import { Event } from '../models/event';
import { Participant } from '../models/participant';
import { BadRequestError } from '../errors/bad-request-error';
import {spawn} from 'child_process';
import {cwd} from 'process'

const router = express.Router();

router.post('/api/analytics/events/no-loc', [

], 
currentUser, 
requireAuth, 
errorHandler, 

async (req: Request, res:Response) => {
    
    let {participantId} = req.body;

    const events = await Event.find({ }).populate('organizer')
    console.log(events.length)

    const participant = await Participant.find({_id: participantId})

    console.log(participant.length)
    console.log("running py script... ")

    let dataToSend : any;
    const python = spawn('python3', [
        `${cwd()}/src/recommender-no-loc.py`, 
        JSON.stringify(events), 
        JSON.stringify(participant)
    ]);

    python.stdout.on('data', function (data : any) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });

    python.stderr.on('data', function (data : any) {
        console.log(`stderr: ${data}`);
        throw new BadRequestError(
            'Error while running script'
        )
    });

    python.on('close', (code : any) => {
        console.log(`child process close all stdio with code ${code}`);
        dataToSend = dataToSend.split('\n')

        dataToSend = dataToSend.filter((item : any)=>{
            return !(item.includes('dtype: object') || item == '')
        })

        dataToSend = dataToSend.map((item : any)=>{
            return item.substring(5)
        })

        console.log(dataToSend)
    
        res.status(200).send({events: dataToSend});
    
    });

});

export { router as orderedEventsNoLocationRouter };