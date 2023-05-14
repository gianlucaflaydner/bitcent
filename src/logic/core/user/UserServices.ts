import Authentication, { CancelarMonitoramento, MonitorarUsuario } from "@/logic/firebase/auth/authentication";
import Collection from "@/logic/firebase/db/Collection";
import User from "./User";

export default class UserServices {
  private _authentication = new Authentication();
  private _collection = new Collection();

  monitorarAutenticacao(observador: MonitorarUsuario): CancelarMonitoramento {
    return this._authentication.monitorar(async usuario => {
        observador(usuario ? {
            ...usuario,
            ...await this.consult(usuario.email)
        } : null)
    })
}

  async loginGoogle(): Promise<User | null> {
    const user = await this._authentication.loginGoogle();
    if (!user) return null;

    let userDoBanco = await this.consult(user.email);
    if (!userDoBanco) userDoBanco = await this.save(user);

    return { ...user, ...userDoBanco };
  }

  logout(): Promise<void> {
    return this._authentication.logout()
}

  async consult(email: string) {
    return await this._collection.consultarPorId("usuarios", email);
  }

  async save(usuario: User) {
    return await this._collection.save("usuarios", usuario, usuario.email);
  }
}
