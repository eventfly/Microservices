import { Stan } from 'node-nats-streaming';



export abstract class Publisher {
  abstract subject: any;
  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        console.log('Event published to subject', this.subject);
        resolve();
      });
    });
  }
}
