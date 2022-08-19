import Log from "../../incubating/packages/Log";
import { Message } from "../../incubating/packages/Log_Enumerations";
import { Escritura_Logger } from "../../domain/use-cases/logic/escritura-logger";
import { Registro_Log } from "../../domain/model/registro-log";
import { Tipo_Peticion } from "../../domain/model/tipo-peticion";

/**
 * clase base para escribir registros en splunk
 */
export class Logger_Splunk implements Escritura_Logger {

    /**
     * escribe un registro en splunk se el tipo de peticion
     * @param logger registro splunk
     * @param data data
     * @param tipo_peticion tipo de peticion 
     */
    escribir_registro(logger: Registro_Log, data: any, tipo_peticion: Tipo_Peticion): void {
        let message: Message;
        switch (tipo_peticion) {
            case Tipo_Peticion.PETICION:
                message = logger.message_peticion;
                break;
            case Tipo_Peticion.EXITO_PETICION:
                message = logger.message_exito;
                break;
            case Tipo_Peticion.ERROR_RESPUESTA:
                message = logger.message_error_respuesta;
                break;
            case Tipo_Peticion.ERROR_PETICION:
                message = logger.message_error_peticion;
                break;
            case Tipo_Peticion.ERROR_DESCONOCIDO:
                message = logger.message_error_desconocido;
                break;
        }
        Log.log(message, logger.invocation_id, logger.tracing_id, logger.component,
            logger.trace, data, logger.customer_id)
    }

}