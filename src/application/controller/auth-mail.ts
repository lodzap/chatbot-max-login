import { Ejecutor_Llamado_Http } from './ejecutor-llamado-http';
import { Fechas } from '../services/fechas';
import { InformacionRequest } from '../services/informacion-request';
import { Llamado_Http_Use_Case } from '../../domain/use-cases/llamado-http-use-case';
import { Registro_Logger_Use_Case } from '../../domain/use-cases/registro-logger-use-case';
import { Autenticacion_Etb_Registro_Logger } from '../adapters/autentiacion-etb-registro-logger';

export class AuthMail {
  private readonly informacionRequest = new InformacionRequest();
  private readonly fechas = new Fechas();
  private readonly _ejecutor_llamado_http = new Llamado_Http_Use_Case(
    new Ejecutor_Llamado_Http()
  );
  private readonly _factory_autenticacion_etb_obtener_token = new Registro_Logger_Use_Case(
    new Autenticacion_Etb_Registro_Logger()
  );

  constructor() {}

  async authMailCompanies(user: string, password: string, tracingId: string) {

    let url = `${process.env.URL_LOGIN_COMPANIAS}?Usuario=${user}&Contrase%C3%B1a=${password}&usr=${process.env.ETB_AUTH_USR}&pwd=${process.env.ETB_AUTH_PWD}`;
    let configuracion = {
      headers: {
        accept: 'application/json',
        'accept-language': 'es-419,es;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'max-age=0',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
      referrerPolicy: 'no-referrer-when-downgrade',
      body: null,
      method: 'GET',
      mode: 'cors',
    };
    const splunk = this._factory_autenticacion_etb_obtener_token.generar_registro(
      tracingId
    );
    console.log('authMailCompanies url', url);
    console.log('authMailCompanies ', JSON.stringify(configuracion));
    return await this._ejecutor_llamado_http.invocar_peticion_fetch(
      url,
      configuracion,
      splunk
    );
  }

  async authMail(
    mail: string,
    password: string,
    token: string,
    req: any
  ): Promise<any> {
    const data = {
      WSRequestHeader: {
        System: {
          name: 'MAX',
          correlationID: `MAX-${req.tracingId}`,
          processingServer: null,
        },
        Property: [
          {
            name: null,
            value: null,
          },
          {
            name: null,
            value: null,
          },
        ],
      },
      WSRequestBody: {
        Mail: mail,
        Password: password,
        Type: 'MAX',
        Remind_Me: false,
        Audit: {
          Canal: process.env.CANAL,
          IP_Address: this.informacionRequest.extraerDireccionIp(req),
          IP_Latitud: '4.8094',
          IP_Longitude: '-74.0980',
          IP_City: 'BOGOTA',
          IP_Country: 'COLOMBIA',
          Date: this.fechas.getFecha(),
          Hour: this.fechas.getHOur(),
          WhatsApp_Phone_Number: this.informacionRequest.extraerNroWhatsapp(
            req
          ),
          Facebook_User: null,
          Twitter_User: null,
        },
      },
    };

    const configuracion = {
      url: `${process.env.URL_AUTHMAIL_API}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'post',
      data: data,
    };
    const splunk=null;
    //Elimina splunk
    /*const splunk = this._factory_autenticacion_etb_obtener_token.generar_registro(
      req.tracingId
    );*/
    return await this._ejecutor_llamado_http.invocar_peticion(
      configuracion,
      splunk
    );
  }
}
