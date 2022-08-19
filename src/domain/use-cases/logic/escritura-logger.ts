import { Registro_Log } from "../../model/registro-log";
import { Tipo_Peticion } from "../../model/tipo-peticion";

/**
 * contrato para escribir registros en logger
 */
export interface Escritura_Logger {

    /**
     * escribe un registro en logger se el tipo de peticion
     * @param logger registro logger
     * @param data data
     * @param tipo_peticion tipo de peticion 
     */
    escribir_registro(logger: Registro_Log, data: any, tipo_peticion: Tipo_Peticion): void;

}