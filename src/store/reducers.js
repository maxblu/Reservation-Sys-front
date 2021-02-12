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
    default:
      return state;
  }
};

export default reducer;
