import { Ejecutor_Llamado_Http } from './ejecutor-llamado-http';
import { Registro_Logger_Use_Case } from '../../domain/use-cases/registro-logger-use-case';
import { App_Cifrado_Parly_Registro_Logger } from '../adapters/app-cifrado-parly-registro-logger';
import { Llamado_Http_Use_Case } from '../../domain/use-cases/llamado-http-use-case';
import { App_Multicanal_Registro_Logger } from '../adapters/app-multicanal-registro-logger';

export class SendMessage {
  private readonly _ejecutor_llamado_http = new Llamado_Http_Use_Case(
    new Ejecutor_Llamado_Http()
  );
  private readonly _factory_registro_splunk_cifrado = new Registro_Logger_Use_Case(
    new App_Cifrado_Parly_Registro_Logger()
  );
  private readonly _factory_registro_splunk_multicanal = new Registro_Logger_Use_Case(
    new App_Multicanal_Registro_Logger()
  );

  async sendMessage(
    idConversation: string,
    data: any,
    palabraClave: any,
    tracingId: string,
    botId: string,
    res: any
  ): Promise<any> {
    try {
	  console.log("idConversation entrada sendMessage:", idConversation);
      console.log("data entrada sendMessage:", data);
      console.log("palabraClave entrada sendMessage:", palabraClave);
      console.log("tracingId entrada sendMessage:", tracingId);
      console.log("botId entrada sendMessage:", botId);
      console.log("res entrada sendMessage:", res);

      //Borradotoken
      /*const tokenConversation = await this.tokenSendMessage(
        idConversation,
        tracingId,
        botId
      );*/

      const body = {
        //borradoToken
        //token: tokenConversation.data.respuesta.data,
        
        // context: {
        //   response: {
        //     idResponse: palabraClave,
        //     data,
        //   },
        // },
        idResponse: palabraClave,
        palabraClave: palabraClave,
        idConversacion: idConversation,
        botId: botId,
        data,

      };
      console.log('body', body);
      const url = this.extraerUrlMulticanal(idConversation);
      console.log('extraerUrlMulticanal', url);
      const configuracion = {
        //url: `${url}/${botId}/${process.env.POSTFIJO_BOT_ID}`,
        url: url,
        headers: {
        //   Authorization: `Basic ${process.env.TOKEN_SEND_MESSAGE}`,
           'Content-Type': 'application/json',
         },
        method: 'post',
        data: JSON.stringify(body),
      };
      console.log('configuracion', configuracion);

      const splunk=null;
      //borrado splunk
      // const splunk = this._factory_registro_splunk_multicanal.generar_registro(
      //   tracingId
      // );

      return await this._ejecutor_llamado_http.invocar_peticion(
        configuracion,
        splunk
      );
    } catch (error) {
      res.status(502).send(error);
    }
  }

  async tokenSendMessage(
    idConversation: string,
    tracingId: string,
    botId: string
  ): Promise<any> {
    const body = {
      data: {
        bot_session: idConversation,
        bot_id: botId,
      },
    };

    const configuracion = {
      url: `${process.env.URL_ENCRYPT_ID}`,
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      data: body,
    };

    const splunk = this._factory_registro_splunk_cifrado.generar_registro(
      tracingId
    );
    return await this._ejecutor_llamado_http.invocar_peticion(
      configuracion,
      splunk
    );
  }

  extraerUrlMulticanal(idConversation: string): string {
    let url = process.env.URL_SEND_MESSAGE_WEB_CHAT;
    if (idConversation.includes('whatsapp')) {
      url = process.env.URL_SEND_MESSAGE;
    }
    return url;
  }
}
