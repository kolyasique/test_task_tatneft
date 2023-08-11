import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToChosenArticleComment, getAllArticles, getAllComments, getChosenArticleInfo, getInfoAboutThisArticle, getMyComments } from '../../store/articleListSlice'

import cl from './style.module.scss'
import { useParams } from 'react-router'
import { convertDate } from '../../helpers/dateConverter'
export default function Article() {
    const dispatch = useDispatch()
    const {chosenArticleData, chosenArticleComments, commentList} = useSelector((state)=>state.articleList)
    const {articleId}=useParams()

    useEffect(()=>{
        dispatch(getChosenArticleInfo(articleId))
        dispatch(getAllComments())
        
    },[])

    useEffect(()=>{
        dispatch(getMyComments(articleId))
    },[commentList])

    const handleAddComment = (e) =>{
        e.preventDefault()
        console.log(e.target.name.value)
        dispatch(
            addToChosenArticleComment(
                {
                    postId:articleId, 
                    form:{
                        author:e.target.name.value, 
                        postId:articleId, 
                        text:e.target.text.value
                    }} 
                    ))
                    e.target.reset()
    }

    console.log(chosenArticleData)
  return (
    <div className={cl.wrapper}>
    <div className={cl.article_block}>
        <h1>{chosenArticleData.title}</h1>
        <div className={cl.article_block_textarea}>
        {chosenArticleData.content}
        </div>
        <div className={cl.article_block_additional}>
            <div>Автор: {chosenArticleData.author}</div>
            <div>{convertDate(chosenArticleData.created_at)}</div>
        </div>

        <div className={cl.article_block_comments}>
            <h3>Комментарии</h3>
            <div className={cl.comments_block}>
                {chosenArticleComments.length >0 ? (
                    chosenArticleComments?.map((el)=>{
                        return(<div className={cl.comment_element}>
                            <div className={cl.comment_element_author}>{el.author} написал:</div>
                            <div className={cl.comment_element_text}>{el.text}</div>
                          
                            </div>)
                        
                    })
                ):(
                    <h6>Комментариев нет, но вы можете оставить его первым!</h6>
                )}
                
            </div>
        </div>
                <form className={cl.comments_form} onSubmit={handleAddComment}>
                    <input name='name' required maxLength={30} type="text" placeholder='Ваше имя' />
                    <textarea name='text' required maxLength={300} type="textarea" placeholder='Комментарий'/>
                    <button type='submit' className={cl.add_comment_btn}>Добавить комментарий</button>
                </form>
    </div>
        </div>
  )
}
