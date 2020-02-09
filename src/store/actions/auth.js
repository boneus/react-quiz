import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes"




export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8v-iULSkEPfZp9wYnEXMp_eMcfFZSAcc'

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8v-iULSkEPfZp9wYnEXMp_eMcfFZSAcc'
    }

    const response = await axios.post(url, authData)
    const data = response.data
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate', expirationDate)

    dispatch(authSuccess(data.idToken))
    dispatch(autoLogout(data.expiresIn))
  }
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')

  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogout(expiresIn) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expiresIn * 1000)
  }
}

export function autoLogin() {

}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}