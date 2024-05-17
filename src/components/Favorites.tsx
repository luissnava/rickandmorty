import React, { useContext, useEffect } from "react";
import { globalContext } from "../context/Globalconntext";
import CardLocation from "./CardLocation";
import CardCharacter from "./CardCharacter";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
  const { characters, locations, favorites, setFavorites, session } = context;

  useEffect(() => {
    const combinedFavorites: FavoriteItem[] = [
      ...characters.filter((item: Character) => item.favorite),
      ...locations.filter((item: Location) => item.favorite),
    ];

    setFavorites(combinedFavorites);
  }, [characters, locations, setFavorites]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center p-10">
        <h3 className="text-4xl font-normal uppercase">Favoritos</h3>
      </div>

      {session && favorites.length > 0 ? (
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-20`}
        >
          {favorites.map((item: FavoriteItem, index: number) =>
            item.option === "characters" ? (
              <CardCharacter key={index} item={item as Character} />
            ) : item.option === "locations" ? (
              <CardLocation key={index} item={item as Location} />
            ) : null
          )}
        </div>
      ) : (
        <div className="w-full text-center p-10 mt-10">
          <h3 className="text-xl mb-5">
            Agrega personajes a tu lista de favoritos.
          </h3>
          <div className="w-full flex items-center justify-center hover:underline">
            <Link to={"/"} className=" text-xl mr-2">
              Agregar Personajes
            </Link>
            <FontAwesomeIcon icon={faArrowRight} size="xl"></FontAwesomeIcon>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
