
/**
 * Log level.
 * TRACE: mayor detalle que debug.
 * DEBUG: mensaje de debug.
 * INFO: mensaje informativo.
 * WARNING: mensaje de advertencia. Es algo que no causa un error pero que requiere de atención.
 * ERROR: error del cual la aplicacion puede recuperarse.
 * FATAL: error del cual la aplicacion no puede recuperarse.
 */
export enum Log_Level {
    TRACE = 'TRACE',
    DEBUG = 'DEBUG',
	INFO = 'INFO',
	WARNING = 'WARNING',
	ERROR = 'ERROR',
	FATAL = 'FATAL'
}

/**
 * Log Execution Point.
 * ¿En que punto de la ejecucion ocurió el evento?
 */
export enum Log_Execution_Point {
	REQUEST = 'REQUEST',
	RESPONSE = 'RESPONSE',
	PROCESSING = 'PROCESSING'
}

export const log_messages = new Map<string, string>()

export class Message {
	code: string
	message: string
	level: Log_Level
	executionPoint: Log_Execution_Point
}

//Cree mensajes.

export class Mensajes_Usuario {

	static inicio_creacion_usuario: Message = {
		code: "INFO-01",
		message: "Inicia creación de usuario.",
		level: Log_Level.INFO,
		executionPoint: Log_Execution_Point.REQUEST
	}

	static exito_creacion_usuario: Message = 
	{
		code: "INFO-02",
		message: "Éxito creando usuario.",
		level: Log_Level.INFO,
		executionPoint: Log_Execution_Point.RESPONSE
	}

	static error_creacion_usuario: Message =
	{
		code: "ERROR-01",
		message: "Error creando usuario.",
		level: Log_Level.ERROR,
		executionPoint: Log_Execution_Point.RESPONSE
	}

}