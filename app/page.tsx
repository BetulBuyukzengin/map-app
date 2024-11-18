import Image from "next/image";
import map from "../public/map.jpg";

export default function Home() {
  return (
    <main className="mt-24">
      <Image
        src={map}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top opacity-60"
        alt="map"
      />
      <div className="relative z-10 text-center">
        <h1 className="text-2xl md:text-5xl text-stone-700 mb-10 tracking-tight font-serif">
          Welcome to Map App!
        </h1>
      </div>
    </main>
  );
}
