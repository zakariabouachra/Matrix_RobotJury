import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Accueil from '../pages/Accueil'
import Header from '../Layouts/header'
import Login from '../pages/Login'
import About from '../pages/About'
import Contact from '../pages/Contact';

const routes =()=>{
    return (
       
        <Routes>    
          <Route path="/" Component={Accueil} />
          <Route path="/About" Component={About} />
          <Route path="/Contact" Component={Contact} />
          <Route path="/login" Component={Login} />
          <Route path="/header" Component={Header} />




        </Routes>
       
      );
};
export default routes;