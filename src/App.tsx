
import { useRoutes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Locations from './components/Locations';
import Favorites from './components/Favorites';
import Login from './components/Login';
import GlobalContextProvider from './context/Globalconntext';
import Navbar from './components/Navbar';

function Routes() {
  const rutas = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/favoritos',
      element: <Favorites />,
    },
    {
      path: '/ubicaciones',
      element: <Locations />,
    },
    {
      path: '/login',
      element: <Login />,
    }
  ]);

  return rutas;
}

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes />
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
