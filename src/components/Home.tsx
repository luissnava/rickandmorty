import React, { useContext } from "react";
import { globalContext } from "../context/Globalconntext";
import CardCharacter from "./CardCharacter";

const Home: React.FC = () => {
  const context = useContext(globalContext);
  if (!context) {
    return null;
  }
  const { characters } = context;

  return (
    <div className="w-full bg-slate-200">
      <div className="w-full flex justify-center p-10">
        <h3 className="text-4xl font-normal uppercase">Personajes</h3>
      </div>
      <div
        className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 gap-10`}
      >
        {characters?.map((item, index) => (
          <CardCharacter key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
