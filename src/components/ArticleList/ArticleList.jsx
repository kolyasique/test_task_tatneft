import React, { useEffect, useRef, useState } from 'react'
import Select from "react-select";
import cl from './style.module.scss'
import AddArticleForm from '../AddArticleForm/AddArticleForm'
import { useDispatch, useSelector } from 'react-redux';
import { setType, setVisible } from '../../store/articleFormSlice';
import ArticleElement from './components/ArticleElement/ArticleElement';
import { deleteThisArticle, getAllArticles, updateItemList } from '../../store/articleListSlice';
import { Link } from 'react-router-dom';
// import Search from './components/FilterPanel/Search/Search';

import { MdClose, MdSearch } from 'react-icons/md';


export default function ArticleList() {
  const {visible} = useSelector((state)=>state.articleForm)

  const articleList = useSelector((state)=>state.articleList.list)

  const [searchQuery, setSearchQuery] = useState()
  const [searchedArticles, setSearchedArticles] = useState([articleList])
  const [filteredArticles, setFilteredArticles] = useState([articleList])
 
  const [query, setQuery] = useState('')
  const [readyQueryForFetch, setReadyQueryForFetch] = useState('')
  const [themeFilterQuery, setThemeFilterQuery] = useState('')
  const [authorFilterQuery, setAuthorFilterQuery] = useState('')
  const [dateFilterQuery, setDateFilterQuery] = useState('desc')
  
  const authorSelectRef = useRef()
  const themeSelectRef = useRef()
  const dateSelectRef = useRef()

const dateFilterArr = ['Сначала новые','Сначала старые'].map((elt, i) => ({ id: i + 1, name: elt }));
const authorFilterArr = Array.from(new Set(articleList.map((el, i) => (el.author)))).map((elt, i) => ({ id: i + 1, name: elt }));
const authorFilterArr2 = Array.from(new Set(articleList.map((el, i) => (el.author)))).map((elt, i) => ({ value: elt, label: elt }));

const themeFilterArr = Array.from(new Set(articleList.map((el, i) => (el.theme)))).map((elt, i) => ({ id: i + 1, name: elt }));
  

const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllArticles())
},[])

useEffect(
  () => {
    fetch(`http://localhost:5000/posts?${`title_like=${query}`}&${`theme_like=${themeFilterQuery}`}&${`author_like=${authorFilterQuery}`}&${`_sort=created_at&_order=${dateFilterQuery}`}`, {
    })
      .then((res) => res.json())
      .then((data) => {
        // setFilteredArticles(data)
        dispatch(updateItemList(data))
      })
      .catch((res) => console.erorr(res, 'Ошибка Fetch'));
  },
  [query, themeFilterQuery, authorFilterQuery, dateFilterQuery],
);

// useEffect(()=>{
//   setSearchedArticles({...query, filter:filter})
// },[filter])

  // useEffect(()=>{
  //   const common = searchedArticles.filter((x) => filteredArticles.indexOf(x.id) !== -1)
  //   console.log(common, searchedArticles, filteredArticles, 'COMMON')
  // },[searchedArticles, filteredArticles])

  useEffect(() => {
    setSearchedArticles(articleList);
  }, [articleList]);
 
  useEffect(()=>{},[query])
  // useEffect(() => {
  //   setSearchedArticles(articleList);
  // }, [searchedArticles]);

  const handleClick = (event) =>{
      dispatch(setType({type:'CREATE', inititalValue:{ title: '', content: '', theme: '', author:''}}))
      dispatch(setVisible())
};

  const handleSearch = (event) =>{
    console.log(event.target.value)
    setQuery(event.target.value)
  
    // const newArticles = articleList.filter((el) =>
    
    // el.title.toLowerCase()
    // .includes(event.target.value.toLowerCase())
    // ||
    // el.theme.toLowerCase()
    // .includes(event.target.value.toLowerCase()));

    //  console.log(newArticles)
    //  setSearchedArticles(newArticles)
    // setSearchQuery(event.target.value)
  }

  const handleFilter = (e) =>{
 switch (e.target.id) {
      case 'author':
        console.log(authorSelectRef.current)
        return (setAuthorFilterQuery(e.target.value));
      case 'date':
        if(e.target.value === 'Сначала новые'){
          return (setDateFilterQuery('desc'))
        }
        else return (setDateFilterQuery('asc'));
      case 'theme':
        return (setThemeFilterQuery(e.target.value));;
      default:
        return (setSearchedArticles(articleList));
    }
  }

  return (
    <div className={cl.wrapper}>
      <div className={cl.panel}>

        <div className={cl.panel_search}>
          <input 
          type='text' 
          value={searchQuery}
          onChange={handleSearch}
          placeholder='Поиск по заголовку'/>
          {/* <button className={cl.panel_search_button} onClick={handleSubmitSearch}>
            <MdSearch/>
          </button> */}
        </div>


        <div className={cl.panel_filter}>

          <div className={cl.panel_filter_div}>
              <select ref={themeSelectRef} name="Тема" id="theme" onChange={handleFilter}>
                  <option value="" disabled selected>Фильтр по теме</option>
                      {themeFilterArr.map((el)=>{
                        return (
                        <option key={el.id} value={el.name}>{el.name}</option>
                      )    
                      }
                      )}
              </select>
              <button className={cl.panel_filter_clearButton} onClick={()=>{setThemeFilterQuery(''); themeSelectRef.current.value=''}}>
                <MdClose/>
              </button>
          </div>

          <div className={cl.panel_filter_div} >
              <select ref={authorSelectRef} name="Автор" id="author" onChange={handleFilter}>
                <option value="" disabled selected>Фильтр по автору</option>
                      {authorFilterArr.map((el)=>{
                      return (
                      <option key={el.id} value={el.name}>{el.name}</option>
                      )    
                     }
                    )}
              </select>
              <button className={cl.panel_filter_clearButton} onClick={()=>{setAuthorFilterQuery(''); authorSelectRef.current.value=''}}>
                <MdClose/>
              </button>
          </div>

          <div className={cl.panel_filter_div} >
          <select ref={dateSelectRef} name="Дата" id="date" onChange={handleFilter}>
          {/* <option value="" disabled selected>Фильтр по дате</option> */}
          {dateFilterArr.map((el)=>{
                    return (
                    <option key={el.id} value={el.name}>{el.name}</option>
                  )    
                  }
                  )}
              </select>
              <button className={cl.panel_filter_clearButton} onClick={()=>{setDateFilterQuery(''); dateSelectRef.current.value=''}}>
                <MdClose/>
              </button>
          </div>

          <div className={cl.panel_filter_addBtn}>
            <button type='click' onClick={handleClick}>Добавить статью</button>
          </div>
       </div>
      </div>
      <div className={cl.main}>
        <div className={cl.main_list}>
            {articleList.length >0 ? (
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