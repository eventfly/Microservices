
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from './app';
import { OrgCreatedListener } from './listeners/org-created-listener';
import { StaffCreatedListener } from './listeners/staff-created-listener';
import { ProfileEditedListener } from './listeners/profile-edited-listener';
import { StaffRemovedListener} from './listeners/staff-removed-listener';
import { StaffPermissionEditedListener} from './listeners/staff-permission-edited-listener';
import { StaffRoleEditedListener} from './listeners/staff-role-edited-listener';
import { natsWrapper } from './nats-wrapper';
import { ParticipantCreatedListener } from './listeners/participant-created-listener';
import { ParticipantDeletedListener } from './listeners/participant-deleted-listener';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  if (!process.env.MONGO_URI_AUTH) {
    throw new Error('MONGO_URI_AUTH must be defined')
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


    // Listen for events from the NATS Streaming server
    new OrgCreatedListener(natsWrapper.client).listen();
    new StaffCreatedListener(natsWrapper.client).listen();
    new ProfileEditedListener(natsWrapper.client).listen();
    new ParticipantCreatedListener(natsWrapper.client).listen();
    new StaffRemovedListener(natsWrapper.client).listen();
    new StaffPermissionEditedListener(natsWrapper.client).listen();
    new StaffRoleEditedListener(natsWrapper.client).listen();
    new ParticipantDeletedListener(natsWrapper.client).listen();

    await mongoose.connect(`${process.env.MONGO_URI_AUTH}`, {
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


