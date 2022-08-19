import { Escritura_Logger } from "./logic/escritura-logger";
import { Registro_Log } from "../model/registro-log";
import { Tipo_Peticion } from "../model/tipo-peticion";

/**
 * servicio de negocio para escribir registros en logger
 */
export class Escritura_Logger_Use_Case {

    private _escritura_splunk: Escritura_Logger;

    /**
     * 
     * @param escritura_splunk escritura_logger
     */
    constructor(escritura_splunk: Escritura_Logger) {
        this._escritura_splunk = escritura_splunk;
    }

    /**
     * escribe un registro en logger se el tipo de peticion
     * @param logger registro logger
     * @param data data
     * @param tipo_peticion tipo de peticion 
     */
    escribir_registro(logger: Registro_Log, data: any, tipo_peticion: Tipo_Peticion): void {
        this._escritura_splunk.escribir_registro(logger, data, tipo_peticion);
    }

}