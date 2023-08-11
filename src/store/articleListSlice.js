import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  commentList:[],
  loading: 'idle',
  chosenArticleData:{},
  chosenArticleComments:[]
}

export const getAllArticles = createAsyncThunk(
  'articleList/getAllArticles',
  async () => {
    const response = await  
    fetch(`http://localhost:5000/posts`, {
    })
      return (await response.json())
  },
)

export const getAllComments = createAsyncThunk(
    'articleList/getAllComments',
    async () => {
      const response = await  
      fetch(`http://localhost:5000/comments`, {
      })
        return (await response.json())
    },
  )

export const createArticle = createAsyncThunk(
    'articleList/createArticle',
    async (form) => {
        const prop = { created_at: Date.now() };
        const obj = {...form, ...prop};
      const response = await  
      fetch(`http://localhost:5000/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })
        return (await response.json())
    },
  )

  export const deleteThisArticle = createAsyncThunk(
    'articleList/deleteThisArticle',
    async (id) => {
      const response = await  
      fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    console.log(response,'delete')
        return {id, result:(await response.json())}
    }
    )

    export const updateThisArticle = createAsyncThunk(
        'articleList/updateThisArticle',
        async ({idForUpd, form}) => {
          const response = await  
          fetch(`http://localhost:5000/posts/${idForUpd}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        console.log(response, 'patch')
            return {idForUpd, form, result:(await response.json())}
        }
        )
    
        export const getChosenArticleInfo = createAsyncThunk(
            'articleList/getChosenArticleInfo',
            async (idForUpd) => {
              const response = await  
              fetch(`http://localhost:5000/posts/${idForUpd}`, {
              method: 'GET',
            })
            console.log(response, 'patch')
                return await response.json()
            }
            )
            export const addToChosenArticleComment = createAsyncThunk(
                'articleList/addToChosenArticleComment',
                async ({postId, form}) => {
            
                  const response = await  
                  fetch(`http://localhost:5000/comments`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                  })
                console.log(response, 'POST')
                    return {postId, data: await response.json()}
                }
                )   

const articleListSlice = createSlice({
  name: "articleList",
  initialState,
  reducers: {
    addNewArticle(state, action) {
        state.list.push(action.payload)
    },
    deleteArticle(state, action) {
        console.log(state.list, 'VHOD')
        state.list=state.list.filter((el)=>el.id !== action.payload)
        console.log(state.list, 'VYHOD')
    },
    getInfoAboutThisArticle(state, action){
        console.log('GETINFO', action.payload)
        state.chosenArticleData = state.list.filter((el)=>el.id === action.payload)
    },
    updateItemList(state, action){
        state.list = action.payload.sort((a,b)=>b.created_at - a.created_at)
    },
    getMyComments(state,action){
        state.chosenArticleComments = state.commentList.filter((el)=>el.postId === action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllArticles.fulfilled, (state, action) => {
      console.log('sucks')
      state.list = action.payload.sort((a,b)=>b.created_at - a.created_at)
      state.loading = 'succeeded'
    });
    builder.addCase(getAllArticles.pending, (state, action) => {
      console.log('pend')
      state.loading = 'pending'
    });
    builder.addCase(getAllArticles.rejected, (state, action) => {
      console.log('fail')
      state.loading = 'failed'
    });

    builder.addCase(getAllComments.fulfilled, (state, action) => {
        console.log('sucks')
        state.commentList = action.payload.sort((a,b)=>b.created_at - a.created_at)
        state.loading = 'succeeded'
      });
      builder.addCase(getAllComments.pending, (state, action) => {
        console.log('pend')
        state.loading = 'pending'
      });
      builder.addCase(getAllComments.rejected, (state, action) => {
        console.log('fail')
        state.loading = 'failed'
      });

    
    builder.addCase(createArticle.fulfilled, (state, action) => {
        state.list.push(action.payload)
        state.loading = 'succeeded'
      });
      builder.addCase(createArticle.pending, (state, action) => {
        console.log('pend')
        state.loading = 'pending'
      });
      builder.addCase(createArticle.rejected, (state, action) => {
        console.log('fail')
        state.loading = 'failed'
      });

      builder.addCase(updateThisArticle.fulfilled, (state, action) => {
         state.list.map((el) => {
            if(el.id === action.payload.idForUpd){
                return (
                    el.title =action.payload.result.title,
                    el.content =action.payload.result.content,
                    el.author =action.payload.result.author,
                    el.theme =action.payload.result.theme
                )
         }})
      })
     
      builder.addCase(updateThisArticle.pending, (state, action) => {
        console.log('pend')
        state.loading = 'pending'
      });
      builder.addCase(updateThisArticle.rejected, (state, action) => {
        console.log('fail')
        state.loading = 'failed'
      });

    builder.addCase(deleteThisArticle.fulfilled, (state, action) => {
        console.log('sucks', action.payload)
        state.list=state.list.filter((el)=>el.id !== action.payload)
      });
      builder.addCase(deleteThisArticle.pending, (state, action) => {
        console.log('pend')
        state.loading = 'pending'
      });
      builder.addCase(deleteThisArticle.rejected, (state, action) => {
        console.log('fail')
        state.loading = 'failed'
      });

      builder.addCase(getChosenArticleInfo.fulfilled, (state, action) => {
        console.log('sucks', action.payload)
        state.chosenArticleData=action.payload
      });
      builder.addCase(getChosenArticleInfo.pending, (state, action) => {
        console.log('pend')
        state.loading = 'pending'
      });
      builder.addCase(getChosenArticleInfo.rejected, (state, action) => {
        console.log('fail')
        state.loading = 'failed'
      });

      builder.addCase(addToChosenArticleComment.fulfilled, (state, action) => {
        console.log('sucks', action.payload)
        console.log(action.payload)
        state.chosenArticleComments.push(action.payload.data)
      });
      builder.addCase(addToChosenArticleComment.pending, (state, action) => {
        console.log('pend')
        state.loading = 'pending'
      });
      builder.addCase(addToChosenArticleComment.rejected, (state, action) => {
        console.log('fail')
        state.loading = 'failed'
      });
  },
  
  
  
});

export const { addNewArticle, deleteArticle, getInfoAboutThisArticle, updateItemList, getMyComments} = articleListSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.list
export default articleListSlice.reducer;




