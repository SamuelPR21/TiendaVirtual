// src/components/Cart/PaymentModal.js
import React, { useState, useEffect } from "react";
import "./PaymentModal.css";
import { checkoutPayment } from "../../API/payments";

function PaymentModal({ isOpen, onClose, order, onPaid }) {
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Cada vez que abrimos el modal, reseteamos el estado
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setError(null);
      setLoading(false);
      setCardHolder("");
      setCardNumber("");
      setExpMonth("");
      setExpYear("");
      setCvv("");
    }
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const payload = {
        order_id: order.id || order._id,
        amount: order.total_value,
        card_holder: cardHolder,
        card_number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvv,
      };

      const result = await checkoutPayment(payload);
      onPaid && onPaid(result);   // limpia carrito, etc.
      setSuccess(true);           // cambiamos a pantalla de éxito
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err.message ||
        "Error procesando el pago";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="payment-overlay" onClick={onClose}></div>

      <div className="payment-modal">
        <header className="payment-header">
          <h2>{success ? "Pago exitoso" : "Pago seguro"}</h2>
          <button className="delete" onClick={onClose}></button>
        </header>

        <section
          className={`payment-body ${success ? "payment-body-success" : ""}`}
        >
          {success ? (
            <>
              <div className="payment-success-icon">
                <i className="fas fa-check"></i>
              </div>
              <h3 className="payment-success-title">¡Gracias por tu compra!</h3>
              <p className="payment-success-text">
                Tu pedido estará listo pronto. Te enviaremos la confirmación al
                correo registrado.
              </p>
              <button
                className="button is-fullwidth payment-submit-btn"
                onClick={onClose}
              >
                Seguir comprando
              </button>
            </>
          ) : (
            <>
              <div className="payment-summary">
                <p className="payment-summary-title">Resumen de compra</p>
                <p className="payment-summary-order">
                  Pedido:{" "}
                  <strong>{order.id || order._id}</strong>
                </p>
                <p className="payment-summary-total">
                  Total a pagar:{" "}
                  <strong>${order.total_value}</strong>
                </p>
              </div>

              <form className="payment-form" onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Nombre del titular</label>
                  <div className="control">
                    <input
                      className="input payment-input"
                      type="text"
                      placeholder="Nombre como aparece en la tarjeta"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Número de tarjeta</label>
                  <div className="control">
                    <input
                      className="input payment-input"
                      type="text"
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control is-expanded">
                    <label className="label">Mes</label>
                    <input
                      className="input payment-input"
                      type="text"
                      placeholder="MM"
                      value={expMonth}
                      onChange={(e) => setExpMonth(e.target.value)}
                      required
                    />
                  </div>
                  <div className="control is-expanded">
                    <label className="label">Año</label>
                    <input
                      className="input payment-input"
                      type="text"
                      placeholder="AA"
                      value={expYear}
                      onChange={(e) => setExpYear(e.target.value)}
                      required
                    />
                  </div>
                  <div className="control is-expanded">
                    <label className="label">CVV</label>
                    <input
                      className="input payment-input"
                      type="password"
                      placeholder="***"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <p className="has-text-danger" style={{ fontSize: "0.85rem" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="button is-fullwidth payment-submit-btn"
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Pagar ahora"}
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default PaymentModal;
