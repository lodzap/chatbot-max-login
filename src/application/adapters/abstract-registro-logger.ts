import { Log_Level, Log_Execution_Point, Message } from "../../incubating/packages/Log_Enumerations";
import { Registro_Logger } from "../../domain/use-cases/logic/registro-logger";
import { Registro_Log } from "../../domain/model/registro-log";

/**
 * clase de abstraccion para registros personalizados de logger
 */
export abstract class Abstract_Registro_Logger implements Registro_Logger {

    protected _logger: Registro_Log;

    constructor() {
        this._logger = new Registro_Log();
        this._logger.customer_id = 'konecta';
        this._logger.component = 'Ejecutor_Llamado_Http.invocar_peticion()';
    }

    abstract generar_registro(data: string): Registro_Log;

    /**
     * genera mensaje de escritura para logger
     * @param code 
     * @param message 
     * @param level 
     * @param execution_point 
     */
    protected _obtener_mensaje(code: string, message: string,
        level: Log_Level, execution_point: Log_Execution_Point): Message {
        const msg: Message = new Message();
        msg.code = code;
        msg.message = message;
        msg.level = level;
        msg.executionPoint = execution_point;
        return msg;
    }

}