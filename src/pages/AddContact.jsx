import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
          name: "",
          email: "",
          phone: "",
          address: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
          if (isEditing) {
                  const contact = store.contacts.find((c) => c.id === parseInt(id));
                  if (contact) {
                            setFormData({
                                        name: contact.name || "",
                                        email: contact.email || "",
                                        phone: contact.phone || "",
                                        address: contact.address || ""
                            });
                  } else {
                            actions.getContacts();
                  }
          }
    }, [id, store.contacts]);

    const handleChange = (e) => {
          setFormData({
                  ...formData,
                  [e.target.name]: e.target.value
          });
    };

    const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          setError(null);

          if (!formData.name.trim()) {
                  setError("El nombre es obligatorio");
                  setLoading(false);
                  return;
          }

          let success;
          if (isEditing) {
                  success = await actions.updateContact(parseInt(id), formData);
          } else {
                  success = await actions.addContact(formData);
          }

          if (success) {
                  navigate("/");
          } else {
                  setError("Hubo un error al guardar el contacto. Intenta de nuevo.");
          }
          setLoading(false);
    };

    return (
          <div className="container mt-4">
                <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                                  <div className="card bg-dark text-white border-secondary">
                                              <div className="card-header border-secondary">
                                                            <h3 className="mb-0">
                                                                            <i className={`fas fa-${isEditing ? "edit" : "user-plus"} me-2`}></i>i>
                                                              {isEditing ? "Editar Contacto" : "Agregar Nuevo Contacto"}
                                                            </h3>h3>
                                              </div>div>
                                              <div className="card-body">
                                                {error && (
                            <div className="alert alert-danger" role="alert">
                                              <i className="fas fa-exclamation-circle me-2"></i>i>
                              {error}
                            </div>div>
                                                            )}
                                              
                                                            <form onSubmit={handleSubmit}>
                                                                            <div className="mb-3">
                                                                                              <label htmlFor="name" className="form-label">
                                                                                                                  <i className="fas fa-user me-2 text-primary"></i>i>
                                                                                                                  Nombre completo *
                                                                                                </label>label>
                                                                                              <input
                                                                                                                    type="text"
                                                                                                                    className="form-control bg-secondary text-white border-0"
                                                                                                                    id="name"
                                                                                                                    name="name"
                                                                                                                    value={formData.name}
                                                                                                                    onChange={handleChange}
                                                                                                                    placeholder="Ej: Juan Perez"
                                                                                                                    required
                                                                                                                  />
                                                                            </div>div>
                                                            
                                                                            <div className="mb-3">
                                                                                              <label htmlFor="email" className="form-label">
                                                                                                                  <i className="fas fa-envelope me-2 text-success"></i>i>
                                                                                                                  Correo electronico
                                                                                                </label>label>
                                                                                              <input
                                                                                                                    type="email"
                                                                                                                    className="form-control bg-secondary text-white border-0"
                                                                                                                    id="email"
                                                                                                                    name="email"
                                                                                                                    value={formData.email}
                                                                                                                    onChange={handleChange}
                                                                                                                    placeholder="Ej: juan@email.com"
                                                                                                                  />
                                                                            </div>div>
                                                            
                                                                            <div className="mb-3">
                                                                                              <label htmlFor="phone" className="form-label">
                                                                                                                  <i className="fas fa-phone me-2 text-info"></i>i>
                                                                                                                  Telefono
                                                                                                </label>label>
                                                                                              <input
                                                                                                                    type="tel"
                                                                                                                    className="form-control bg-secondary text-white border-0"
                                                                                                                    id="phone"
                                                                                                                    name="phone"
                                                                                                                    value={formData.phone}
                                                                                                                    onChange={handleChange}
                                                                                                                    placeholder="Ej: (555) 123-4567"
                                                                                                                  />
                                                                            </div>div>
                                                            
                                                                            <div className="mb-4">
                                                                                              <label htmlFor="address" className="form-label">
                                                                                                                  <i className="fas fa-map-marker-alt me-2 text-warning"></i>i>
                                                                                                                  Direccion
                                                                                                </label>label>
                                                                                              <input
                                                                                                                    type="text"
                                                                                                                    className="form-control bg-secondary text-white border-0"
                                                                                                                    id="address"
                                                                                                                    name="address"
                                                                                                                    value={formData.address}
                                                                                                                    onChange={handleChange}
                                                                                                                    placeholder="Ej: Calle Principal 123, Ciudad"
                                                                                                                  />
                                                                            </div>div>
                                                            
                                                                            <div className="d-flex gap-3">
                                                                                              <button
                                                                                                                    type="button"
                                                                                                                    className="btn btn-secondary flex-grow-1"
                                                                                                                    onClick={() => navigate("/")}
                                                                                                                    disabled={loading}
                                                                                                                  >
                                                                                                                  <i className="fas fa-arrow-left me-2"></i>i>
                                                                                                                  Cancelar
                                                                                                </button>button>
                                                                                              <button
                                                                                                                    type="submit"
                                                                                                                    className="btn btn-primary flex-grow-1"
                                                                                                                    disabled={loading}
                                                                                                                  >
                                                                                                {loading ? (
                                                                                                                                          <>
                                                                                                                                                                  <span
                                                                                                                                                                                              className="spinner-border spinner-border-sm me-2"
                                                                                                                                                                                              role="status"
                                                                                                                                                                                            ></span>span>
                                                                                                                                                                  Guardando...
                                                                                                                                            </>>
                                                                                                                                        ) : (
                                                                                                                                          <>
                                                                                                                                                                  <i className={`fas fa-${isEditing ? "save" : "plus"} me-2`}></i>i>
                                                                                                                                            {isEditing ? "Actualizar" : "Agregar"} Contacto
                                                                                                                                            </>>
                                                                                                                                        )}
                                                                                                </button>button>
                                                                            </div>div>
                                                            </form>form>
                                              </div>div>
                                  </div>div>
                        </div>div>
                </div>div>
          </div>div>
        );
};</></></div>
