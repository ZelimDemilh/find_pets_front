const initialState = {
  userDate: {},
  signingIn: false,
  error: null,
  token: localStorage.getItem('token'),
}

export const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'signInReducer/signIn/pending':
      return {
        ...state,
        signingIn: true,
        error: null,
      }
    case 'signInReducer/signIn/fulfilled':
      return {
        ...state,
        token: action.payload,
        error: null,
        signingIn: false,
        userDate: {}
      }
    case 'signInReducer/signIn/rejected':
      return {
        ...state,
        signingIn: false,
        error: action.error,
      }
    case 'signInReducer/userDate/fulfilled':
      return {
        ...state,
        error: null,
        signingIn: false,
        userDate: action.payload,
      }
    case 'singInReducer/singOut/fulfilled': {
      return {
        ...state,
        token: null,
        error: null,
        signingIn: false,
      }
    }
    default:
      return state
  }
}
export const auth = (userDate) => {
  return (dispatch) => {
    dispatch({ type: 'signInReducer/signIn/pending' })
    fetch('http://localhost:6557/users/login', {
      method: 'POST',
      body: JSON.stringify(userDate),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.error) {
          dispatch({ type: 'signInReducer/signIn/rejected', error: data.error })
        } else {
          dispatch({ type: 'signInReducer/signIn/fulfilled', payload: data })
          localStorage.setItem('token', data)
        }
      })
  }
}

export const uploadUserDate = () => {
  return (dispatch) => {
    fetch('http://localhost:6557/users/profile', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${initialState.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch({ type: 'signInReducer/signIn/rejected' })
        } else {
          dispatch({ type: 'signInReducer/userDate/fulfilled', payload: data })
        }
      })
  }
}

export const exitInAccount = () => {
  return (dispatch) => {
    localStorage.removeItem('token')
    dispatch({ type: 'singInReducer/singOut/fulfilled' })
  }
}
