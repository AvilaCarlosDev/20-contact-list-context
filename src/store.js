const getState = ({ getStore, getActions, setStore }) => {
    return {
          store: {
                  contacts: [],
                  currentContact: null,
                  agenda_slug: "carlos-avila-agenda",
                  message: null,
                  error: null
          },
          actions: {
                  // Cargar contactos desde la API
            getContacts: async () => {
                      try {
                                  const store = getStore();
                                  const resp = await fetch(
                                                `https://playground.4geeks.com/contact/agendas/${store.agenda_slug}/contacts`
                                              );
                                  if (!resp.ok) {
                                                // Si no existe la agenda, crearla
                                    if (resp.status === 404) {
                                                    await getActions().createAgenda();
                                                    return;
                                    }
                                                throw new Error("Error al cargar contactos");
                                  }
                                  const data = await resp.json();
                                  setStore({ contacts: data.contacts || [] });
                      } catch (error) {
                                  setStore({ error: error.message });
                                  console.error(error);
                      }
            },

                  // Crear la agenda si no existe
                  createAgenda: async () => {
                            try {
                                        const store = getStore();
                                        const resp = await fetch(
                                                      `https://playground.4geeks.com/contact/agendas/${store.agenda_slug}`,
                                          {
                                                          method: "POST",
                                                          headers: { "Content-Type": "application/json" },
                                                          body: JSON.stringify({ slug: store.agenda_slug })
                                          }
                                                    );
                                        if (resp.ok) {
                                                      await getActions().getContacts();
                                        }
                            } catch (error) {
                                        console.error("Error creating agenda:", error);
                            }
                  },

                  // Agregar un contacto
                  addContact: async (contactData) => {
                            try {
                                        const store = getStore();
                                        const resp = await fetch(
                                                      `https://playground.4geeks.com/contact/agendas/${store.agenda_slug}/contacts`,
                                          {
                                                          method: "POST",
                                                          headers: { "Content-Type": "application/json" },
                                                          body: JSON.stringify(contactData)
                                          }
                                                    );
                                        if (!resp.ok) throw new Error("Error al agregar contacto");
                                        const data = await resp.json();
                                        setStore({ contacts: [...store.contacts, data] });
                                        return true;
                            } catch (error) {
                                        setStore({ error: error.message });
                                        console.error(error);
                                        return false;
                            }
                  },

                  // Actualizar un contacto
                  updateContact: async (id, contactData) => {
                            try {
                                        const store = getStore();
                                        const resp = await fetch(
                                                      `https://playground.4geeks.com/contact/agendas/${store.agenda_slug}/contacts/${id}`,
                                          {
                                                          method: "PUT",
                                                          headers: { "Content-Type": "application/json" },
                                                          body: JSON.stringify(contactData)
                                          }
                                                    );
                                        if (!resp.ok) throw new Error("Error al actualizar contacto");
                                        const data = await resp.json();
                                        const updatedContacts = store.contacts.map((c) =>
                                                      c.id === id ? data : c
                                                                                             );
                                        setStore({ contacts: updatedContacts });
                                        return true;
                            } catch (error) {
                                        setStore({ error: error.message });
                                        console.error(error);
                                        return false;
                            }
                  },

                  // Eliminar un contacto
                  deleteContact: async (id) => {
                            try {
                                        const store = getStore();
                                        const resp = await fetch(
                                                      `https://playground.4geeks.com/contact/agendas/${store.agenda_slug}/contacts/${id}`,
                                          { method: "DELETE" }
                                                    );
                                        if (!resp.ok) throw new Error("Error al eliminar contacto");
                                        const updatedContacts = store.contacts.filter((c) => c.id !== id);
                                        setStore({ contacts: updatedContacts });
                                        return true;
                            } catch (error) {
                                        setStore({ error: error.message });
                                        console.error(error);
                                        return false;
                            }
                  },

                  // Establecer el contacto actual para editar
                  setCurrentContact: (contact) => {
                            setStore({ currentContact: contact });
                  },

                  // Limpiar el contacto actual
                  clearCurrentContact: () => {
                            setStore({ currentContact: null });
                  },

                  // Limpiar errores
                  clearError: () => {
                            setStore({ error: null });
                  }
          }
    };
};

export default getState;
