import { Message } from "../../incubating/packages/Log_Enumerations";

/**
 * clase que representa la informacion de un registro que se almacenara en logger
 */
export class Registro_Log {

    message_peticion: Message;
    message_exito: Message;
    message_error_respuesta: Message;
    message_error_peticion: Message;
    message_error_desconocido: Message;
    invocation_id: string = '';
    tracing_id: string;
    component: string;
    trace: string = '';
    data: any;
    customer_id: string;
}