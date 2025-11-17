// src/components/Profile/AdminProfile.js
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { fetchAllUsers } from "../../API/user";
import { fetchAllOrders } from "../../API/orders";
import "./Profile.css";

const statusLabel = (status) => {
  if (!status) return "-";
  const s = String(status).toLowerCase();
  if (s === "pending" || s === "pendiente") return "Pendiente";
  if (s === "paid" || s === "pagado") return "Pagado";
  return status;
};

function AdminProfile() {
  const { user } = useUser();

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserOrders, setSelectedUserOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingUserOrders, setLoadingUserOrders] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const [usersData, ordersData] = await Promise.all([
          fetchAllUsers(),
          fetchAllOrders(),
        ]);

        setUsers(Array.isArray(usersData) ? usersData : []);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (err) {
        console.error("Error cargando datos admin:", err?.response || err);
        const msg =
          err?.response?.data?.message ||
          err.message ||
          "Error obteniendo datos";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleViewUserOrders = async (u) => {
    setSelectedUser(u);
    setSelectedUserOrders([]);
    try {
      setLoadingUserOrders(true);
      const data = await fetchAllOrders();
      const ordersForUser = (data || []).filter(
        (o) => o.user?.user_id === (u.id || u._id)
      );
      setSelectedUserOrders(ordersForUser);
    } catch (err) {
      console.error("Error cargando compras del usuario:", err?.response || err);
    } finally {
      setLoadingUserOrders(false);
    }
  };

  const handleShowAllOrders = () => {
    setSelectedUser(null);
    setSelectedUserOrders([]);
  };

  const totalUsers = users.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (acc, o) => acc + (o.total_value || 0),
    0
  );

  const ordersToShow = selectedUser ? selectedUserOrders : orders;

  return (
    <div className="profile-page">
      {/* TÍTULO GENERAL */}
      <div className="profile-page-header">
        <div>
          <h1 className="profile-page-title">Perfil</h1>
          <p className="profile-page-subtitle">
            Panel de administración de la carnicería
          </p>
        </div>
      </div>

      <div className="profile-layout">
        {/* COLUMNA IZQUIERDA */}
        <div className="profile-sidebar">
          <div className="card profile-card profile-card-main">
            <div className="card-content">
              <p className="profile-greeting">Hola,</p>
              <p className="profile-name">
                {user.name || user.username || "Administrador"}
              </p>
              <p className="profile-email">{user.email}</p>
              <span className="profile-role-tag">Rol: {user.role}</span>
            </div>
          </div>

          <div className="card profile-card profile-card-summary">
            <div className="card-content">
              <p className="profile-summary-title">Resumen del sistema</p>
              <div className="profile-metrics-grid">
                <div className="profile-metric-card">
                  <span className="metric-label">Usuarios</span>
                  <span className="metric-value">{totalUsers}</span>
                </div>
                <div className="profile-metric-card">
                  <span className="metric-label">Pedidos</span>
                  <span className="metric-value">{totalOrders}</span>
                </div>
                <div className="profile-metric-card">
                  <span className="metric-label">Ingresos</span>
                  <span className="metric-value">${totalRevenue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="profile-main">
          {/* Usuarios */}
          <div className="profile-section">
            <div className="profile-section-header">
              <h2 className="profile-section-title">Usuarios registrados</h2>
            </div>

            {loading ? (
              <p>Cargando información...</p>
            ) : error ? (
              <p className="has-text-danger">{error}</p>
            ) : (
              <div className="profile-table-card">
                <div className="table-container profile-table-container">
                  <table className="table is-fullwidth is-hoverable profile-table">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id || u._id}>
                          <td>{u.name || u.username}</td>
                          <td>{u.email}</td>
                          <td>{u.role}</td>
                          <td>
                            <button
                              className="button is-small is-link is-light"
                              onClick={() => handleViewUserOrders(u)}
                            >
                              Ver compras
                            </button>
                          </td>
                        </tr>
                      ))}

                      {users.length === 0 && (
                        <tr>
                          <td colSpan="4" className="has-text-centered">
                            No hay usuarios registrados.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Compras */}
          <div className="profile-section">
            <div className="profile-section-header">
              <h2 className="profile-section-title">
                {selectedUser
                  ? `Compras de ${selectedUser.name || selectedUser.email}`
                  : "Compras generales"}
              </h2>

              {selectedUser && (
                <button
                  className="button is-small is-dark is-light profile-reset-orders-btn"
                  onClick={handleShowAllOrders}
                >
                  Ver compras generales
                </button>
              )}
            </div>

            <div className="profile-table-card">
              <div className="table-container profile-table-container">
                {loading && !error ? (
                  <p>Cargando pedidos...</p>
                ) : (
                  <table className="table is-fullwidth is-hoverable profile-table">
                    <thead>
                      <tr>
                        <th>ID Pedido</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersToShow.map((o) => (
                        <tr key={o.id || o._id}>
                          <td>{o.id || o._id}</td>
                          <td>
                            {o.order_date
                              ? new Date(o.order_date).toLocaleString()
                              : "-"}
                          </td>
                          <td>{o.user?.email}</td>
                          <td>${o.total_value}</td>
                          <td>{statusLabel(o.status)}</td>
                        </tr>
                      ))}

                      {!selectedUser &&
                        !loading &&
                        ordersToShow.length === 0 && (
                          <tr>
                            <td colSpan="5" className="has-text-centered">
                              Aún no hay pedidos en el sistema.
                            </td>
                          </tr>
                        )}

                      {selectedUser &&
                        !loadingUserOrders &&
                        ordersToShow.length === 0 && (
                          <tr>
                            <td colSpan="5" className="has-text-centered">
                              Este usuario aún no tiene compras.
                            </td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
