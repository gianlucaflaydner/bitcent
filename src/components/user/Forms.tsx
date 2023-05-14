import useForm from "@/data/hooks/UseForm";
import MiniForm from "../template/MiniForm";
import User from "@/logic/core/user/User";
import { TextInput } from "@mantine/core";
import Text from "@/logic/utils/Text";
import Cpf from "@/logic/utils/Cpf";
import Cellphone from "@/logic/utils/Cellphone";
import { useContext, useEffect } from "react";
import AuthenticationContext from "@/data/contexts/AuthenticationContext";

export default function Forms() {
  const { user, updateUser } = useContext(AuthenticationContext);
  const { data, changeAttribute, updateData } = useForm<User>();

  useEffect(() => {
    if (!user) return;
    updateData(user);
  }, [user, updateData]);

  async function save(){
    if(!user) return
    await updateUser(data)

  }

  return (
    <div className="flex flex-col gap-5 mt-7">
      <MiniForm
        title="Seu Nome"
        description="Como você gostaria de ser chamado?"
        footerText="O nome deve possuir entre 3 e 80 caracteres, mais que isso já é um texto!"
        save={save}
        canSave={Text.entre(data.nome, 3, 80)}
      >
        <TextInput value={data.nome} onChange={changeAttribute("nome")} />
      </MiniForm>
      <MiniForm
        title="CPF"
        description="Seu CPF é usado internamente pelo sistema."
        footerText="Pode relaxar, daqui ele não sai!"
        save={save}
        canSave={true}
      >
        <TextInput
          value={Cpf.formatar(data.cpf ?? "")}
          onChange={changeAttribute("cpf", Cpf.desformatar)}
        />
      </MiniForm>
      <MiniForm
        title="Telefone"
        description="Usado para notificações importantes sobre a sua conta."
        footerText="Se receber ligação a cobrar, não foi a gente!"
        save={save}
        canSave={true}
      >
        <TextInput
          value={Cellphone.formatar(data.cellphone ?? "")}
          onChange={changeAttribute("cellphone", Cellphone.desformatar)}
        />
      </MiniForm>
    </div>
  );
}
