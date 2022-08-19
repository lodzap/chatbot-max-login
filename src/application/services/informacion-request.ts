export class InformacionRequest {

    extraerDireccionIp(req: any): string {
        let ip = '';
        if(req.connection && req.connection.remoteAddress) {
            ip = req.connection.remoteAddress;
        }
        return ip;
    }

    extraerNroWhatsapp(req: any): string {
        const idBot: string = req.body.idConversacion;
        const index = idBot.lastIndexOf('_') + 1;
        return idBot.substring(index);
    }
}