import React from 'react'
import { useDispatch } from 'react-redux'
import { updateThisArticle } from '../../../../../store/articleListSlice'
import { setType, setVisible } from '../../../../../store/articleFormSlice'

import { MdEditDocument } from 'react-icons/md';

import cl from './style.module.scss'

export default function UpdateButton({id, title, content, theme, author}) {
    const dispatch = useDispatch()

    const handleUpdate = (e)=>{
        dispatch(setType({type:'UPDATE', initialState:{ title, content, theme, author}, id}))
        dispatch(setVisible())
    }
  return (
    <>
    <button type='click' onClick={handleUpdate} className={cl.buttonEdit}>
        <MdEditDocument />
    </button>
    </>
  )
}
