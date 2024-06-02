import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useAuth } from "./AppContext";
import AdminGuard from "./auth/AdminGuard";
import Login from "./auth/SignIn";
import "./css/app.css";
import SignUp from "./auth/SignUp";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AdminPanel from "./pages/AdminPanel";
import AddCard from "./pages/cards/AddCard";
import CardDetails from "./pages/cards/CardDetails";
import Cards from "./pages/cards/Cards";
import EditCard from "./pages/cards/EditCard";
import FavCards from "./pages/cards/FavCards";
import MyCard from "./pages/cards/MyCards";

function App() {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const onToggleDarkMode = (mode: string) => {
    setIsDark(mode === "dark");
  };
  return (
    <section className={isDark ? "dark" : "light"}>
      <Navbar onToggleDark={onToggleDarkMode}></Navbar>
      <ToastContainer position="bottom-left" theme="dark" />
      <Routes>
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />

        <Route path="myCards" element={<MyCard />} />
        <Route path="cards" element={<Cards />} />
        <Route path="favCards" element={<FavCards />} />
        <Route
          path="adminPanel"
          element={
            <AdminGuard user={user}>
              {" "}
              <AdminPanel />{" "}
            </AdminGuard>
          }
        />

        <Route path="addCard" element={<AddCard />} />
        <Route path="editCard/:_id" element={<EditCard />} />
        <Route path="cardDetails/:_id" element={<CardDetails />} />
      </Routes>
      <Footer></Footer>
    </section>
  );
}

export default App;
