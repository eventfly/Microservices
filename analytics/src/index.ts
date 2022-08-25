
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from './app';
import { EventCreatedListener } from './listeners/event-created-listener';
import { EventParticipantAddedListener } from './listeners/event-participant-added-listener';

import { natsWrapper } from './nats-wrapper';
import dotenv from 'dotenv'


dotenv.config();

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  if (!process.env.MONGO_URI_ANALYTICS) {
    throw new Error('MONGO_URI_ANALYTICS must be defined')
  }

  if (!process.env.NATS_URL_ANALYTICS) {
    throw new Error('NATS_CLUSTER_ID must be defined')
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined')
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined')
  }


  try {
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL_ANALYTICS)

    natsWrapper.client.on('close', () => {
      // console.log('NATS connection closed');
      process.exit();
    })

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    // Listen for events from the NATS Streaming server
    new EventCreatedListener(natsWrapper.client).listen();
    new EventParticipantAddedListener(natsWrapper.client).listen();

    await mongoose.connect(`${process.env.MONGO_URI_ANALYTICS}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions);

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err)
  }

  app.listen(3006, () => {
    console.log('Listening on port 3006!!!!!!!!');
  });

}

start()


