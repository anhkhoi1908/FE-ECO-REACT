import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    access_token: '',
    isLoading: false,
    isAdmin: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
        const {name, email, access_token, isAdmin} = action.payload
        // console.log('action', action)
        state.name = name || email
        state.email = email
        state.access_token = access_token  
        state.isAdmin = true
    },
    resetUser: (state) => {
      state.name = ''
      state.email = ''
      state.access_token = ''
      state.access_token = false
  }
  }
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer