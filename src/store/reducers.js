import * as actionType from "./actions";

const initState = {
  reservations: [],
  contacts: [],
  contactTypes: [],
  reservationId: null,
  contactId: null,
  contactName: null,
  typeName: null,
  phone: null,
  birthday: null,
  date: null,
  title: null,
  pageData: null,
  loding: null,
  error: null,
  errorsMessages: [],
};

const reducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case actionType.SET_LOADING: {
      return { ...state, loading: action.value };
    }

    case actionType.SET_CONTACTTYPES: {
      return {
        ...state,
        loading: false,
        contactTypes: action.contactTypes,
        typeName: action.currentContactTypeName,
      };
    }

    case actionType.FAIL: {
      return {
        ...state,
        loading: false,
        error: true,
        errorsMessages: action.errors,
      };
    }

    default:
      return state;
  }
};

export default reducer;
