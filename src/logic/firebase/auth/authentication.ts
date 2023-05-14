import User from "@/logic/core/user/User";
import { User as UserFirebase, onIdTokenChanged } from "firebase/auth";
import {
  Auth,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../config/App";

export type MonitorarUsuario = (usuario: User | null) => void
export type CancelarMonitoramento = () => void

export default class Authentication {
  private _auth: Auth;
  constructor() {
    this._auth = getAuth(app);
  }

  async loginGoogle(): Promise<User | null> {
    const resp = await signInWithPopup(this._auth, new GoogleAuthProvider());
    return this.convertToUser(resp.user);
  }

  logout(): Promise<void> {
    return signOut(this._auth);
  }

  monitorar(notificar: MonitorarUsuario): CancelarMonitoramento {
    return onIdTokenChanged(this._auth, async (usuarioFirebase) => {
        const usuario = this.convertToUser(usuarioFirebase)
        notificar(usuario)
    })
}

  private convertToUser(usuarioFirebase: UserFirebase | null): User | null {
    if (!usuarioFirebase?.email) return null;
    const nomeAlternativo = usuarioFirebase.email!.split("@")[0];

    return {
      id: usuarioFirebase.uid,
      nome: usuarioFirebase.displayName ?? nomeAlternativo,
      email: usuarioFirebase.email,
      imagemUrl: usuarioFirebase.photoURL,
    };
  }
}
