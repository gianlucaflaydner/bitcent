import Page from "../template/Page";
import Benefits from "./benefits";
import Depositions from "./depositions";
import Emphasis from "./emphasis";
import Footer from "./footer";
import Header from "./header";

export default function Landing() {
  return (
    <Page externa>
      <Header />
      <Emphasis />
      <Benefits />
      <Depositions />
      <Footer />
    </Page>
  );
}
