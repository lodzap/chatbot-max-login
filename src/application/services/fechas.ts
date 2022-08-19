const moment = require('moment-timezone');
moment.locale('es');

export class Fechas {

    getFecha(): string {
        return moment().tz('America/Bogota').format('YYYY-MM-DD');
    }
    getHOur(): string {
        return moment().tz('America/Bogota').format('HH:mm');
    }
}