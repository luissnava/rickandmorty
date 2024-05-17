import React, { useState, useMemo, useEffect, ReactNode, createContext } from 'react';


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

interface GlobalContextType {
  windowWidth: number;
  favorites: (Character | Location)[];
  characters: Character[];
  locations: Location[];
  session: boolean | string;
  handleLogin: (username: string, password: string) => void;
  handleLogout: () => void;
  setFavorites: React.Dispatch<React.SetStateAction<(Character | Location)[]>>;
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  setWindowWidth: React.Dispatch<React.SetStateAction<number>>;
}

export const globalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalContextProviderProps {
  children: ReactNode;
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [favorites, setFavorites] = useState<(Character | Location)[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [session, setSession] = useState<boolean | string>(false);

  const handleLogin = (username: string, password: string) => {
    localStorage.setItem('user', username);
    localStorage.setItem('password', password);
    setSession(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    setSession(false);
    
  };

  const handleSession = () => {
    const user = localStorage.getItem('user');
    if (user) {
      setSession(user);
    }
  };

  const handleWindow = () => setWindowWidth(window.innerWidth);

  const handleGetCharacter = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      if (!response.ok) {
        console.log("Error al consultar los personajes");
      }

      const data = await response.json();
      if (data.results) {
        console.log("Characters", data.results);
        const dataCharacters = data.results.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          species: item.species,
          gender: item.gender,
          status: item.status,
          favorite: false,
          option: "characters",
        }));

        setCharacters(dataCharacters);
      }
    } catch (error) {
      console.log("Error al consultar la información", error);
    }
  };

  const handleGetLocations = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/location");
      if (!response.ok) {
        console.log("Error al consultar las ubicaciones");
      }

      const data = await response.json();
      if (data.results) {
        console.log("Locations", data.results);
        const dataLocations = data.results.map((item: any) => ({
          id: item.id,
          name: item.name,
          dimension: item.dimension,
          residents: item.residents.length,
          type: item.type,
          favorite: false,
          option: "locations",
        }));
        setLocations(dataLocations);
      }
    } catch (error) {
      console.log("Error al consultar la información", error);
    }
  };

  useEffect(() => {
    handleGetCharacter();
    handleGetLocations();
    handleSession();
  }, [session]);

  useEffect(() => {
    window.addEventListener("resize", handleWindow);

    return () => window.removeEventListener("resize", handleWindow);
  }, []);



  const valueProvider = useMemo(
    () => ({
      windowWidth,
      favorites,
      characters,
      locations,
      session,
      handleLogin,
      handleLogout,
      setFavorites,
      setCharacters,
      setLocations,
      setWindowWidth,
    }),
    [windowWidth, favorites, locations, characters]
  );

  return (
    <globalContext.Provider value={valueProvider}>
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
