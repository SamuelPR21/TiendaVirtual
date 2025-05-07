import React from "react";
import "./CartSidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function CartSidebar({ visible, onClose, cartItems, updateQuantity, removeItem, checkout }) {
    const totalAmount = cartItems.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);

    return (
        <div className={`cart-sidebar ${visible ? "is-visible" : ""}`}>
            <div className="cart-header">
                <h3 className="title is-4">Tu Carrito</h3>
                <button className="delete" onClick={onClose}></button>
            </div>
            <div className="cart-content">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="box">
                            <article className="media">
                                <figure className="media-left">
                                    <p className="image is-64x64">
                                        <img src={item.producto.imagen} alt={item.producto.nombre} />
                                    </p>
                                </figure>
                                <div className="media-content">
                                    <div className="content">
                                        <p><strong>{item.producto.nombre}</strong></p>
                                        <p>Stock: {item.producto.stock}</p>
                                        <div className="field is-grouped">
                                            <input
                                                className="input is-small"
                                                type="number"
                                                value={item.cantidad}
                                                min="1"
                                                max={item.producto.stock}
                                                onChange={(e) => updateQuantity(item.producto.id, parseInt(e.target.value))}
                                                style={{ width: "70px" }}
                                            />
                                            <p className="ml-2">Total: ${item.producto.precio * item.cantidad}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="media-right">
                                    <button
                                        className="button is-danger is-light is-small is-rounded ml-auto"
                                        onClick={() => removeItem(item.producto.id)}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            </article>
                        </div>
                    ))
                ) : (
                    <p className="has-text-centered">Su carrito está vacío</p>
                )}
            </div>
            {cartItems.length > 0 && (
                <div className="cart-footer p-3">
                    <p className="mb-2"><strong>Total:</strong> ${totalAmount}</p>
                    <button className="button is-success is-fullwidth" onClick={checkout}>Checkout</button>
                </div>
            )}
        </div>
    );
}