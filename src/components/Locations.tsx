import React, { useContext, useEffect } from 'react';
import { globalContext } from '../context/Globalconntext';
import CardLocation from './CardLocation';

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
    <div className='w-full grid grid-cols-4 gap-10 p-20 bg-slate-200'>
      {
        locations.map((item: Location, index: number) => (
          <CardLocation key={index} item={item} />
        ))
      }
    </div>
  );
}

export default Locations;
