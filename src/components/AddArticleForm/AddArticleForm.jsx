import React, { useEffect, useState } from 'react';
import cl from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setVisible } from '../../store/articleFormSlice';
import { createArticle, updateThisArticle } from '../../store/articleListSlice';

function AddArticleForm() {
    const rootClasses = [cl.myModal];

    const {inputs} = useSelector((state)=>state.articleForm)
    const [form, setForm] = useState(inputs);

    const { visible, type, idForUpd} = useSelector((state)=>state.articleForm)
    const dispatch = useDispatch()

    useEffect(()=>{
        setForm(inputs)
    },[inputs, type])

  if (visible) {
    rootClasses.push(cl.active);
  }

  const handleInput = (e)=>{
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
        </form>

      </div>
    </div>
  );
}

export default AddArticleForm;