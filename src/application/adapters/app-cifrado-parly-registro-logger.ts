import { Abstract_Registro_Logger } from "./abstract-registro-logger";
import { Registro_Log } from "../../domain/model/registro-log";
import { Log_Level, Log_Execution_Point } from "../../incubating/packages/Log_Enumerations";
import { Constantes_Logger } from "./constantes-logger";

/**
 * clase para generar registro de log asociado a la 
 * ejecucion de llamadados de aplicaciones internas a externas
 */
export class App_Cifrado_Parly_Registro_Logger extends Abstract_Registro_Logger {

    /**
     * genera un registro de log asociado a una peticion
     * de una aplicacion interna que tiene como destino
     * de mensaje una aplicacion externa
     * @param data 
     */
    generar_registro(data: string): Registro_Log {
        this._logger.tracing_id = data;

        this._logger.message_peticion = this._obtener_mensaje(Constantes_Logger.info_01.codigo, Constantes_Logger.info_01.mensaje,
            Log_Level.INFO, Log_Execution_Point.REQUEST);
        this._logger.message_exito = this._obtener_mensaje(Constantes_Logger.info_02.codigo, Constantes_Logger.info_02.mensaje,
            Log_Level.INFO, Log_Execution_Point.RESPONSE);
        this._logger.message_error_respuesta = this._obtener_mensaje(Constantes_Logger.error_01.codigo, Constantes_Logger.error_10.mensaje,
            Log_Level.ERROR, Log_Execution_Point.RESPONSE);
        this._logger.message_error_peticion = this._obtener_mensaje(Constantes_Logger.error_02.codigo, Constantes_Logger.error_11.mensaje,
            Log_Level.ERROR, Log_Execution_Point.RESPONSE);
        this._logger.message_error_desconocido = this._obtener_mensaje(Constantes_Logger.error_03.codigo, Constantes_Logger.error_12.mensaje,
            Log_Level.FATAL, Log_Execution_Point.RESPONSE);

        return this._logger;
    }

}