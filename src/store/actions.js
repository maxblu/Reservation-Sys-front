import axios from "../axiosInstance";

export const GET_RESERVATIONS = "GET_RESERVATIONS";
export const GET_RESERVATIONSID = "GET_RESERVATIONSID";
export const UPDATE_RESERVATION = "UPDATE_RESERVATION";
export const CREATE_RESERVATION = "CREATE_RESERVATION";
export const DELETE_RESERVATION = "DELETE_RESERVATION";

export const GET_CONTACTS = "GET_CONTACTS";
export const GET_CONTACTSID = "GET_CONTACTSID";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const CREATE_CONTACT = "CREATE_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";

export const SET_LOADING = "SET_LOADING";
export const SUCCESS = "SUCCESS";
export const FAIL = "FAIL";

export const ADD_ING = "ADD_ING";
export const SUB_ING = "SUB_ING";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

// export const authCheckSate = () => {
//   return (dispatch) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       dispatch(log());
//     } else {
//       const expirationDate = new Date(localStorage.getItem('expirationDate'));
//       if(expirationDate <= new Date){
//         dispatch(lo)
//       }
//       else{

//         dispatch(authSuccess());
//       }
//     }
//   };
// };

// export const checkTokenTimeOut = (expeiztionTime) => {
//   return (dispatch) => {
//     setTimeout(() => dispatch(logout()), parseInt(expeiztionTime) * 1000);
//   };
// };

// export const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("expirationDate");

//   return {
//     type: AUTH_LOGOUT,
//   };
// };

// export const fetch_ing = (ingredients) => {
//   return {
//     type: SET_ING,
//     ingredients: ingredients,
//   };
// };

// export const store_results = (endpoint) => {
//   return (dispatch, getState) => {
//     axios
//       .get(endpoint)
//       .then((response) => {
//         console.log(response.data);
//         dispatch(fetch_ing(response.data));
//         // this.setState({ingredients:response.data});
//         // console.log(response.data);
//         // this.props.setIngredients(response.data)
//       })
//       .catch((error) => {
//         // this.setState({error:true})
//         console.log(error);
//       });
//   };
// };

// export const authStart = () => {
//   return {
//     type: AUTH_START,
//   };
// };

// export const authSuccess = (authData) => {
//   return {
//     type: AUTH_SUCCESS,
//     authData: authData,
//   };
// };

// export const authFail = (error) => {
//   return {
//     type: AUTH_FAIL,
//     error: error,
//   };
// };

// export const auth = (email, password, method) => {
//   return (dispatch) => {
//     dispatch(authStart());
//     const authData = {
//       email: email,
//       password: password,
//       returnSecureToken: true,
//     };

//     console.log(method);
//     let url =
//       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyunekmkqwDPhszx4-Hwy97_VGzlzP9kA";

//     if (!method) {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyunekmkqwDPhszx4-Hwy97_VGzlzP9kA";
//     }

//     axios
//       .post(url, authData)
//       .then((resp) => {
//         console.log(resp);
//         const expirationDate = new Date(
//           new Date().getTime() + parseInt(resp.data.expiresIn) * 1000
//         );
//         localStorage.setItem("token", resp.data.idToken);
//         localStorage.setItem("expirationDate", expirationDate);
//         dispatch(authSuccess(resp.data));
//         dispatch(checkTokenTimeOut(resp.data.expiresIn));
//       })
//       .catch((err) => {
//         console.log(err);
//         dispatch(authFail(err.response.data.error));
//       });
//   };
// };
