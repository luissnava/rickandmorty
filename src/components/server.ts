export interface NavbarItem {
  id: number;
  title: string;
  url: string;
  title2?: string;
}

export const navbarServer: NavbarItem[] = [
  {
    id: 1,
    title: "Inicio",
    url: "/",
  },
  {
    id: 2,
    title: "Ubicaciones",
    url: "/ubicaciones",
  },
  {
    id: 3,
    title: "Favoritos",
    url: "/favoritos",
  },
  {
    id: 4,
    title: "Login",
    title2: "Logout",
    url: "/login",
  },
];
