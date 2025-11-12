import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { createRecipe } from "../../API/recipes";
import { fetchProducts } from "../../API/products";
import NavbarGeneral from "../Navbar/NavbarGeneral";
import Footer from "../Home/Footer/Footer";

// Validación rápida de ObjectId
const isObjectId = (s) => /^[0-9a-fA-F]{24}$/.test(s || "");

export default function AgregarReceta() {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([{ producto_id: "", quantity: 1 }]);

  const [catalog, setCatalog] = useState([]); // productos para seleccionar
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    // cargar productos públicos para ayudar a elegir IDs
    (async () => {
      try {
        const all = await fetchProducts(); // GET público
        setCatalog(all);
      } catch (e) {
        // no bloquear si falla
      }
    })();
  }, []);

  const addRow = () => setIngredients((arr) => [...arr, { producto_id: "", quantity: 1 }]);
  const removeRow = (idx) => setIngredients((arr) => arr.filter((_, i) => i !== idx));

  const updateRow = (idx, field, value) => {
    setIngredients((arr) => arr.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setOk(""); setErr("");

    if (!name.trim() || !instructions.trim() || ingredients.length === 0) {
      setErr("Completa nombre, instrucciones y al menos un ingrediente.");
      return;
    }
    for (const ing of ingredients) {
      if (!isObjectId(ing.producto_id)) return setErr("Cada ingrediente debe tener un producto_id (ObjectId) válido.");
      const q = Number(ing.quantity);
      if (Number.isNaN(q) || q <= 0) return setErr("Cada ingrediente debe tener quantity > 0.");
    }

    setLoading(true);
    try {
      await createRecipe({
        name: name.trim(),
        instructions: instructions.trim(),
        image_url: imageUrl.trim() || undefined,
        ingredients: ingredients.map(i => ({ producto_id: i.producto_id, quantity: Number(i.quantity) })),
      });
      setOk("Receta creada correctamente.");
      setName(""); setInstructions(""); setImageUrl("");
      setIngredients([{ producto_id: "", quantity: 1 }]);
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Error creando receta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarGeneral />
      <section className="section">
        <div className="container">
          <h1 className="title">Agregar Receta</h1>

          {ok && <div className="notification is-primary">{ok}</div>}
          {err && <div className="notification is-danger">{err}</div>}

          <form onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Nombre *</label>
              <div className="control">
                <input className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Sudado de Res" />
              </div>
            </div>

            <div className="field">
              <label className="label">Instrucciones *</label>
              <div className="control">
                <textarea className="textarea" rows={6} value={instructions} onChange={(e)=>setInstructions(e.target.value)} placeholder={`1) Paso uno...\n2) Paso dos...`} />
              </div>
              <p className="help">Puedes numerar pasos con 1), 2), 3) ...</p>
            </div>

            <div className="field">
              <label className="label">Imagen (URL Imgur)</label>
              <div className="control">
                <input className="input" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} placeholder="https://i.imgur.com/abc123.jpg" />
              </div>
              {imageUrl && (
                <figure className="image is-128x128 mt-2">
                  <img alt="preview" src={imageUrl} onError={(e)=>{e.currentTarget.src="https://via.placeholder.com/128x128?text=Preview"}}/>
                </figure>
              )}
            </div>

            <div className="field">
              <label className="label">Ingredientes *</label>
              <div className="box">
                {ingredients.map((row, idx) => (
                  <div key={idx} className="columns is-vcentered">
                    <div className="column is-5">
                      <label className="label is-small">Producto (ObjectId)</label>
                      <input
                        className={`input ${row.producto_id && !isObjectId(row.producto_id) ? "is-danger" : ""}`}
                        value={row.producto_id}
                        onChange={(e)=>updateRow(idx, "producto_id", e.target.value)}
                        placeholder="64f0c1a2b3c4d5e6f7a8b9c0"
                      />
                      {/* Ayuda visual: desplegable con productos para copiar su _id */}
                      {catalog.length > 0 && (
                        <div className="select is-small mt-2">
                          <select
                            onChange={(e)=>updateRow(idx, "producto_id", e.target.value)}
                            value=""
                          >
                            <option value="" disabled>Seleccionar desde catálogo…</option>
                            {catalog.map(p => (
                              <option key={p.id || p._id} value={p.id || p._id}>
                                {(p.name || "Producto")} — {(p.animal || "-")}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    <div className="column is-3">
                      <label className="label is-small">Cantidad</label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        className="input"
                        value={row.quantity}
                        onChange={(e)=>updateRow(idx, "quantity", e.target.value)}
                      />
                    </div>
                    <div className="column is-2">
                      <button type="button" className="button is-danger is-light" onClick={()=>removeRow(idx)} disabled={ingredients.length === 1}>
                        Quitar
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" className="button is-link is-light" onClick={addRow}>
                  + Agregar ingrediente
                </button>
              </div>
            </div>

            <div className="field">
              <button type="submit" className={`button is-primary ${loading ? "is-loading" : ""}`}>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
