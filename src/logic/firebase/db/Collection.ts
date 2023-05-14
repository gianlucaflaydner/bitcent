import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  OrderByDirection,
  query,
  orderBy,
  where,
  QueryConstraint,
  getDocs,
  DocumentSnapshot,
  DocumentData,
  WhereFilterOp
} from "firebase/firestore";
import { app } from "../config/App";
import Id from "@/logic/core/common/Id";

export interface Filtro {
    atributo: string
    op: WhereFilterOp
    valor: any
}

export default class Collection {
  async save(caminho: string, entidade: any, id?: string): Promise<any> {
    const db = getFirestore(app);
    const idFinal = id ?? entidade.id ?? Id.novo();
    const docRef = doc(db, caminho, idFinal);
    await setDoc(docRef, entidade);

    return {
      ...entidade,
      id: entidade.id ?? idFinal,
    };
  }

  async exclude(caminho: string, id?: string): Promise<boolean> {
    if (!id) return false;
    const db = getFirestore(app);
    const docRef = doc(db, caminho, id);
    const itemNoBanco = await getDoc(docRef);
    if (!itemNoBanco.exists()) return false;
    await deleteDoc(docRef);
    return true;
  }

  async consultar(caminho: string, ordenarPor?: string, direcao?: OrderByDirection): Promise<any[]> {
    const db = getFirestore(app)
    const colecaoRef = collection(db, caminho)
    const filtro: QueryConstraint[] = []
    const ordenacao = ordenarPor ? [orderBy(ordenarPor, direcao)] : []
    const consulta = query(colecaoRef, ...filtro, ...ordenacao)
    const resultado = await getDocs(consulta)
    return resultado.docs.map(this._converterDoFirebase) ?? []
}

async consultarPorId(caminho: string, id: string): Promise<any> {
    if (!id) return null
    const db = getFirestore(app)
    const docRef = doc(db, caminho, id)
    const resultado = await getDoc(docRef)
    return this._converterDoFirebase(resultado)
}

async consultarComFiltros(caminho: string, filtros: Filtro[],
    ordenarPor?: string, direcao?: OrderByDirection): Promise<any[]> {
    const db = getFirestore(app)
    const colecaoRef = collection(db, caminho)

    const filtrosWhere = filtros?.map(f => where(f.atributo, f.op, f.valor)) ?? []
    const ordenacao = ordenarPor ? [orderBy(ordenarPor, direcao)] : []

    const consulta = query(colecaoRef, ...filtrosWhere, ...ordenacao)
    const resultado = await getDocs(consulta)
    return resultado.docs.map(this._converterDoFirebase) ?? []
}

private _converterDoFirebase(snapshot: DocumentSnapshot<DocumentData>) {
    if(!snapshot.exists()) return null
    const entidade: any = { ...snapshot.data(), id: snapshot.id }
    if (!entidade) return entidade
    return Object.keys(entidade).reduce((obj: any, atributo: string) => {
        const valor: any = entidade[atributo]
        return { ...obj, [atributo]: valor.toDate?.() ?? valor }
    }, {})
}
}
