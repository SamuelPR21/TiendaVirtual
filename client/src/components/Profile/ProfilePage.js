import React from "react";
import { useUser } from "../../context/UserContext";
import NavbarGeneral from "../Navbar/NavbarGeneral";
import Footer from "../Home/Footer/Footer";
import AdminProfile from "./AdminProfile";
import CustomerProfile from "./CustomerProfile";

function ProfilePage() {
  const { user, loading } = useUser();

  if (loading) return null;

  if (!user) {
    return (
      <>
        <NavbarGeneral />
        <section className="section">
          <div className="container has-text-centered">
            <h1 className="title">Perfil</h1>
            <p>Debes iniciar sesión para ver esta sección.</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const isAdmin = user.role === "admin";

  return (
    <>
      <NavbarGeneral />
      <section className="section">
        <div className="container">
          {isAdmin ? <AdminProfile /> : <CustomerProfile />}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProfilePage;
