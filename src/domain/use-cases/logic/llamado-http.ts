import { Registro_Log } from '../../model/registro-log';

/**
 * contrato para ejecutar un llamado http
 */
export interface Llamado_Http {
  /**
   * invoca un llamado http
   * @param configuracion configuracion request
   * @param splunk informacion de registro de splunk
   */
  invocar_peticion(configuracion: any, splunk: Registro_Log): Promise<any>;

  /**
   * invoca un llamado http
   * @param configuracion configuracion request
   * @param splunk informacion de registro de splunk
   */
  invocar_peticion_fetch(
    url: string,
    configuracion: any,
    splunk: Registro_Log
  ): Promise<any>;
}
