import { Autenticacion_Etb_Registro_Logger } from '../../../src/application/adapters/autentiacion-etb-registro-logger';

describe('Set pruebas: Autenticacion_Etb_Registro_Logger', () => {

    it(`dado => una solicitud de registro de logger
        cuando => se genera invocacion de consulta a base de datos
        entonces los codigos de mensajes deben ser INFO-07, INFO-08, ERROR-10, ERROR-11 y ERROR-12`, () => {
        const logger = new Autenticacion_Etb_Registro_Logger();
        const tracing_id = 'b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        const registro = logger.generar_registro(tracing_id);
        
        expect(registro.tracing_id).toBe(tracing_id);
        expect(registro.component).toBe('Ejecutor_Llamado_Http.invocar_peticion()');
        expect(registro.customer_id).toBe('konecta');
        expect(registro.message_peticion.code).toBe('INFO-07');
        expect(registro.message_exito.code).toBe('INFO-08');
        expect(registro.message_error_respuesta.code).toBe('ERROR-10');
        expect(registro.message_error_peticion.code).toBe('ERROR-11');
        expect(registro.message_error_desconocido.code).toBe('ERROR-12');

    });
});