import { Ejecutor_Llamado_Http } from "./ejecutor-llamado-http";
import { Fechas } from "../services/fechas";
import { InformacionRequest } from "../services/informacion-request";
import { Llamado_Http_Use_Case } from "../../domain/use-cases/llamado-http-use-case";
import { Registro_Logger_Use_Case } from "../../domain/use-cases/registro-logger-use-case";
import { Obtener_Token_Registro_Logger } from "../adapters/obtener-token-registro-logger";

export class TokenTools {
    private readonly fechas = new Fechas();
    private readonly informacionRequest = new InformacionRequest();
    private readonly _ejecutor_llamado_http = new Llamado_Http_Use_Case(new Ejecutor_Llamado_Http());
    private readonly _factory_registro_obtener_token = new Registro_Logger_Use_Case(new Obtener_Token_Registro_Logger());
   
    constructor() {
    }

    async getTokenMail(req: any): Promise<any> {
        const data = {
            "WSRequestHeader": {
                "System": {
                    "name": "MAX",
                    "correlationID": `MAX-${req.tracingId}`,
                    "processingServer": null
                },
                "Property": [
                    {
                        "name": null,
                        "value": null
                    },
                    {
                        "name": null,
                        "value": null
                    }
                ]
            },
            "WSRequestBody": {
                "Username": process.env.TOKEN_USERNAME,
                "Password": process.env.TOKEN_PASSWORD,
                "Audit": {
                    "Canal": process.env.CANAL,
                    "IP_Address": this.informacionRequest.extraerDireccionIp(req),
                    "IP_Latitud": "4.8094",
                    "IP_Longitude": "-74.0980",
                    "IP_City": "COTA",
                    "IP_Country": "COLOMBIA",
                    "Date": this.fechas.getFecha(),
                    "Hour": this.fechas.getHOur(),
                    "WhatsApp_Phone_Number": this.informacionRequest.extraerNroWhatsapp(req),
                    "Facebook_User": null,
                    "Twitter_User": null
                }
            }
        }

        const configuracion = {
            url: `${process.env.URL_OBTENER_TOKEN}`,
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: data
        };
        const splunk = this._factory_registro_obtener_token.generar_registro(req.tracingId);
        return await this._ejecutor_llamado_http.invocar_peticion(configuracion, splunk);
    }

}