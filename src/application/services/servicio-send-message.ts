import { SendMessage } from '../controller/send-message';

export class ServiceSendMessage {
  async sendMessage(
    idConversacion: string,
    data: any,
    palabraClave: string,
    tracingId: string,
    botId: string,
    res: any
  ): Promise<any> {
    return await new SendMessage().sendMessage(
      idConversacion,
      data,
      palabraClave,
      tracingId,
      this.extraerBotId(botId),
      res
    );
  }

  extraerBotId(botId: string): string {
    return botId || process.env.BOT_ID;
  }
}
