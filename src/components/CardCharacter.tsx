import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { globalContext } from '../context/Globalconntext';

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  gender: string;
  status: string;
  favorite: boolean;
  option: string;
}

interface CardCharacterProps {
  item: Character;
}

const CardCharacter: React.FC<CardCharacterProps> = ({ item }) => {
  const context = useContext(globalContext);
  if (!context) {
    return null;
  }
  const { characters, setCharacters, session } = context;

  const handleFavorite = (id: number, favorite: boolean) => {
    if (session) {
      const updateCharacters = characters.map((item) =>
        item.id === id ? { ...item, favorite: !favorite } : item
      );
      setCharacters(updateCharacters);
    } else {
      alert('Por favor inicia sesión, para guardar en favoritos');
    }
  }

  return (
    <div className={`w-full h-[50vh] relative shadow-xl transform duration-500 hover:-translate-y-2 group z-10`}
      style={{
        backgroundImage: `url(${item.image})`,
        paddingBottom: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}>
      <div className="w-full h-full absolute top-0 left-0 p-10 text-white bg-black bg-opacity-0 hover:bg-opacity-50 transform duration-300 z-10">
        <div className="w-full flex justify-end">
          <FontAwesomeIcon icon={faHeart} color={item.favorite ? "red" : "white"} size='2xl' className='cursor-pointer' onClick={
            () => handleFavorite(item.id, item.favorite)} />
        </div>
        <div className="w-full text-xl font-semibold mb-5 text-left transform translate-y-20 group-hover:translate-y-0 duration-500">
          <h3 className={`mb-2 uppercase`}>{item.name}</h3>
        </div>
        <div className={`opacity-0 text-white text-xl text-left group-hover:opacity-80 transform translate-y-20 group-hover:translate-y-0 duration-500 h-[25vh]`}>
          <h1>- {item.species}</h1>
          <h1>- {item.gender}</h1>
          <h1>- {item.status}</h1>
        </div>
      </div>
    </div>
  );
}

export default CardCharacter;
