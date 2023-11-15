import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Articles = Loadable(lazy(() => import('pages/articles')));
const SoumettreArticles = Loadable(lazy(() => import('pages/soumettre_article')));
const ViewProfile = Loadable(lazy(() => import('layout/MainLayout/Header/HeaderContent/Profile/viewProfile')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'articles',
      element: <Articles />
    },
    {
      path: 'soumettre_un_article',
      element: <SoumettreArticles />
    },
    {
      path: 'view_profile',
      element: <ViewProfile />
    }
  ]
};

export default MainRoutes;
