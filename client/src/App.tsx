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

interface Context {
    business: boolean
    setBusiness: Function
    admin: boolean
    setAdmin: Function,
    user: any;
    setUser: Function;

} 

export const AppContext = createContext<Context | null>(null);

const userData = getUser();
function App() {

  const [business, setBusiness] = useState( userData ? userData.business : false
  );
  const [admin, setAdmin] = useState(userData ? userData.admin : false);
  const [user, setUser] = useState();

  useEffect(()=>{
const theUser = getUser()
if(theUser){
setUser(theUser);
}
})
  return (<>
<AppContext.Provider value={{
                business,
                setBusiness,
                admin,
                setAdmin,
                user,
                setUser,
                
            }}>
    
    <Navbar></Navbar>
    <Routes>
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route 
      path="cards" 
      element={
      <MyCard />} />
      <Route path="favCards" element={<MyCard />} />
<Route path='sandbox' 
      element={
      <AdminGuard>
<SandBox/>
      </AdminGuard>}>
      </Route>
 <Route path="addCard" element={<AddCard />} />
    </Routes>

      
    </AppContext.Provider>
    <Footer></Footer>
</>
    
  );
}

export default App;
