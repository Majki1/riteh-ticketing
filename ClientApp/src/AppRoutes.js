import { Tickets } from "./components/Tickets";
import { Home } from "./components/Home";
import MyTickets  from "./components/MyTickets";
import { Closed } from "./components/ZatvoreniTicketi";
import LoginForm from "./components/LoginForm";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/Tickets',
    element: <Tickets />
  },
  {
    path: '/MyTickets',
    element: <MyTickets/>
  },
  {
    path: '/ZatvoreniTicketi',
    element: <Closed/>
  },
  {
    path: '/LoginForm',
    element: <LoginForm/>
  }
];

export default AppRoutes;
