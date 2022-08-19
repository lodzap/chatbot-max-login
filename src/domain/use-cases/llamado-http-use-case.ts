import { Llamado_Http } from './logic/llamado-http';
import { Registro_Log } from '../model/registro-log';

/**
 * servicio de negocio para invocar llamados http
 */
export class Llamado_Http_Use_Case {
  private _llammado_http: Llamado_Http;

  constructor(llammado_http: Llamado_Http) {
    this._llammado_http = llammado_http;
  }

  /**
   * invoca una peticion http
   * @param configuracion configuracion request
   * @param splunk registro splunk
   */
  invocar_peticion(configuracion: any, splunk: Registro_Log): Promise<any> {
    return this._llammado_http.invocar_peticion(configuracion, splunk);
  }

  /**
   * invoca una peticion http
   * @param configuracion configuracion request
   * @param splunk registro splunk
   */
  invocar_peticion_fetch(
    url: string,
    configuracion: any,
    splunk: Registro_Log
  ): Promise<any> {
    return this._llammado_http.invocar_peticion_fetch(
      url,
      configuracion,
      splunk
    );
  }
}
