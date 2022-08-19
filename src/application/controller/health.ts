import { NextFunction, Request, Response } from "express"
import HttpStatus = require('http-status-codes')

/**
 * Metodo que revisa la salud del servicio.
 */
export class HealthChecker {

    constructor(
        private requestExpress: Request,
        private responseExpress: Response,
        private nextExpress: NextFunction) { }

    /**
     * Metodo que revisa la salud del servicio.
     */
    check() {
        this.responseExpress.set('Cache-Control', 'max-age=300');
        this.responseExpress.set("Connection", "close");
        this.responseExpress.setHeader("Content-Type", "application/health+json");
        let response = new HealthResponse();
        response.status = HealthStatus.PASS;
        this.responseExpress
            .status(HttpStatus.OK)
            .json(response)
            .end();
    }

}

/**
 * Respuesta del servicio de salud.
 */
export class HealthResponse {
    status: HealthStatus
}

/**
 * Estados validos de respuesta del servicio de salud.
 */
export enum HealthStatus {
    PASS = "pass",
    FAIL = "fail",
    WARN = "warn"
}
