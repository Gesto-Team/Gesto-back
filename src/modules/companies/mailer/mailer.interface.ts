export abstract class MailerProvider<M> {
  sendMail: (data: M) => void;
}
