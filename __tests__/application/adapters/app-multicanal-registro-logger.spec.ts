import { App_Multicanal_Registro_Logger } from '../../../src/application/adapters/app-multicanal-registro-logger';

describe('Set pruebas: App_Multicanal_Registro_Logger', () => {

    it(`dado => una solicitud de registro de logger
        cuando => se genera invocacion de app externa a una interna
        entonces los codigos de mensajes deben ser INFO-03, INFO-04, ERROR-04, ERROR-05 y ERROR-06`, () => {
        const logger = new App_Multicanal_Registro_Logger();
        const tracing_id = 'b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        const registro = logger.generar_registro(tracing_id);
        
        expect(registro.tracing_id).toBe(tracing_id);
        expect(registro.component).toBe('Ejecutor_Llamado_Http.invocar_peticion()');
        expect(registro.customer_id).toBe('konecta');
        expect(registro.message_peticion.code).toBe('INFO-03');
        expect(registro.message_exito.code).toBe('INFO-04');
        expect(registro.message_error_respuesta.code).toBe('ERROR-04');
        expect(registro.message_error_peticion.code).toBe('ERROR-05');
        expect(registro.message_error_desconocido.code).toBe('ERROR-06');

    });
});