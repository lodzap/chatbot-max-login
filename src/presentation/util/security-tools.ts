var _3DES = require('nod3des');
export class SecurityTools {

    constructor() {
    }

    public decrypt(data: string, key: string) {
        return _3DES.decrypt(key, data);
    }

    public encrypt3DES(data: string, key: string) {
        return _3DES.encrypt(key, data);
    }

}