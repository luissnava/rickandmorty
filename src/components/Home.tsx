import React, { useContext } from 'react';
import { globalContext } from '../context/Globalconntext';
import CardCharacter from './CardCharacter';

const Home: React.FC = () => {
  const context = useContext(globalContext);
  if (!context) {
    return null;
  }
  const { characters } = context;

  return (
    <div className='w-full grid grid-cols-4 p-10 gap-10 bg-slate-200'>
      {
        characters?.map((item, index) => (
          <CardCharacter key={index} item={item} />
        ))
      }
    </div>
  );
}

export default Home;
