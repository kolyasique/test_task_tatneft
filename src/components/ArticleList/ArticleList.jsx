import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddArticleForm from '../AddArticleForm/AddArticleForm'
import { setType, setVisible } from '../../store/articleFormSlice';
import ArticleElement from './components/ArticleElement/ArticleElement';
import { getAllArticles, setSortType, updateItemList } from '../../store/articleListSlice';

import { MdClose } from 'react-icons/md';

import cl from './style.module.scss'

export default function ArticleList() {

  const [query, setQuery] = useState('')
  const [themeFilterQuery, setThemeFilterQuery] = useState('')
  const [authorFilterQuery, setAuthorFilterQuery] = useState('')
  const [dateFilterQuery, setDateFilterQuery] = useState('desc')
  
  const authorSelectRef = useRef()
  const themeSelectRef = useRef()

  const articleList = useSelector((state)=>state.articleList.list)
  const dispatch = useDispatch()

  const authorFilterArr = Array.from(new Set(articleList.map((el, i) => (el.author)))).map((elt, i) => ({ id: i + 1, name: elt }));
  const themeFilterArr = Array.from(new Set(articleList.map((el, i) => (el.theme)))).map((elt, i) => ({ id: i + 1, name: elt }));
  
  useEffect(()=>{
    dispatch(getAllArticles())
  },[dispatch])

  useEffect(
    () => {
      fetch(`http://localhost:5000/posts?${`title_like=${query}`}&${`theme_like=${themeFilterQuery}`}&${`author_like=${authorFilterQuery}`}&${`_sort=created_at&_order=${dateFilterQuery}`}`, {
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(updateItemList({sort:dateFilterQuery,data}))
        })
        .catch((res) => console.erorr(res, 'Ошибка Fetch'));
    },
    [query, themeFilterQuery, authorFilterQuery, dateFilterQuery, dispatch],
  );

  const handleClick = (event) =>{
      dispatch(setType({type:'CREATE', inititalValue:{ title: '', content: '', theme: '', author:''}}))
      dispatch(setVisible())
  };

  const handleSearch = (event) =>{
    setQuery(event.target.value)
  }

  const handleFilter = (e) =>{
      switch (e.target.id) {
            case 'author':
              return (setAuthorFilterQuery(e.target.value));
            case 'date':
              if(e.target.value === 'Сначала новые'){
                return (setDateFilterQuery('desc'),dispatch(setSortType('desc')))
              }
              else return (setDateFilterQuery('asc'),dispatch(setSortType('asc')));
            case 'theme':
              return (setThemeFilterQuery(e.target.value));;
            default:
              break
          }
  }

  return (
    <div className={cl.wrapper}>
      <div className={cl.panel}>

        <div className={cl.panel_search}>
          <input 
          type='text' 
          value={query}
          onChange={handleSearch}
          placeholder='Поиск по заголовку'/>
        </div>

        <div className={cl.panel_filter}>

          <div className={cl.panel_filter_div}>
              <select ref={themeSelectRef} name="Тема" id="theme" className={cl.panel_filter_selector} onChange={handleFilter}>
                  <option value="" disabled selected>Фильтр по теме</option>
                      {themeFilterArr.map((el)=>
                        {
                          return (<option key={el.id} value={el.name}>{el.name}</option>)    
                        }
                      )}
              </select>
              <button className={cl.panel_filter_clearButton} title='Сбросить фильтр' onClick={()=>{setThemeFilterQuery(''); themeSelectRef.current.value=''}}>
                <MdClose/>
              </button>
          </div>

          <div className={cl.panel_filter_div} >
              <select ref={authorSelectRef} name="Автор" id="author" className={cl.panel_filter_selector} onChange={handleFilter}>
                <option value="" disabled selected>Фильтр по автору</option>
                      {authorFilterArr.map((el)=>{
                      return (
                      <option key={el.id} value={el.name}>{el.name}</option>
                      )    
                     }
                    )}
              </select>
              <button className={cl.panel_filter_clearButton} title='Сбросить фильтр' onClick={()=>{setAuthorFilterQuery(''); authorSelectRef.current.value=''}}>
                <MdClose/>
              </button>
          </div>

          <div className={cl.panel_filter_div} >
              <select name="Дата" id="date" defaultValue={1} className={cl.panel_filter_selector} onChange={handleFilter}>
                    <option key={1} value={'Сначала новые'}>Сначала новые</option>
                    <option key={2} value={'Сначала старые'}>Сначала старые</option>          
              </select>
          </div>

          <div className={cl.panel_filter_addBtn}>
            <button type='click' onClick={handleClick} className={cl.addBtn_btn}>Добавить статью</button>
          </div>

        </div>
      </div>
  
      <div className={cl.main}>
        <div className={cl.main_list}>
            {articleList.length > 0 ? (
                articleList?.map(el => {
                  return <ArticleElement 
                          key={el.id} 
                          id={el.id} 
                          title={el.title} 
                          content={el.content} 
                          theme={el.theme} 
                          author={el.author}
                        />
                
                })
        
            ):(
              <div className={cl.main}>
                <div className={cl.main_list}>
                  <h1>Нет записей</h1>
                </div>
              </div>
            )}
        </div>
      </div>
      <AddArticleForm />
    </div>
  )
}