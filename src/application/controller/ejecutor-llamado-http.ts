import axios from 'axios';
const fetch = require('node-fetch');
import { Logger_Splunk } from '../services/logger-splunk';
import { Registro_Log } from '../../domain/model/registro-log';
import { Llamado_Http } from '../../domain/use-cases/logic/llamado-http';
import { Escritura_Logger_Use_Case } from '../../domain/use-cases/escritura-logger-use-case';
import { Tipo_Peticion } from '../../domain/model/tipo-peticion';

/**
 * clase que centraliza la ejecución de todos los llamados http
 */
export class Ejecutor_Llamado_Http implements Llamado_Http {
  private readonly _logger = new Escritura_Logger_Use_Case(new Logger_Splunk());

  /**
   * invoca una peticion http a traves de la libreria axios
   * @param configuracion configuracion request
   * @param logger informacion splunk
   */
  async invocar_peticion(
    configuracion: any,
    logger: Registro_Log
  ): Promise<any> {
    const init = new Date().getTime();
    //eliminado splunk
    /*this._logger.escribir_registro(
      logger,
      configuracion,
      Tipo_Peticion.PETICION
    );*/

    return await axios
      .request(configuracion)
      .then((response) => {
        //eliminado splunk
        /*const end = new Date().getTime();
        const data = this._extraer_informacion_response(response, init, end);

        
        this._logger.escribir_registro(
          logger,
          data,
          Tipo_Peticion.EXITO_PETICION
        );*/
        console.log(response.data);
        return response;
      })
      .catch((error) => {
        const end = new Date().getTime();
        if (error.response) {
          //eliminado splunk
          /*const data = this._extraer_informacion_response(
            error.response,
            init,
            end
          );
          
          this._logger.escribir_registro(
            logger,
            data,
            Tipo_Peticion.ERROR_RESPUESTA
          );*/
          return error.response;
        } else if (error.request) {
          //eliminado splunk
          /*const total = (end - init) / 1000;
          const msg = `${total} segundos`;
          const data = { message: error.message, tiempoPeticion: msg };
          
          /*this._logger.escribir_registro(
            logger,
            data,
            Tipo_Peticion.ERROR_PETICION
          );*/
          return error.request;
        } else {
          //eliminado splunk
          /*this._logger.escribir_registro(
            logger,
            error.message,
            Tipo_Peticion.ERROR_DESCONOCIDO
          );*/
          return error;
        }
      });
  }

  /**
   * Invocars peticion fetch
   * @param url
   * @param configuracion
   * @param logger
   * @returns
   * invica una peticion http por fetch
   */
  async invocar_peticion_fetch(url, configuracion: any, logger: Registro_Log) {
    const init = new Date().getTime();
    try {
      this._logger.escribir_registro(
        logger,
        configuracion,
        Tipo_Peticion.PETICION
      );
      let response = await fetch(url, configuracion);
      let datos = await response.json();
      const end = new Date().getTime();
      const data = this._extraer_informacion_response(response, init, end);
      this._logger.escribir_registro(
        logger,
        data,
        Tipo_Peticion.EXITO_PETICION
      );
      return datos;
    } catch (error) {
      const end = new Date().getTime();
      if (error.response) {
        const data = this._extraer_informacion_response(
          error.response,
          init,
          end
        );
        this._logger.escribir_registro(
          logger,
          data,
          Tipo_Peticion.ERROR_RESPUESTA
        );
        return error.response;
      } else if (error.request) {
        const total = (end - init) / 1000;
        const msg = `${total} segundos`;
        const data = { message: error.message, tiempoPeticion: msg };
        this._logger.escribir_registro(
          logger,
          data,
          Tipo_Peticion.ERROR_PETICION
        );
        return error.request;
      } else {
        this._logger.escribir_registro(
          logger,
          error.message,
          Tipo_Peticion.ERROR_DESCONOCIDO
        );
        return error;
      }
    }
  }

  /**
   * extraer la informacion del status, texto, headers y data del argumento response
   * @param response
   */
  private _extraer_informacion_response(
    response: any,
    init: number,
    end: number
  ): any {
    const total = (end - init) / 1000;
    const resultado = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      tiempoPeticion: `${total} segundos`,
      data: response.data,
    };
    return resultado;
  }
}
