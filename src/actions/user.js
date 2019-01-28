export const AUTHENTICATING_USER = 'AUTHENTICATING_USER'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const FAILED_LOGIN = 'FAILED_LOGIN'
export const LOG_OUT = 'LOG_OUT'

const ROOT_URL = 'http://localhost:3000/api/v1';

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER })

    fetch(`${ROOT_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch({ type: SET_CURRENT_USER, payload: JSONResponse.user })
      })
      .catch(r => r.json().then(e => dispatch({ type: FAILED_LOGIN, payload: e.message })))

  }
}

export const fetchCurrentUser = () => {
  return (dispatch) => {
    dispatch(authenticatingUser())
    fetch(`${ROOT_URL}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then((JSONResponse) => dispatch(setCurrentUser(JSONResponse.user)))
  }
}

export const setCurrentUser = (userData) => ({
  type: SET_CURRENT_USER,
  payload: userData
})

export const failedLogin = (errorMsg) => ({
  type: FAILED_LOGIN,
  payload: errorMsg
})

export const authenticatingUser = () => ({ type: AUTHENTICATING_USER })

export const logOut = () => ({type: LOG_OUT })

export const signupUser = (username, password) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATING_USER })

    let data = new FormData()
    data.append('username', username)
    data.append('password', password)


    fetch(`${ROOT_URL}/users`, {
      method: 'POST',
      body: data,
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch({ type: SET_CURRENT_USER, payload: JSONResponse.user })
      })
      .catch(r => r.json().then(e => dispatch({ type: FAILED_LOGIN, payload: e.message })))

  }
}
