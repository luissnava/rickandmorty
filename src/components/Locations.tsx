import React, { useContext, useEffect } from "react";
import { globalContext } from "../context/Globalconntext";
import CardLocation from "./CardLocation";

interface Location {
  id: number;
  name: string;
  dimension: string;
  residents: number;
  type: string;
  favorite: boolean;
  option: string;
}

const Locations: React.FC = () => {
  const context = useContext(globalContext);
  if (!context) {
    return null;
  }
  const { locations } = context;

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  return (
    <div className="w-full bg-slate-200">
      <div className="w-full flex justify-center p-10">
        <h3 className="text-4xl font-normal uppercase hover:text-green-500">Ubicaciones</h3>
      </div>
      <div
        className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-10 p-20`}
      >
        {locations.map((item: Location, index: number) => (
          <CardLocation key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Locations;
