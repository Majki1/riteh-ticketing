import  Tickets  from "./pages/Tickets";
import { LandingPage } from "./pages/LandingPage";
import MyTickets  from "./pages/MyTickets";
import { Closed } from "./pages/ZatvoreniTicketi";
import LoginForm from "./pages/LoginForm";
import PostLogin from "./PostLogin";
import NavMenu from "./components/NavMenu/NavMenu"
import  Welcome  from './pages/WelcomePage'

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
    element: <PostLogin />
  },
  {
    path: '/PostLogin',
    element: <PostLogin/>
  },
  {
    path: '/Welcome',
    element: <Welcome/>
  }
];

export default AppRoutes;
