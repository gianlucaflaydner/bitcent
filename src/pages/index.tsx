import Finances from "@/components/finances";
import Landing from "@/components/landing";
import Loading from "@/components/template/Loading";
import AuthenticationContext from "@/data/contexts/AuthenticationContext";
import { useContext } from "react";

export default function Home() {
  const { user, loading } = useContext(AuthenticationContext);

  return loading ? <Loading /> : user ? <Finances /> : <Landing />;
}
