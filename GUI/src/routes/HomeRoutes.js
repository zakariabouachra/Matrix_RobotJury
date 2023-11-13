import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';

const HomePage = Loadable(lazy(() => import('pages/accueil')));

// ==============================|| AUTH ROUTING ||============================== //

const HomePageRoutes = {
  path: '/',
  element: <HomePage />
};

export default HomePageRoutes;
