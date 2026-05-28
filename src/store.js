// Initial store state
export const initialStore = () => ({
      contacts: [],
      currentContact: null,
      agenda_slug: "carlos-avila-agenda",
      message: null,
      error: null,
});

// Actions as async thunks for useReducer pattern
export const ACTIONS = {
      SET_CONTACTS: "SET_CONTACTS",
      ADD_CONTACT: "ADD_CONTACT",
      UPDATE_CONTACT: "UPDATE_CONTACT",
      DELETE_CONTACT: "DELETE_CONTACT",
      SET_CURRENT_CONTACT: "SET_CURRENT_CONTACT",
      CLEAR_CURRENT_CONTACT: "CLEAR_CURRENT_CONTACT",
      SET_ERROR: "SET_ERROR",
      CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer function
export default function storeReducer(store, action = {}) {
      switch (action.type) {
          case ACTIONS.SET_CONTACTS:
                    return { ...store, contacts: action.payload };

          case ACTIONS.ADD_CONTACT:
                    return { ...store, contacts: [...store.contacts, action.payload] };

          case ACTIONS.UPDATE_CONTACT:
                    return {
                                ...store,
                                contacts: store.contacts.map((c) =>
                                              c.id === action.payload.id ? action.payload : c
                                                                     ),
                    };

          case ACTIONS.DELETE_CONTACT:
                    return {
                                ...store,
                                contacts: store.contacts.filter((c) => c.id !== action.payload),
                    };

          case ACTIONS.SET_CURRENT_CONTACT:
                    return { ...store, currentContact: action.payload };

          case ACTIONS.CLEAR_CURRENT_CONTACT:
                    return { ...store, currentContact: null };

          case ACTIONS.SET_ERROR:
                    return { ...store, error: action.payload };

          case ACTIONS.CLEAR_ERROR:
                    return { ...store, error: null };

          default:
                    return store;
      }
}
