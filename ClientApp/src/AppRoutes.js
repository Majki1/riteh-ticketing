import { Tickets } from "./components/Tickets";
import { LandingPage } from "./components/LandingPage";
import MyTickets  from "./components/MyTickets";
import { Closed } from "./components/ZatvoreniTicketi";
import LoginForm from "./components/LoginForm";
import PostLogin from "./PostLogin";

const AppRoutes = [
  {
    index: true,
    element: <LandingPage />
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
  },
  {
    path: '/PostLogin',
    element: <PostLogin/>
  }
];

export default AppRoutes;
