import { Registro_Logger } from "./logic/registro-logger";
import { Registro_Log } from "../model/registro-log";

/**
 * clase de servicios para generar registros de logger
 */
export class Registro_Logger_Use_Case {

    private _registro_logger: Registro_Logger;

    /**
     * 
     * @param registro_logger 
     */
    constructor(registro_logger: Registro_Logger) {
        this._registro_logger = registro_logger;
    }

    /**
     * genera un registro de logger
     * @param data datos para completar el registro
     */
    generar_registro(data: any): Registro_Log {
        return this._registro_logger.generar_registro(data);
    }
}