import React, { useState, useContext, ChangeEvent } from 'react';
import { globalContext } from '../context/Globalconntext';
import { useNavigate } from 'react-router-dom';
const Login: React.FC = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate()
  const context = useContext(globalContext);
  if (!context) {
    return null;
  }
  const { handleLogin, handleLogout, session } = context;

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "user") {
      setUser(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  const handleSetLogin = (): void => {
    if (user !== "" && password !== "") {
      handleLogin(user, password);
      navigate('/')
    } else {
      alert("Todos los campos son requeridos");
    }
  }
  const handleSetLogout = () =>{
    handleLogout()
    navigate('/')
  }

  return (
    <div>
      <div className="w-full mt-24 flex justify-center">
        <h1 className='text-xl'>{session ? "Cerrar Sesión" : "Iniciar Sesión"}</h1>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {
              !session && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Usuario
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                      name="user" type="text" placeholder="Username" required onChange={handleChange} />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Contraseña
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
                      name="password"
                      type="password"
                      placeholder="***********" required onChange={handleChange} />
                  </div>
                </>
              )
            }
            <div className="flex items-center justify-between">
              {
                session ? (
                  <button className="bg-[#08b2d1] hover:bg-green-500 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleSetLogout}>
                    Salir
                  </button>
                ) : (
                  <button className="bg-[#08b2d1] hover:bg-green-500 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleSetLogin}>
                    Entrar
                  </button>
                )
              }
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            2024 Rick & Morty
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
