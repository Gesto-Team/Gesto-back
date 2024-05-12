export interface IMailer<M> {
  sendMail(data: M): void;
}
