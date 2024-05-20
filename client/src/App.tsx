import React, { useEffect } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Login from './auth/SignIn';
import SignUp from './auth/SignUp';
import MyCard from './pages/cards/MyCards';
import Footer from './components/Footer';
import { createContext, useState } from 'react';
import BusinessGuard from './auth/BusinessGuard';
import AdminGuard from './auth/AdminGuard';
import SandBox from './pages/SandBox';
import AddCard from './pages/cards/AddCard';
import { getUser } from './auth/TokenManager';
import { get } from 'http';
import Cards from './pages/cards/Cards';
import { ToastContainer } from 'react-toastify';
import EditCard from './pages/cards/EditCard';
import FavCards from './pages/cards/FavCards';
import CardDetails from './pages/cards/CardDetails';

function App() {


  return (<>
    <Navbar></Navbar>
 <ToastContainer position="bottom-left" theme="dark" />
    <Routes>
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />

<Route path="myCards" element={<MyCard />} />
      <Route 
      path="cards" 
      element={
      <Cards />} />
      <Route path="favCards" element={<FavCards />} />
<Route path='sandbox' 
      element={
      <AdminGuard>
<SandBox/>
      </AdminGuard>}>
      </Route>
 <Route path="addCard" element={<AddCard />} />
<Route path="editCard/:_id" element={<EditCard/>}/>
<Route path="cardDetails/:_id" element={<CardDetails/>}/>
    </Routes>
    <Footer></Footer>
</>
    
  );
}

export default App;
