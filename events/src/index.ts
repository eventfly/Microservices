
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from './app';
import { EventCreatedListener } from './listeners/event-created-listener';
import { StaffCreatedListener } from './listeners/staff-created-listener';
import { StaffProfileEditedListener } from './listeners/staffProfile-edited-listener';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  if (!process.env.MONGO_URI_EVENT) {
    throw new Error('MONGO_URI_EVENT must be defined')
  }

  if (!process.env.NATS_URL) {
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
      process.env.NATS_URL)

    natsWrapper.client.on('close', () => {
      // console.log('NATS connection closed');
      process.exit();
    })

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    // Listen for events from the NATS Streaming server
    new EventCreatedListener(natsWrapper.client).listen();
    new StaffCreatedListener(natsWrapper.client).listen();
    new StaffProfileEditedListener(natsWrapper.client).listen();

    await mongoose.connect(`${process.env.MONGO_URI_EVENT}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions);

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });

}

start()


