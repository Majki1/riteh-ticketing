import { Roles } from "./components/roles";
import { Tickets } from "./components/Tickets";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/Roles',
    element: <Roles />
  },
  {
    path: '/Tickets',
    element: <Tickets />
  }
];

export default AppRoutes;
