import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import { createProduct } from "../../API/products";
import NavbarGeneral from "../Navbar/NavbarGeneral";
import Footer from "../Home/Footer/Footer";

const initial = {
  name: "",
  price_lb: "",
  description: "",
  stock: "",
  animal: "res",
  image_url: "",
};

export default function AgregarProducto() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setOk(""); setErr("");

    // Validaciones simples
    if (!form.name || !form.price_lb || !form.description || !form.stock || !form.animal) {
      setErr("Completa todos los campos obligatorios.");
      return;
    }
    const price = Number(form.price_lb);
    const stock = Number(form.stock);
    if (Number.isNaN(price) || price <= 0) return setErr("price_lb debe ser un número > 0.");
    if (Number.isNaN(stock) || stock < 0) return setErr("stock debe ser un número >= 0.");

    setLoading(true);
    try {
      await createProduct({
        name: form.name.trim(),
        price_lb: price,
        description: form.description.trim(),
        stock,
        animal: form.animal,
        image_url: form.image_url.trim() || undefined, // opcional
      });
      setOk("Producto creado correctamente.");
      setForm(initial);
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Error creando producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarGeneral />
      <section className="section">
        <div className="container">
          <h1 className="title">Agregar Producto</h1>

          {ok && <div className="notification is-primary">{ok}</div>}
          {err && <div className="notification is-danger">{err}</div>}

          <form onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Nombre *</label>
              <div className="control">
                <input className="input" name="name" value={form.name} onChange={onChange} placeholder="Ribeye" />
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Precio / lb (COP) *</label>
                  <div className="control">
                    <input className="input" name="price_lb" value={form.price_lb} onChange={onChange} type="number" min="1" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Stock *</label>
                  <div className="control">
                    <input className="input" name="stock" value={form.stock} onChange={onChange} type="number" min="0" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Animal *</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select name="animal" value={form.animal} onChange={onChange}>
                        <option value="res">Res</option>
                        <option value="cerdo">Cerdo</option>
                        <option value="pollo">Pollo</option>
                        <option value="pescado">Pescado</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Descripción *</label>
              <div className="control">
                <textarea className="textarea" name="description" value={form.description} onChange={onChange} rows={3} />
              </div>
            </div>

            <div className="field">
              <label className="label">Imagen (URL Imgur)</label>
              <div className="control">
                <input className="input" name="image_url" value={form.image_url} onChange={onChange} placeholder="https://i.imgur.com/abc123.jpg" />
              </div>
              {form.image_url && (
                <figure className="image is-128x128 mt-2">
                  <img alt="preview" src={form.image_url} onError={(e)=>{e.currentTarget.src="https://via.placeholder.com/128x128?text=Preview"}}/>
                </figure>
              )}
            </div>

            <div className="field">
              <div className="control">
                <button className={`button is-primary ${loading ? "is-loading" : ""}`} type="submit">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
