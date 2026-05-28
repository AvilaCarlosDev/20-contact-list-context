import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ACTIONS } from "../store.js";
import { ContactCard } from "../component/ContactCard";

const AGENDA_SLUG = "carlos-avila-agenda";

export const Contacts = () => {
      const { store, dispatch } = useGlobalReducer();
      const [showDeleteModal, setShowDeleteModal] = useState(false);
      const [contactToDelete, setContactToDelete] = useState(null);

      const loadContacts = async () => {
              try {
                        let resp = await fetch(
                                    `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`
                                  );
                        if (resp.status === 404) {
                                    // Create agenda if not exists
                          await fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}`, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ slug: AGENDA_SLUG }),
                          });
                                    resp = await fetch(
                                                  `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`
                                                );
                        }
                        if (!resp.ok) throw new Error("Error cargando contactos");
                        const data = await resp.json();
                        dispatch({ type: ACTIONS.SET_CONTACTS, payload: data.contacts || [] });
              } catch (error) {
                        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
              }
      };

      useEffect(() => {
              loadContacts();
      }, []);

      const handleDeleteClick = (contact) => {
              setContactToDelete(contact);
              setShowDeleteModal(true);
      };

      const handleConfirmDelete = async () => {
              try {
                        const resp = await fetch(
                                    `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts/${contactToDelete.id}`,
                            { method: "DELETE" }
                                  );
                        if (!resp.ok) throw new Error("Error eliminando contacto");
                        dispatch({ type: ACTIONS.DELETE_CONTACT, payload: contactToDelete.id });
              } catch (error) {
                        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
              }
              setShowDeleteModal(false);
              setContactToDelete(null);
      };

      return (
              <div className="container mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="text-white">
                                      <i className="fas fa-address-book me-2"></i>i>
                                      Mis Contactos
                            </h1>h1>
                            <Link to="/add" className="btn btn-success btn-lg">
                                      <i className="fas fa-plus me-2"></i>i>
                                      Add new contact
                            </Link>Link>
                    </div>div>
              
                  {store.error && (
                          <div className="alert alert-danger alert-dismissible" role="alert">
                              {store.error}
                                    <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() => dispatch({ type: ACTIONS.CLEAR_ERROR })}
                                                  ></button>button>
                          </div>div>
                    )}
              
                  {store.contacts.length === 0 ? (
                          <div className="text-center text-white mt-5">
                                    <i className="fas fa-users fa-5x mb-4 text-secondary"></i>i>
                                    <h3>No hay contactos aun</h3>h3>
                                    <p className="text-secondary">
                                                Haz clic en "Add new contact" para agregar tu primer contacto.
                                    </p>p>
                          </div>div>
                        ) : (
                          <div>
                              {store.contacts.map((contact) => (
                                          <div className="mb-3" key={contact.id}>
                                                        <ContactCard
                                                                            contact={contact}
                                                                            onDelete={() => handleDeleteClick(contact)}
                                                                          />
                                          </div>div>
                                        ))}
                          </div>div>
                    )}
              
                  {showDeleteModal && (
                          <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                                    <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content bg-dark text-white">
                                                              <div className="modal-header">
                                                                              <h5 className="modal-title">
                                                                                                <i className="fas fa-exclamation-triangle text-warning me-2"></i>i>
                                                                                                Confirmar eliminacion
                                                                              </h5>h5>
                                                              </div>div>
                                                              <div className="modal-body">
                                                                              Estas seguro de eliminar a <strong>{contactToDelete?.name}</strong>strong>?
                                                              </div>div>
                                                              <div className="modal-footer">
                                                                              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                                                                                                Cancelar
                                                                              </button>button>
                                                                              <button className="btn btn-danger" onClick={handleConfirmDelete}>
                                                                                                <i className="fas fa-trash me-2"></i>i>Eliminar
                                                                              </button>button>
                                                              </div>div>
                                                </div>div>
                                    </div>div>
                          </div>div>
                    )}
              </div>div>
            );
};</div>
