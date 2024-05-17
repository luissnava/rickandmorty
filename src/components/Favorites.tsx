import React, { useContext, useEffect } from 'react';
import { globalContext } from '../context/Globalconntext';
import CardLocation from './CardLocation';
import CardCharacter from './CardCharacter';

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

interface Location {
  id: number;
  name: string;
  dimension: string;
  residents: number;
  type: string;
  favorite: boolean;
  option: string;
}

type FavoriteItem = Character | Location;

const Favorites: React.FC = () => {
  const context = useContext(globalContext);
  if (!context) {
    return null;
  }
  const { characters, locations, favorites, setFavorites, windowWidth } = context;

  useEffect(() => {
    const combinedFavorites: FavoriteItem[] = [
      ...characters.filter((item: Character) => item.favorite),
      ...locations.filter((item: Location) => item.favorite)
    ];

    setFavorites(combinedFavorites);
  }, [characters, locations, setFavorites]);

  return (
    <div className={`w-full grid ${windowWidth < 1080 ? "grid-cols-2" : "grid-cols-4"} gap-10 p-20`}>
      {
        favorites.map((item: FavoriteItem, index: number) => (
          item.option === "characters" ? <CardCharacter key={index} item={item as Character} /> : item.option === "locations" ? <CardLocation key={index} item={item as Location} /> : null
        ))
      }
    </div>
  );
}

export default Favorites;
