import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteArticle, deleteThisArticle } from '../../../../../store/articleListSlice'

import { MdDelete } from 'react-icons/md';

import cl from './style.module.scss'

export default function DeleteButton({id}) {
    
    const dispatch = useDispatch()

    const handleDelete = ()=>{
        dispatch(deleteThisArticle(id))
        dispatch(deleteArticle(id))
    }
  return (
    <>
    <button 
    type='click' 
    onClick={handleDelete} 
    className={cl.buttonDelete}
    title='Удалить'
    >
        <MdDelete/>
    </button>
    </>
  )
}
