
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from './app';
import { EventEditedListener } from './listeners/event-edited-listener';
import { StaffRemovedFromEventListener } from './listeners/staff-removed-from-event-listener';
import { OtpVerifiedListener } from './listeners/otp-verified-listener';
import { StaffAssignedListener } from './listeners/staff-assigned-listener';
import { EventRoleRemovedListener } from './listeners/event-role-removed';
import { natsWrapper } from './nats-wrapper';

// import {runScript} from './analytics/runScript.js'

// import { exec, execFile, fork, spawn } from "child_process";


const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  if (!process.env.MONGO_URI_ORG) {
    throw new Error('MONGO_URI_ORG must be defined')
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
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    )

    natsWrapper.client.on('close', () => {
      // console.log('NATS connection closed');
      process.exit();
    })

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new EventEditedListener(natsWrapper.client).listen();
    new StaffRemovedFromEventListener(natsWrapper.client).listen();
    new OtpVerifiedListener(natsWrapper.client).listen();
    new StaffAssignedListener(natsWrapper.client).listen();
    new EventRoleRemovedListener(natsWrapper.client).listen();

    await mongoose.connect(`${process.env.MONGO_URI_ORG}`, {
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


