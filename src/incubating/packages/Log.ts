import { Endpoint } from '../../presentation/endpoint';
import { Log_Execution_Point, Log_Level, Message } from './Log_Enumerations';
import axios from 'axios';
import * as log4js from 'log4js';
const logger = log4js.getLogger();
logger.level = 'debug';

const moment = require('moment-timezone');
moment.locale('es');

/**
 * Clase para enviar mensajes al logger de productos.
 * 
 * Los campos que se llenan usualmente desde "afuera" son:
 * - message_with_code
 * - invocation_id
 * - tracing_id
 * - customer_id
 * - component
 * - trace
 * - data
 */
export default class Log {

    /**
     * Mensaje estructurado.
     */
    message_with_code: Message

    /**
     * Fecha hora del evento.
     */
    private date: string

    /**
     * ID del producto que está dejando su traza.
     */
    private product_id: string

    /**
     * Gran sistema compuesto de varias aplicaciones/microservicios.
     */
    private system_id: string

    /**
     * Aplicacion, microservicio, etc., que compone el sistema.
     */
    private aplication: string

    /**
     * Invocation id: un UUID (sin los guiones) generado al azar en el cliente del servicio.
     */
    invocation_id: string;

    /**
     * Tracing id: un UUID (sin los guiones) generado al azar en el cliente del servicio.
     * Si no hay invocation_id, se llena con un UUID al azar.
     * Si no se recibe vacio, entonces se conserva el valor recibido.
     * Este valor se transmite a los servicios que se invocan para atender la peticion, 
     * enviandolo en el tracing_id.
     */
    tracing_id: string; //llenarlo al azar en el servidor.
    /**
     * Son los datos que se desea guardar.
     */
    data: any;
    /**
     * Momento de la ejecución cuando ocurre el evento.
     */
    private executionPoint: Log_Execution_Point;
    /**
     * El componente donde ocurre el evento (nombre de la clase y método, o función, por ejemplo).
     * Sea específico donde ocurre el evento en código.
     */
    component: string;
    /**
     * Mensaje que describe el evento.
     */
    private message: string;
    /**
     * ID del Cliente.
     */
    customer_id: string;
    /**
     * ID de la Solución para el Cliente (Para Parly: nombre del bot).
     */
    private solution_id: string;
    /**
     * Código del evento.
     */
    private code: string;
    /**
     * Traza detallada del evento.
     */
    trace: string;
    /**
     * Nivel del evento (error, fatal, info... etc.).
     */
    private level: Log_Level;

    constructor() {
        this.date = Log._getFecha();
        this.product_id = Endpoint.PRODUCTS_LOGGER_PRODUCT_ID;
        this.solution_id = Endpoint.PRODUCTS_LOGGER_SOLUTION_ID;
        this.system_id = Endpoint.PRODUCTS_LOGGER_SYSTEM_ID;
        this.aplication = Endpoint.PRODUCTS_LOGGER_APPLICATION;
    }

    /**
     * Develve la fecha como debe almacenarse en el logger.
     * @returns fecha 
     */
    private static _getFecha(): string {
        return moment().tz('America/Bogota').format();
    }

    /**
     * Genera el log.
     */
    static log(message_with_code: Message,
        invocation_id: string,
        tracing_id: string,
        component: string,
        trace: string,
        data: any,
        customer_id: string) {

        const log = new Log()

        log.code = message_with_code.code
        log.level = message_with_code.level
        log.executionPoint = message_with_code.executionPoint
        log.message = message_with_code.message
        if (!log.code || !log.level || !log.executionPoint || !log.message) {
            logger.error('Error en log: faltan datos en el mensaje.');
            return
        }
        log.invocation_id = invocation_id || '-';
        log.tracing_id = tracing_id;
        log.component = component;
        log.trace = trace || '-';
        log.data = data || '-';
        log.customer_id = customer_id || '-';

        //quitar este campo message_with_code que no es parte del objeto que se guarda en splunk.
        const clon = JSON.parse(JSON.stringify(log))
        delete clon.message_with_code

        axios
            .post(Endpoint.PRODUCTS_LOGGER_URL, clon)
            .then((response) => {
                logger.debug('Registro en log');
            })
            .catch((response) => {
                logger.error('Fallo registrando log');
                
                logger.warn(clon);
            });

    }

};
