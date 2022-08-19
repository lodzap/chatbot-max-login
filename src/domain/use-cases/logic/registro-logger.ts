import { Registro_Log } from "../../model/registro-log";

/**
 * contrato para generar un registro de logger
 */
export interface Registro_Logger {

    /**
     * genera un registro de logger
     * @param data datos para completar el registro de logger
     */
    generar_registro(data: any): Registro_Log;
}