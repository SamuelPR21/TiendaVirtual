// src/components/Profile/CustomerProfile.js
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import {
  fetchOrdersByUser,
  updateOrderStatus,
} from "../../API/orders";
import PaymentModal from "../Cart/PaymentModal";
import "./Profile.css";

const normalizeStatus = (status) =>
  String(status || "").toLowerCase();

const statusLabel = (status) => {
  const s = normalizeStatus(status);
  if (s === "pending" || s === "pendiente") return "Pendiente";
  if (s === "paid" || s === "pagado") return "Pagado";
  return status || "-";
};

function CustomerProfile() {
  const { user } = useUser();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [orderForPayment, setOrderForPayment] = useState(null);
  const [paying, setPaying] = useState(false);

  const userId = user?.id || user?._id;

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchOrdersByUser(userId);
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error cargando pedidos del usuario:", err?.response || err);
        const msg =
          err?.response?.data?.message ||
          err.message ||
          "Error obteniendo tus pedidos";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  // === MÉTRICAS RESUMEN ===
  const completedOrders = orders.filter((o) => {
    const s = normalizeStatus(o.status);
    return s === "paid" || s === "pagado";
  });

  const pendingOrders = orders.filter((o) => {
    const s = normalizeStatus(o.status);
    return s === "pending" || s === "pendiente";
  });

  const totalCompleted = completedOrders.length;
  const totalPending = pendingOrders.length;

  // Total gastado SOLO en pedidos completados
  const totalSpent = completedOrders.reduce(
    (acc, o) => acc + (o.total_value || 0),
    0
  );

  // === FLUJO DE PAGO ===
  const handlePayClick = (order) => {
    setOrderForPayment(order);
  };

  const handlePaid = async (result) => {
    try {
      setPaying(true);
      const paidOrder = result?.order || orderForPayment;
      if (paidOrder) {
        const id = paidOrder.id || paidOrder._id;

        // Actualizamos en backend a PAID
        await updateOrderStatus(id, "PAID");

        // Actualizamos en memoria
        setOrders((prev) =>
          prev.map((o) =>
            (o.id || o._id) === id ? { ...o, status: "PAID" } : o
          )
        );
      }
    } catch (err) {
      console.error("Error actualizando estado a PAID:", err?.response || err);
    } finally {
      setPaying(false);
      setOrderForPayment(null);
    }
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-page-header">
          <div>
            <h1 className="profile-page-title">Perfil</h1>
            <p className="profile-page-subtitle">
              Debes iniciar sesión para ver tu perfil.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* TÍTULO GENERAL CENTRADO */}
      <div className="profile-page-header">
        <div>
          <h1 className="profile-page-title">Perfil</h1>
          <p className="profile-page-subtitle">
            Aquí puedes ver tu información y el historial de tus compras.
          </p>
        </div>
      </div>

      <div className="profile-layout">
        {/* COLUMNA IZQUIERDA */}
        <div className="profile-sidebar">
          <div className="card profile-card profile-card-main">
            <div className="card-content">
              <p className="profile-name">
                {user.name || user.username || "Cliente"}
              </p>
              <p className="profile-email">{user.email}</p>
              <span className="profile-role-tag profile-role-tag-customer">
                Rol: customer
              </span>

              <div style={{ marginTop: "1.1rem" }}>
                <p>
                  <strong>Dirección:</strong>{" "}
                  {user.address || "Sin dirección registrada"}
                </p>
                <p style={{ marginTop: "0.4rem" }}>
                  <strong>Teléfono:</strong>{" "}
                  {user.phone_Number || user.phone || "Sin teléfono registrado"}
                </p>
              </div>
            </div>
          </div>

          <div className="card profile-card profile-card-summary">
            <div className="card-content">
              <p className="profile-summary-title">Resumen de compras</p>
              <div className="profile-metrics-grid">
                <div className="profile-metric-card">
                  <span className="metric-label">Completados</span>
                  <span className="metric-value">{totalCompleted}</span>
                </div>
                <div className="profile-metric-card">
                  <span className="metric-label">Pendientes</span>
                  <span className="metric-value">{totalPending}</span>
                </div>
                <div className="profile-metric-card">
                  <span className="metric-label">Total gastado</span>
                  <span className="metric-value">${totalSpent}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="profile-main">
          <div className="profile-section">
            <div className="profile-section-header">
              <h2 className="profile-section-title">Mis compras</h2>
            </div>

            <div className="profile-table-card">
              {loading ? (
                <p>Cargando tus pedidos...</p>
              ) : error ? (
                <p className="has-text-danger">{error}</p>
              ) : (
                <div className="table-container profile-table-container">
                  <table className="table is-fullwidth is-hoverable profile-table">
                    <thead>
                      <tr>
                        <th>ID Pedido</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => {
                        const statusText = statusLabel(o.status);
                        const s = normalizeStatus(o.status);
                        const isPending =
                          s === "pending" || s === "pendiente";

                        return (
                          <tr key={o.id || o._id}>
                            <td>{o.id || o._id}</td>
                            <td>
                              {o.order_date
                                ? new Date(o.order_date).toLocaleString()
                                : "-"}
                            </td>
                            <td>${o.total_value}</td>
                            <td>{statusText}</td>
                            <td>
                              {isPending ? (
                                <button
                                  className="button is-small is-success"
                                  onClick={() => handlePayClick(o)}
                                  disabled={paying}
                                >
                                  Pagar ahora
                                </button>
                              ) : (
                                <span
                                  style={{
                                    fontSize: "0.8rem",
                                    opacity: 0.7,
                                  }}
                                >
                                  —
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                      {!loading && orders.length === 0 && (
                        <tr>
                          <td colSpan="5" className="has-text-centered">
                            Aún no has realizado compras.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE PAGO PARA ÓRDENES PENDIENTES */}
      <PaymentModal
        isOpen={!!orderForPayment}
        order={orderForPayment}
        onClose={() => setOrderForPayment(null)}
        onPaid={handlePaid}
      />
    </div>
  );
}

export default CustomerProfile;
