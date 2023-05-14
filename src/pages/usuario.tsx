import Content from "@/components/template/Content";
import Header from "@/components/template/Header";
import Page from "@/components/template/Page";
import PageTitle from "@/components/template/PageTitle";
import Forms from "@/components/user/Forms";
import FakeUser from "@/data/constants/FakeUser";
import { IconForms } from "@tabler/icons-react";

export default function UserData() {
  const user = FakeUser;
  return (
    <Page>
      <Header />

      <Content>
        <PageTitle
          icone={<IconForms />}
          principal="Dados Cadastrais"
          secundario={`Informações de ${user.email}`}
        />
        <Forms />
      </Content>
    </Page>
  );
}
