import { createSlice } from '@reduxjs/toolkit';

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
            state.inputs = { title: '', content: '', theme:'', author:''}
            state.type = action.payload.type
        }
        else if(action.payload.type ==='UPDATE'){
            state.inputs = action.payload.initialState
            state.type = action.payload.type
            state.idForUpd = action.payload.id
        }
        
    },
  },
});

export const { setVisible, setType } = articleFormSlice.actions;
export default articleFormSlice.reducer;
