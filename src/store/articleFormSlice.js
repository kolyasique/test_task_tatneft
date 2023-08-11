/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const articleFormSlice = createSlice({
  name: 'articleForm',
  initialState: {
    inputs:{ title: '', content: '', theme:'', author:''},
    visible: false,
    type: null,
    idForUpd:null
  },
  reducers: {
    setVisible(state, action) {
      state.visible = !state.visible
    },
    setType(state, action) {
        if(action.payload.type ==='CREATE'){
            console.log('setTYpe',action.payload.type )
            state.inputs = { title: '', content: '', theme:'', author:''}
            state.type = action.payload.type
        }
        else if(action.payload.type ==='UPDATE'){
            console.log('setTYpe',action.payload.type )
            state.inputs = action.payload.initialState
            state.type = action.payload.type
            state.idForUpd = action.payload.id
        }
        
    },
  },
});

export const { setVisible, setType } = articleFormSlice.actions;
export default articleFormSlice.reducer;
