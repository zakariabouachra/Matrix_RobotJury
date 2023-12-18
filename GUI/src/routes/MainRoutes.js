import { Navigate } from 'react-router-dom'; // Ajout de Navigate


import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Articles = Loadable(lazy(() => import('pages/articles')));
const SoumettreArticles = Loadable(lazy(() => import('pages/soumettre_article')));
const ViewProfile = Loadable(lazy(() => import('layout/MainLayout/Header/HeaderContent/Profile/viewProfile')));
const XmlDisplayPage = Loadable(lazy(() => import('pages/articles/articleDetails')));

// Fonction pour vérifier l'authentification à l'aide du localStorage
const isAuthenticated = () => {
  const user_id = localStorage.getItem('user_id'); // Vérifie la présence de l'ID utilisateur dans le localStorage
  return !!user_id; // Retourne vrai si l'ID utilisateur est présent, sinon faux
};
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  
  path: '/',
  element: isAuthenticated() ? <MainLayout /> : <Navigate to="/login" replace />, // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
  children: [
    {
      path: '/',
      element: isAuthenticated() ? <DashboardDefault /> : <Navigate to="/login" replace />, // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: isAuthenticated() ? <DashboardDefault /> : <Navigate to="/login" replace />, // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
        },
      ],
    },
    {
      path: 'articles',
      element: isAuthenticated() ? <Articles /> : <Navigate to="/login" replace />, // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    },
    {
      path: '/article/:articleId',
      element: isAuthenticated() ? <XmlDisplayPage /> : <Navigate to="/login" replace />, // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    },
    {
      path: 'soumettre_un_article',
      element: isAuthenticated() ? <SoumettreArticles /> : <Navigate to="/login" replace />, // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    },
    {
      path: 'view_profile',
      element: isAuthenticated() ? <ViewProfile /> : <Navigate to="/login" replace />, // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    }
    
  ],
};

export default MainRoutes;
