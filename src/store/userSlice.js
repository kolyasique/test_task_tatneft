import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// const URL = process.env.REACT_APP_BASE_URL;


const initialState = {
  list: [],
  loading: 'idle'
}


export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async () => {
    const response = 
      await fetch('http://localhost:5000/users',{
    
  })
  console.log(response)
    return (await response.json())
  }
)

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setContentCount(state, action) {

    },
    setElement() {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      console.log('sucks')
      state.list = action.payload
      state.loading = 'succeeded'
    });
    builder.addCase(getAllUsers.pending, (state, action) => {
      console.log('pend')
      state.loading = 'pending'
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      console.log('fail')
      state.loading = 'failed'
    });
  },
});

export const { setContentCount } = userSlice.actions;
export default userSlice.reducer;
