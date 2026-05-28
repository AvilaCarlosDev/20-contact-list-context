import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/ContactCard";

export const Contacts = () => {
    const { store, actions } = useContext(Context);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    useEffect(() => {
          actions.getContacts();
    }, []);

    const handleDeleteClick = (contact) => {
          setContactToDelete(contact);
          setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
          if (contactToDelete) {
                  await actions.deleteContact(contactToDelete.id);
                  setShowDeleteModal(false);
                  setContactToDelete(null);
          }
    };

    const handleCancelDelete = () => {
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
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {store.error}
                              <button
                                            type="button"
                                            className="btn-close"
                                            onClick={actions.clearError}
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
                    <div className="row">
                      {store.contacts.map((contact) => (
                                  <div className="col-12 mb-3" key={contact.id}>
                                                <ContactCard
                                                                  contact={contact}
                                                                  onDelete={() => handleDeleteClick(contact)}
                                                                />
                                  </div>div>
                                ))}
                    </div>div>
                )}
          
            {/* Modal de confirmacion de borrado */}
            {showDeleteModal && (
                    <div
                                className="modal show d-block"
                                tabIndex="-1"
                                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                              >
                              <div className="modal-dialog modal-dialog-centered">
                                          <div className="modal-content bg-dark text-white">
                                                        <div className="modal-header border-secondary">
                                                                        <h5 className="modal-title">
                                                                                          <i className="fas fa-exclamation-triangle text-warning me-2"></i>i>
                                                                                          Confirmar eliminacion
                                                                        </h5>h5>
                                                        </div>div>
                                                        <div className="modal-body">
                                                                        <p>
                                                                                          Estas seguro de que quieres eliminar el contacto{" "}
                                                                                          <strong>{contactToDelete?.name}</strong>strong>? Esta accion no se
                                                                                          puede deshacer.
                                                                        </p>p>
                                                        </div>div>
                                                        <div className="modal-footer border-secondary">
                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-secondary"
                                                                                            onClick={handleCancelDelete}
                                                                                          >
                                                                                          Cancelar
                                                                        </button>button>
                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-danger"
                                                                                            onClick={handleConfirmDelete}
                                                                                          >
                                                                                          <i className="fas fa-trash me-2"></i>i>
                                                                                          Eliminar
                                                                        </button>button>
                                                        </div>div>
                                          </div>div>
                              </div>div>
                    </div>div>
                )}
          </div>div>
        );
};</div>
