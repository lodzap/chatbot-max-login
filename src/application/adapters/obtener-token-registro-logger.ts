import { Abstract_Registro_Logger } from "./abstract-registro-logger";
import { Registro_Log } from "../../domain/model/registro-log";
import { Log_Level, Log_Execution_Point } from "../../incubating/packages/Log_Enumerations";
import { Constantes_Logger } from "./constantes-logger";

/**
 * clase para generar registro de log asociado a la 
 * ejecucion de llamadados a la desencripcion de datos en parly
 */
export class Obtener_Token_Registro_Logger extends Abstract_Registro_Logger {

    /**
     * genera un registro de log asociado a una peticion
     * de desencripcion de datos en parly
     * de mensaje una aplicacion externa
     * @param data 
     */
    generar_registro(data: string): Registro_Log {
        this._logger.tracing_id = data;

        this._logger.message_peticion = this._obtener_mensaje(Constantes_Logger.info_05.codigo, Constantes_Logger.info_05.mensaje,
            Log_Level.INFO, Log_Execution_Point.REQUEST);
        this._logger.message_exito = this._obtener_mensaje(Constantes_Logger.info_06.codigo, Constantes_Logger.info_06.mensaje,
            Log_Level.INFO, Log_Execution_Point.RESPONSE);
        this._logger.message_error_respuesta = this._obtener_mensaje(Constantes_Logger.error_07.codigo, Constantes_Logger.error_07.mensaje,
            Log_Level.ERROR, Log_Execution_Point.RESPONSE);
        this._logger.message_error_peticion = this._obtener_mensaje(Constantes_Logger.error_08.codigo, Constantes_Logger.error_08.mensaje,
            Log_Level.ERROR, Log_Execution_Point.RESPONSE);
        this._logger.message_error_desconocido = this._obtener_mensaje(Constantes_Logger.error_09.codigo, Constantes_Logger.error_09.mensaje,
            Log_Level.FATAL, Log_Execution_Point.RESPONSE);

        return this._logger;
    }

}