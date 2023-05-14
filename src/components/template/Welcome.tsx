import AuthenticationContext from "@/data/contexts/AuthenticationContext";
import { useContext } from "react";

export default function Welcome() {
  const { user } = useContext(AuthenticationContext);

  function renderizarNome() {
    return (
      <span className="hidden sm:inline">{user?.nome?.split(" ")[0]}</span>
    );
  }

  return <div className={`text-3xl font-black`}>Olá {renderizarNome()} 👋</div>;
}
