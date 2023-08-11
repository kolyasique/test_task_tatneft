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
            <div>Дата: {convertDate(chosenArticleData.created_at)}</div>
        </div>

        <div className={cl.article_block_comments}>
            <h3>Комментарии</h3>
            <div className={cl.comments_block}>
                {chosenArticleComments.length >0 ? (
                    chosenArticleComments?.map((el)=>{
                        return(<div>{el.text}</div>)
                        
                    })
                ):(
                    <h6>Комментариев нет, но вы можете оставить его первым!</h6>
                )}
                <form className={cl.comments_form} onSubmit={handleAddComment}>
                    <input name='name' type="text" placeholder='Ваше имя' />
                    <textarea name='text' type="textarea" placeholder='Комментарий'/>
                <button type='submit' >Добавить комментарий</button>
                </form>
                
            </div>
        </div>
    </div>
        </div>
  )
}
