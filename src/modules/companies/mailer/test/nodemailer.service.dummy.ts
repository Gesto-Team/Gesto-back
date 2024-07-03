// nodemailer dummy class
export class NodeMailerServiceDummy {
  constructor() {}
  public async sendMail(): Promise<any> {
    throw new Error('Method not implemented');
  }
}
