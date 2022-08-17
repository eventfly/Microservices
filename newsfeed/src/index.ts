
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from './app';
import { EventCreatedListener } from './listeners/event-created-listener';
import { EventParticipantAddedListener } from './listeners/event-participant-added-listener';
import { ParticipantCreatedListener } from './listeners/participant-created-listener';
import { StaffAssignedListener } from './listeners/staff-assigned-listener';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  if (!process.env.MONGO_URI_AUTH) {
    throw new Error('MONGO_URI_NEWSFEED must be defined')
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }


  try {
    // Connect to NATS Streaming server
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

   
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    })

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new ParticipantCreatedListener(natsWrapper.client).listen();
    new EventCreatedListener(natsWrapper.client).listen();
    new StaffAssignedListener(natsWrapper.client).listen();
    new EventParticipantAddedListener(natsWrapper.client).listen();

    await mongoose.connect(`${process.env.MONGO_URI_NEWSFEED}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions)

    console.log('Connected to MongoDB')
  } catch (err) {
    console.error(err)
  }


  // Start the HTTP server

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });

}

start()


