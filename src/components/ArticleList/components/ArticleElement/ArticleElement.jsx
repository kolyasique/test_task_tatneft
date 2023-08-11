import React from 'react'
import cl from './style.module.scss'
import DeleteButton from './components/DeleteButton'
import UpdateButton from './components/UpdateButton'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getInfoAboutThisArticle } from '../../../../store/articleListSlice'
export default function ArticleElement({id, title, content, theme, author}) {

    const dispatch = useDispatch()

    const handleClick=()=>{
        dispatch(getInfoAboutThisArticle(id))
    }
  return (
    <div className={cl.wrapper}>

        <div className={cl.upper}>
            <div className={cl.upper_left}>
                <div className={cl.upper_left_theme}>{theme}</div>
                <div className={cl.upper_left_author}>Автор: {author}</div>
            </div>
            <div className={cl.upper_right}>
                <UpdateButton id={id} title={title} content={content} theme={theme} author={author}/>
                <DeleteButton id={id}/>
            </div>
           
        </div>

        <div className={cl.title}>
            <h1>
                {title}
            </h1>
        </div>
        <div className={cl.content}>
            <h5>
                Содержимое статьи:
            </h5>
            <div className={cl.content_text}>
                {content}
            </div>
        </div>
        
        
        <Link to={`/articlelist/${id}`}>
            <button onClick={handleClick} className={cl.article_read_btn}>Прочитать</button>
        </Link>
       
    </div>
  )
}
