import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
    const avatarUrl = `https://i.pravatar.cc/60?img=${contact.id || 1}`;

    return (
          <div className="card bg-dark text-white border-secondary">
                <div className="card-body d-flex align-items-center">
                        <img
                                    src={avatarUrl}
                                    alt={contact.name}
                                    className="rounded-circle me-3"
                                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                    onError={(e) => {
                                                  e.target.src = "https://via.placeholder.com/60";
                                    }}
                                  />
                        <div className="flex-grow-1">
                                  <h5 className="card-title mb-1">{contact.name}</h5>h5>
                          {contact.address && (
                        <p className="card-text mb-1 text-secondary">
                                      <i className="fas fa-map-marker-alt me-2 text-warning"></i>i>
                          {contact.address}
                        </p>p>
                                  )}
                          {contact.phone && (
                        <p className="card-text mb-1 text-secondary">
                                      <i className="fas fa-phone me-2 text-info"></i>i>
                          {contact.phone}
                        </p>p>
                                  )}
                          {contact.email && (
                        <p className="card-text mb-0 text-secondary">
                                      <i className="fas fa-envelope me-2 text-success"></i>i>
                          {contact.email}
                        </p>p>
                                  )}
                        </div>div>
                        <div className="d-flex gap-2">
                                  <Link
                                                to={`/edit/${contact.id}`}
                                                className="btn btn-outline-light btn-sm"
                                                title="Editar contacto"
                                              >
                                              <i className="fas fa-pencil-alt"></i>i>
                                  </Link>Link>
                                  <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={onDelete}
                                                title="Eliminar contacto"
                                              >
                                              <i className="fas fa-trash"></i>i>
                                  </button>button>
                        </div>div>
                </div>div>
          </div>div>
        );
};</div>
