import { createSlice, configureStore } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from '../Data/firebase'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    errorMessage: 'incorrect password',
    user: null,
  },
  reducers: {
    submit(state, { payload: { user, error } }) {
      console.log(state.isLoggedIn)
      if (user) {
        state.isLoggedIn = true
        state.user = JSON.stringify(user)
      } else {
        state.errorMessage = error
      }
    },

    resetErrorMessage(state, action) {
      state.errorMessage = action.payload
    },
  },
})

export const submit = function ({ type, email, password, navigate }) {
  return async dispatch => {
    try {
      let userCredentials
      switch (type) {
        case 'SIGNUP':
          userCredentials = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          )
          break
        case 'LOGIN':
          userCredentials = await signInWithEmailAndPassword(
            auth,
            email,
            password
          )
          break
        case 'GOOGLE':
          userCredentials = await signInWithPopup(auth, googleProvider)
          break
        case 'FACEBOOK':
          userCredentials = await signInWithPopup(auth, facebookProvider)
          break
        case 'GITHUB':
          userCredentials = await signInWithPopup(auth, githubProvider)
        default:
          break
      }
      dispatch(
        authSlice.actions.submit({
          user: userCredentials.user,
          error: null,
        })
      )
      navigate('/profile')
    } catch (err) {
      dispatch(
        authSlice.actions.submit({
          user: null,
          error: err.message,
        })
      )
    }
  }
}

export const actions = authSlice.actions
export const store = configureStore({
  reducer: authSlice.reducer,
})
