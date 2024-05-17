import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { globalContext } from '../context/Globalconntext';

interface Location {
  id: number;
  name: string;
  dimension: string;
  residents: number;
  type: string;
  favorite: boolean;
  option: string;
}

interface CardLocationProps {
  item: Location;
}

const CardLocation: React.FC<CardLocationProps> = ({ item }) => {
  const context = useContext(globalContext);
  if (!context) {
    return null;
  }
  const { locations, setLocations, session } = context;

  const handleFavorite = (id: number, favorite: boolean) => {
    if (session) {
      const updateCharacters = locations.map((item) =>
        item.id === id ? { ...item, favorite: !favorite } : item
      );
      setLocations(updateCharacters);
    } else {
      alert('Por favor inicia sesión, para guardar en favoritos');
    }
  }


  return (
    <div className={`w-full h-[60vh] relative bg-white shadow-xl transform duration-500 hover:-translate-y-2 group z-10`}>
      <div className="w-full h-full absolute top-0 left-0 p-10 transform duration-300 z-10">
        <div className="w-full flex justify-end">
          <FontAwesomeIcon icon={faHeart} color={item.favorite ? "red" : "gray"} size='2xl' className='cursor-pointer hover:scale-125 transition-all duration-500' onClick={
            () => handleFavorite(item.id, item.favorite)} />
        </div>
        <div className="w-full text-xl font-bold mb-5 mt-5 text-left">
          <h3 className={`mb-2 uppercase`}>{item.name}</h3>
        </div>
        <div className={`w-full text-black text-lg text-left`}>
          <h3 className={`mb-2 uppercase`}><span className='font-semibold'>Dimension: </span>{item.dimension}</h3>
          <h3 className={`mb-2 uppercase`}><span className='font-semibold'>Residentes: </span> {item.residents}</h3>
          <h3 className={`mb-2 uppercase`}><span className='font-semibold'>Tipo: </span>{item.type}</h3>
        </div>
      </div>
    </div>
  );
}

export default CardLocation;
