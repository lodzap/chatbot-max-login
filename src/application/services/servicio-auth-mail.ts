import { AuthMail } from '../controller/auth-mail';
import { NextFunction } from 'express';
import { Configuraciones } from '../controller/configuraciones';
import { SecurityTools } from '../../presentation/util/security-tools';
import { TokenTools } from '../controller/token-tools';

export class ServiceAuthMail {
  public async authMail(req: any, res: any, next: NextFunction) {
    const key = new Configuraciones().keytokenmail;
    const { mail, password } = req.body;
    const passwordEncrypted = new SecurityTools().encrypt3DES(password, key);
    //obtener token
    const getTokenEmail = await new TokenTools().getTokenMail(req);

    const token = getTokenEmail.data.respuesta.WSResponseBody.SecurityToken;
    console.log("console",token);
    //Llamado al Servicio de autenticación
    return await new AuthMail().authMail(mail, passwordEncrypted, token, req);
  }

  public async authCompanies(req: any) {
    const { user, password, tracingId } = req.body;

    return await new AuthMail().authMailCompanies(user, password, tracingId);
  }
}
