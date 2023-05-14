import Area from "../common/Area";
import Slogan from "./Slogan";
import principal from "../../../../public/principal.jpg";
import ReponsiveImage from "../common/ReponsiveImage";

export default function Emphasis() {
  return (
    <Area id="inicio" className="pt-20">
      <div className="flex items-center h-[500px] justify-around">
        <Slogan />
        <ReponsiveImage
          imagem={principal}
          className="rotate-3 hidden md:inline"
        />
      </div>
    </Area>
  );
}
