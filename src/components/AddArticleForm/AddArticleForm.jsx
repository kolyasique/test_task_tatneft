/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';
// import { showToast } from '../../../../lib/toastify';
import cl from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setVisible } from '../../store/articleFormSlice';
import { createArticle, updateThisArticle } from '../../store/articleListSlice';

function AddArticleForm() {
    
const {inputs} = useSelector((state)=>state.articleForm)
  const [form, setForm] = useState(inputs);
  const rootClasses = [cl.myModal];
  const { visible, type, idForUpd} = useSelector((state)=>state.articleForm)
  const dispatch = useDispatch()

// const visible=trues
useEffect(()=>{
    setForm(inputs)
},[inputs, type])
  
useEffect(()=>{
console.log(type)
},[])

useEffect(()=>{
    console.log(form, type)
},[form])

  if (visible) {
    rootClasses.push(cl.active);
  }

  const handleInput = (e)=>{
    console.log(e.target.name, e.target.value)
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(type === 'CREATE'){
        dispatch(createArticle(form))
        dispatch(setVisible())
         e.target.reset();
    }
    else if (type === 'UPDATE'){
        console.log(idForUpd, form, 'before upd')
        dispatch(updateThisArticle({idForUpd, form}))
        dispatch(setVisible())
    }
   
  };
  return (
    <div className={rootClasses.join(' ')} onClick={() => dispatch(setVisible())}>
      <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
      {type === 'CREATE' ? (
                <h4>Добавить статью</h4>
            ):(
                <h4>Изменить статью</h4>
            )}
        
        <form className={cl.loginForm} onSubmit={handleSubmit}>

          <input 
          type="text" 
          name='title'
          value={form.title}
          onChange={handleInput} 
          required 
          placeholder='Заголовок' 
           />
          
          <textarea 
          type="text" 
          name='content'
          value={form.content}
          onChange={handleInput} 
          required  
          placeholder='Текст' 
          />

          <input 
          type="text" 
          name='theme'
          value={form.theme}
          onChange={handleInput} 
          required 
          placeholder='Тема' 
          />

          <input 
          type="text" 
          name='author'
          value={form.author}
          onChange={handleInput} 
          required 
          placeholder='Автор' 
          />

          <button type="submit" className={cl.loginFormButton}>
            {type === 'CREATE' ? (
                'Создать'
            ):(
                'Сохранить'
            )}
          </button>
          {/* <ToastContainer /> */}
        </form>

      </div>
    </div>
  );
}

export default AddArticleForm;