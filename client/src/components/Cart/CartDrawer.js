// src/components/Cart/CartDrawer.js
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import "./CartDrawer.css";
import PaymentModal from "./PaymentModal";
import { createOrder } from "../../API/orders";

const getProductId = (product) => product?._id || product?.id;

function CartDrawer({ isOpen, onClose }) {
  const {
    items,
    totalValue,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { user } = useUser();

  const [creatingOrder, setCreatingOrder] = useState(false);
  const [orderForPayment, setOrderForPayment] = useState(null);
  const [flowError, setFlowError] = useState(null);

  if (!isOpen) return null;

  const handleDecrease = (productId, currentQty) => {
    if (currentQty <= 1) return;
    updateQuantity(productId, currentQty - 1);
  };

  const handleIncrease = (productId, currentQty) => {
    updateQuantity(productId, currentQty + 1);
  };

  const handleConfirmClick = async () => {
    setFlowError(null);

    if (!user) {
      setFlowError("Debes iniciar sesión para confirmar tu pedido.");
      return;
    }

    if (!items.length) {
      setFlowError("No tienes productos en el carrito.");
      return;
    }

    try {
      setCreatingOrder(true);

      const productsPayload = items.map(({ product, quantity }) => ({
        product_id: getProductId(product),
        quantity,
        value: (product.price_lb || product.price || 0) * quantity,
      }));

      const userPayload = {
        user_id: user.id || user._id,
        email: user.email,
        address: user.address || "Sin dirección",
        phone_Number: user.phone_Number || user.phone || "",
      };

      const payload = {
        total_value: totalValue,
        status: "PENDING",
        products: productsPayload,
        user: userPayload,
      };

      const newOrder = await createOrder(payload);

      // Abrimos el modal de pago con la orden creada
      setOrderForPayment(newOrder);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Error al crear el pedido";
      setFlowError(msg);
    } finally {
      setCreatingOrder(false);
    }
  };

  const handlePaid = (result) => {
    // result: { payment, order }
    // Solo limpiamos el carrito; el mensaje de éxito lo maneja PaymentModal
    clearCart();
  };

  return (
    <>
      {/* Overlay del drawer */}
      <div className="cart-overlay" onClick={onClose}></div>

      {/* Drawer */}
      <aside className="cart-drawer">
        {/* HEADER */}
        <header className="cart-drawer-header">
          <h2 className="cart-drawer-title">
            <span className="cart-title-icon">
              <i className="fas fa-shopping-basket"></i>
            </span>
            Tu carrito
          </h2>
          <button
            className="delete cart-close-btn"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>

        {/* BODY */}
        <section className="cart-drawer-body">
          {items.length === 0 ? (
            <p className="cart-empty-text">
              Aún no tienes productos en el carrito.
            </p>
          ) : (
            items.map(({ product, quantity }) => {
              const productId = getProductId(product);
              const priceUnit = product.price_lb || product.price || 0;
              const subtotal = priceUnit * quantity;

              return (
                <article className="cart-item-card" key={productId}>
                  <div className="cart-item-image">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} />
                    ) : (
                      <div className="cart-item-no-image">Sin imagen</div>
                    )}
                  </div>

                  <div className="cart-item-content">
                    {/* Primera fila */}
                    <div className="cart-item-header-row">
                      <h3 className="cart-item-name">{product.name}</h3>
                      <button
                        className="icon-button"
                        onClick={() => removeFromCart(productId)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>

                    {/* Precio */}
                    <p className="cart-item-price">
                      ${priceUnit} <span className="cart-item-unit">/Lb</span>
                    </p>

                    {/* Cantidad + subtotal */}
                    <div className="cart-item-bottom-row">
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            handleDecrease(productId, quantity)
                          }
                          disabled={quantity <= 1}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="qty-value">{quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            handleIncrease(productId, quantity)
                          }
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>

                      <div className="cart-item-subtotal-box">
                        <span className="cart-item-subtotal-label">
                          Subtotal
                        </span>
                        <span className="cart-item-subtotal-value">
                          ${subtotal}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>

        {/* FOOTER */}
        <footer className="cart-drawer-footer">
          <div className="cart-total-row">
            <span>Total del pedido</span>
            <strong>${totalValue}</strong>
          </div>

          {flowError && (
            <p className="has-text-danger" style={{ fontSize: "0.85rem" }}>
              {flowError}
            </p>
          )}

          <button
            className="button is-fullwidth cart-confirm-btn"
            disabled={items.length === 0 || creatingOrder}
            onClick={handleConfirmClick}
          >
            {creatingOrder ? "Creando pedido..." : "Confirmar pedido"}
          </button>

          {items.length > 0 && (
            <button
              className="button is-text is-small cart-clear-btn"
              onClick={clearCart}
            >
              Vaciar carrito
            </button>
          )}
        </footer>

        {/* Modal de pago */}
        <PaymentModal
          isOpen={!!orderForPayment}
          order={orderForPayment}
          onClose={() => {
            setOrderForPayment(null);
            // Si quieres que también se cierre el drawer al terminar:
            // onClose();
          }}
          onPaid={handlePaid}
        />
      </aside>
    </>
  );
}

export default CartDrawer;
