import { v4 as uuidv4 } from 'uuid';
import { Configuraciones } from '../controller/configuraciones';
import { SecurityTools } from '../../presentation/util/security-tools';

export class ServicioUrl {
  genenrarUrl(req: any): string {
    let url: string,
      telefono: string,
      canal: string,
      from: string,
      idConversacion: string,
      token: string,
      nombreBot: string,
      score: string,
      technology: string,
      palabraClave: string;

    let correlationId = `MAX-${uuidv4()}`;

    //palabraClaveConfirmacion=ConfirmacionCompraBolsas
    //palabraClaveCancelacion=CancelacionCompraBolsas
    //palabraClaveTimeout=CancelacionCompraBolsas

    //sva y cambio de plan --> Score
    Object.keys(req.body).forEach(function (key) {
      if (key == 'idConversacion') {
        idConversacion = req.body[key];
      }
      if (key == 'Score') {
        score = req.body[key];
      }
      if (key == 'token') {
        token = req.body[key];
      }
      if (key == 'palabraClave') {
        palabraClave = req.body[key];
      }
      if (key == 'nombreBot') {
        nombreBot = req.body[key];
      }
      const keyword = new Configuraciones().keytokenmail;
      const textoEncriptado = new SecurityTools().encrypt3DES(
        req.body[key],
        keyword
      );
      if (key == 'telefono') {
        telefono = textoEncriptado;
      }
      if (key == 'canal') {
        canal = textoEncriptado;
      }
      if (key == 'from') {
        from = textoEncriptado;
      }

      if (key == 'technology') {
        technology = textoEncriptado;
      }
    });

    idConversacion = idConversacion.replace(' ', '%20');

    if (req.body.nombreUrl == 'Cobertura') {
      url = `${process.env.URL_ETB_COBERTURAS}/login?token=${token}&cobertura=true&id=${correlationId}&idConversacion=${idConversacion}&Canal=${canal}&nombreBot=${nombreBot}&palabraClave=${palabraClave}&palabraClaveCancelacion=${palabraClave}Cancelacion&palabraClaveTimeout=${palabraClave}Timeout`;
    } else if (req.body.nombreUrl == 'Compra_bolsas') {
      url =
        process.env.ENCRYPT_URL_CARDS +
        `/CompraBolsas?Id=${correlationId}&From=${from}&Phone=${telefono}&Canal=${canal}&nombreBot=${nombreBot}&idConversacion=${idConversacion}&palabraClave=${palabraClave}&palabraClaveCancelacion=${palabraClave}Cancelacion&palabraClaveTimeout=${palabraClave}Timeout`;
    } else if (req.body.nombreUrl == 'Cambio_plan') {
      url =
        process.env.ENCRYPT_URL_CARDS +
        `/CambiaPlan?Id=${correlationId}&From=${from}&Phone=${telefono}&Canal=${canal}&nombreBot=${nombreBot}&Score=${score}&idConversacion=${idConversacion}&palabraClave=${palabraClave}&palabraClaveCancelacion=${palabraClave}Cancelacion&palabraClaveTimeout=${palabraClave}Timeout`;
    } else if (req.body.nombreUrl == 'Traslado') {
      url =
        process.env.ENCRYPT_URL_CARDS +
        `/CambiaPlan?Id=${correlationId}&From=${from}&Phone=${telefono}&Canal=${canal}&nombreBot=${nombreBot}&Score=${score}&idConversacion=${idConversacion}&palabraClave=${palabraClave}&palabraClaveCancelacion=${palabraClave}Cancelacion&palabraClaveTimeout=${palabraClave}Timeout&Technology=${technology}`;
    } else if (req.body.nombreUrl == 'Consulta_adicion') {
      url =
        process.env.ENCRYPT_URL_CARDS +
        `/AdicionSVA?Id=${correlationId}&From=${from}&Phone=${telefono}&Canal=${canal}&Score=${score}&nombreBot=${nombreBot}&idConversacion=${idConversacion}&palabraClave=${palabraClave}&palabraClaveCancelacion=${palabraClave}Cancelacion&palabraClaveTimeout=${palabraClave}Timeout`;
    } else if (req.body.nombreUrl == 'Compra_carta') {
      url =
        process.env.ENCRYPT_URL_CARDS +
        `/CompraALaCarta?Id=${correlationId}&From=${from}&Phone=${telefono}&Canal=${canal}&nombreBot=${nombreBot}&idConversacion=${idConversacion}&palabraClave=${palabraClave}&palabraClaveCancelacion=${palabraClave}Cancelacion&palabraClaveTimeout=${palabraClave}Timeout`;
    } else if (req.body.nombreUrl == 'Registro') {
      url =
        process.env.URL_REGISTRO +
        `/RegistroMiETB?Id=${correlationId}&From=${from}&Phone=${telefono}&Canal=${canal}&nombreBot=${nombreBot}&idConversacion=${idConversacion}&palabraClave=${palabraClave}&palabraClaveCancelacion=${palabraClave}Cancelacion&palabraClaveTimeout=${palabraClave}Timeout`;
    }
    return url;
  }
}
